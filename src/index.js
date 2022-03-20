import React, { useState } from 'react';
import { render } from 'react-dom';
import './index.scss';
import { AddProductForm } from './products/addProductForm';
import { Notification } from './notification';
import { OptionList } from './options/setOptions';

const RootComponent = () => {
	const [message, updateMessage] = useState('');
	const [settings, updatedSettings] = useState(false);
	return (
		<>
			<h1>Rapid Products</h1>
			{message && <Notification message={message} />}
			<div className="form-wrap ">
				<AddProductForm
					updateMessage={updateMessage}
					settings={settings}
				/>
			</div>

			<OptionList
				updateMessage={updateMessage}
				updatedSettings={updatedSettings}
				settings={settings}
			/>
		</>
	);
};
const domContainer = document.querySelector('.rapid-products-wrap');
render(<RootComponent />, domContainer);
