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

export { create, addImage };
