import { useState, useEffect } from 'react';
import { create } from './DataStore';
import { Notification } from './notification';
import fields from './fields.json';
import { ImageUpload } from './image';

export const AddProductForm = () => {
	const [formData, updateFormData] = useState({});
	const [imageID, setImageID] = useState();
	const [message, updateMessage] = useState('');
	const [changed, updateChanged] = useState(false);

	useEffect(() => {
		setFields();
	}, []);

	useEffect(() => {
		updateFormData((existing) => ({
			...existing,
			images: [{ id: imageID }],
		}));
	}, [imageID]);

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
		updateChanged(!changed);
		setFields();
	};

	return (
		<form className="add-product-form" onSubmit={handleSubmit}>
			<div className="regular-fields">
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
			</div>

			<ImageUpload setImageID={setImageID} changed={changed} />
		</form>
	);
};
