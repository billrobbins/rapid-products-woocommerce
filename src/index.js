import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './index.scss';
import { AddProductForm } from './form';
import { ImageUpload } from './image';

const RootComponent = () => {
	return (
		<>
			<h1>Rapid Products</h1>
			<div className="form-wrap ">
				<AddProductForm />
				<ImageUpload />
			</div>
		</>
	);
};
const domContainer = document.querySelector('.rapid-products-wrap');
render(<RootComponent />, domContainer);
