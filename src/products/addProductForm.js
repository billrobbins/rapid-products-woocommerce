import { useState, useEffect } from 'react';
import { create } from '../DataStore';
import fields from './fields.json';
import { ImageUpload } from './image';
import { Field } from './field';

export const AddProductForm = (props) => {
	const [formData, updateFormData] = useState({});
	const [imageID, setImageID] = useState();
	const [changed, updateChanged] = useState(false);
	const [processing, setProcessing] = useState(false);

	const updateMessage = props.updateMessage;

	useEffect(() => {
		setFields();
	}, []);

	// Adds the imageID to formData from ImageUpload
	useEffect(() => {
		updateFormData((existing) => ({
			...existing,
			images: [{ id: imageID }],
		}));
		setProcessing(false);
	}, [imageID]);

	// Prepares our fields for a product
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await create(formData);
			updateMessage('Product Created');
		} catch (error) {
			updateMessage(error);
		} finally {
			updateChanged(!changed);
			setFields();
		}
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
