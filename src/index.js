import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './index.scss';
import { AddProductForm } from './form';

const RootComponent = () => {
	return (
		<>
			<h1>Rapid Products</h1>
			<AddProductForm />
		</>
	);
};
const domContainer = document.querySelector('.rapid-products-wrap');
render(<RootComponent />, domContainer);
