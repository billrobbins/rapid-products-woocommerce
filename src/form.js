import { useState, useEffect } from 'react';
import { create } from './DataStore';
import { Notification } from './notification';
import fields from './fields.json';
import { ImageUpload } from './image';
import { Field } from './field';

export const AddProductForm = () => {
	const [formData, updateFormData] = useState({});
	const [imageID, setImageID] = useState();
	const [message, updateMessage] = useState('');
	const [changed, updateChanged] = useState(false);
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		setFields();
	}, []);

	useEffect(() => {
		updateFormData((existing) => ({
			...existing,
			images: [{ id: imageID }],
		}));
		setProcessing(false);
	}, [imageID]);

	const setFields = () => {
		fields.map((field) =>
			updateFormData((apiField) => ({
				...apiField,
				[field.id]: field.value,
			}))
		);
		setProcessing(false);
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
		create(formData).catch((error) => updateMessage(error));
		updateMessage('Product Created');
		updateChanged(!changed);
		setFields();
	};

	return (
		<form className="add-product-form" onSubmit={handleSubmit}>
			<div className="regular-fields">
				{fields.map((field) => (
					<Field
						key={field.id}
						field={field}
						handleChange={handleChange}
						formData={formData}
					/>
				))}
				<p className="button-holder">
					<button
						type="submit"
						className="button button-primary"
						disabled={processing}
					>
						Add Product
					</button>
				</p>
				{message && <Notification message={message} />}
			</div>

			<ImageUpload
				setImageID={setImageID}
				changed={changed}
				setProcessing={setProcessing}
				updateMessage={updateMessage}
			/>
		</form>
	);
};
