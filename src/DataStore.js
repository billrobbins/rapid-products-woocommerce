import apiFetch from '@wordpress/api-fetch';

const create = (data) => {
	return apiFetch({
		path: '/wc/v3/products',
		method: 'POST',
		data,
	});
};

export { create };
