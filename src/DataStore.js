import apiFetch from '@wordpress/api-fetch';

const create = (data) => {
	return apiFetch({
		path: '/wc/v3/products',
		method: 'POST',
		data,
	});
};

const addImage = (data) => {
	return apiFetch({
		path: '/wp/v2/media',
		method: 'POST',
		body: data,
	});
};

const listOptions = () => {
	return apiFetch({ path: '/rapid-products/v1/options' });
};

const editOptions = (data) => {
	return apiFetch({
		path: '/rapid-products/v1/options',
		method: 'POST',
		data,
	});
};

const listFields = () => {
	return apiFetch({ path: '/rapid-products/v1/options/fields' });
};

export { create, addImage, listOptions, editOptions, listFields };
