import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { url } from '../constanta/utils'

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${url}/todo.json`)
			if (!response.ok) {
				throw new Error('Server Error!')
			}
			const generatedData = []
			const todos = await response.json()

			for (const key in todos) {
				generatedData.push({
					title: todos[key].title,
					id: key,
					completed: todos[key].completed,
				})
			}
			return generatedData
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (id, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(`${url}/todo/${id}.json`, {
				method: 'DELETE',
			})
			console.log(response)
			if (!response.ok) {
				throw new Error("Can't delete task. Server error.")
			}
			dispatch(deleteTodo({ id }))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const toggleCompletedAsync = createAsyncThunk(
	'todos/toggleCompletedAsync',
	async (id, { rejectWithValue, dispatch, getState }) => {
		const todo = getState().todos.todos.find((todo) => todo.id === id)
		try {
			const response = await fetch(
				`${url}/todo/${id}.json`,
				{
					method: 'PATCH',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({
						completed: !todo.completed,
					}),
				},
			)
			if (!response.ok) {
				throw new Error("Can't toggle status. Server error.")
			}
			const data = await response.json()
			console.log(data)
			dispatch(toggleCompleted({ id }))
		} catch (error) {}
	},
)
export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await fetch(`${url}/todo.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})
			if (response.ok) {
				const todo = await response.json()

				return { ...payload, id: todo.name }
			}
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				id: action.payload.id,
				title: action.payload.title,
				completed: false,
			}
			state.push(newTodo)
		},
		toggleCompleted: (state, action) => {
			console.log(action.payload)
			state.todos = state.todos.map((el) => {
				if (el.id === action.payload.id) {
					el.completed = !el.completed
				}
				return el
			})
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload.id,
			)
		},
	},
	extraReducers: {
		[getTodosAsync.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[getTodosAsync.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		[getTodosAsync.rejected]: setError,
		[addTodoAsync.fulfilled]: (state, action) => {
			state.todos.push(action.payload)
		},
		[deleteTodoAsync.rejected]: setError,
		[toggleCompletedAsync.rejected]: setError,
	},
})

export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
