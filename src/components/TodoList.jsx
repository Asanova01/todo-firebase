import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodosAsync } from '../store/todo-slise'
import TodoItem from './TodoItem'

const TodoList = () => {
	const dispatch = useDispatch()
	const todos = useSelector((state) => state.todos.todos)
	useEffect(() => {
		dispatch(getTodosAsync())
	}, [dispatch])

	return (
		<ul>
			{todos.map((todo) => (
				<TodoItem
					id={todo.id}
					title={todo.title}
					completed={todo.completed}
					key={todo.id}
				/>
			))}
		</ul>
	)
}

export default TodoList
