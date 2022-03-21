import './App.css'
import './styles/styles.css'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'
import { useSelector } from 'react-redux'

function App() {
	const { status, error } = useSelector((state) => state.todos)

	return (
		<div className='App'>
			<h1>My Todo List</h1>
			<AddTodoForm />
			<div className='status_style'>
				{status === 'loading' && (
					<p className='loading_style'>Loading...</p>
				)}
				{error && <p className='error_style'>An error occured: {error}</p>}
			</div>
			<TodoList />
		</div>
	)
}

export default App
