import { useState } from 'react';
import { create } from './DataStore';
import { Notification } from './notification';

export const AddProductForm = () => {
	const [formData, updateFormData] = useState({});
	const [message, updateMessage] = useState('');

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		create(formData);
		updateFormData({});
		updateMessage('Product Created');
	};

	return (
		<form className="add-product-form" onSubmit={handleSubmit}>
			<label htmlFor="name">
				<p>Product name</p>
				<input
					type="text"
					name="name"
					onChange={handleChange}
					value={formData.name || ''}
				/>
			</label>
			<label htmlFor="regular_price">
				<p>Price</p>
				<input
					type="text"
					name="regular_price"
					onChange={handleChange}
					value={formData.regular_price || ''}
				/>
			</label>
			<label htmlFor="sku">
				<p>SKU</p>
				<input
					type="text"
					name="sku"
					onChange={handleChange}
					value={formData.sku || ''}
				/>
			</label>
			<p>
				<button type="submit" className="button button-primary">
					Add Product
				</button>
			</p>
			<Notification message={message} />
		</form>
	);
};
