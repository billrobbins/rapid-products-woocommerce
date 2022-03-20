import React, { useState } from 'react';
import { render } from 'react-dom';
import './index.scss';
import { AddProductForm } from './products/addProductForm';
import { Notification } from './notification';

const RootComponent = () => {
	const [message, updateMessage] = useState('');
	return (
		<>
			<h1>Rapid Products</h1>
			{message && <Notification message={message} />}
			<div className="form-wrap ">
				<AddProductForm updateMessage={updateMessage} />
			</div>
		</>
	);
};
const domContainer = document.querySelector('.rapid-products-wrap');
render(<RootComponent />, domContainer);
