import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './index.scss';
import { AddProductForm } from './form';

const RootComponent = () => {
	return (
		<>
			<h1>Rapid Products</h1>
			<div className="form-wrap ">
				<AddProductForm />
			</div>
		</>
	);
};
const domContainer = document.querySelector('.rapid-products-wrap');
render(<RootComponent />, domContainer);
