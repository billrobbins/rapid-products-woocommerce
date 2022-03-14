import { useState, useEffect } from 'react';
import { create } from './DataStore';
import { Notification } from './notification';
import fields from './fields.json';

export const AddProductForm = () => {
	const [formData, updateFormData] = useState({});
	const [message, updateMessage] = useState('');

	useEffect(() => {
		setFields();
	}, []);

	const setFields = () => {
		fields.map((field) =>
			updateFormData((apiField) => ({
				...apiField,
				[field.id]: field.value,
			}))
		);
		const firstField = document.querySelector('input.name');
		firstField.focus();
		return () => {};
	};

	const handleChange = (e, id) => {
		updateFormData({
			...formData,
			[id]: e.target.value,
		});
		updateMessage('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		create(formData);
		updateMessage('Product Created');
		setFields();
	};

	return (
		<form className="add-product-form" onSubmit={handleSubmit}>
			{fields.map((field) => (
				<label htmlFor={field.id} key={field.id}>
					<p>{field.name}</p>
					<input
						type={field.type}
						name={field.id}
						onChange={(e) => {
							handleChange(e, field.id);
						}}
						className={field.id}
						value={formData[field.id] || ''}
						autoComplete="off"
					/>
				</label>
			))}
			<p>
				<button type="submit" className="button button-primary">
					Add Product
				</button>
			</p>
			<Notification message={message} />
		</form>
	);
};
