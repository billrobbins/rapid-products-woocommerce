import { useState, useEffect } from 'react';
import { listOptions, editOptions } from '../DataStore';
import options from './options.json';
import { Option } from './option';

export const OptionList = () => {
	const [options, setOptions] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await editOptions(options);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	return (
		<form className="options-form" onSubmit={handleSubmit}>
			<h4>Select fields</h4>

			<button type="submit" className="button button-primary">
				Save Options
			</button>
		</form>
	);
};
