import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoAsync } from '../store/todo-slise'
import image from './image/add.png'

const AddTodoForm = () => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()

	const onSubmit = (e) => {
		e.preventDefault()
		if (value.trim().length) {
			dispatch(
				addTodoAsync({
					id: Math.random().toString(),
					title: value,
					completed: false,
				}),
			)
		}
		setValue('')
	}

	return (
		<>
			<form className='form'>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					type='text'
					placeholder='Add todo...'
				/>
				<img src={image} alt='' onClick={onSubmit} />
			</form>
		</>
	)
}

export default AddTodoForm
