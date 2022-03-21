import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodoAsync, toggleCompletedAsync } from '../store/todo-slise'
import image from './image/delete.png'

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch()

	const completedHandle = () => {
		dispatch(toggleCompletedAsync(id))
	}

	const deleteHandle = () => {
		dispatch(deleteTodoAsync(id))
	}

	return (
		<div className='todo_item'>
			<li>
				<div className='todos'>
					<input
						id={id}
						className='input'
						type='checkbox'
						checked={completed}
						onChange={completedHandle}
					/>
					<p className={`task ${completed ? 'done' : ''}`}>{title}</p>
					<img
						className='image'
						src={image}
						alt=''
						onClick={deleteHandle}
					/>
				</div>
			</li>
		</div>
	)
}

export default TodoItem
