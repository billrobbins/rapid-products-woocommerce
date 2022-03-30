import { useState, useEffect } from 'react';
import { create, listFields } from '../DataStore';
import { ImageUpload } from './image';
import { Field } from './field';

export const AddProductForm = (props) => {
	const [formData, updateFormData] = useState({});
	const [imageID, setImageID] = useState();
	const [changed, updateChanged] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [fields, defineFields] = useState([]);

	const updateMessage = props.updateMessage;

	useEffect(() => {
		const loadFields = async () => {
			const response = await listFields();
			try {
				defineFields(response);
			} catch (error) {
				updateMessage(error);
			} finally {
				setFields();
			}
		};
		loadFields();
	}, [props.settings]);

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
	};

	const handleChange = (e, name) => {
		if (name === 'category') {
			updateFormData({
				...formData,
				category: e.target.value,
				categories: [{ id: e.target.value }],
			});
		} else {
			updateFormData({
				...formData,
				[name]: e.target.value,
			});
		}
		updateMessage('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await create(formData);
			updateMessage('Product Created');
			updateChanged(!changed);
			setFields();
		} catch (error) {
			updateMessage(error.message);
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
