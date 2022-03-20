import { useState, useEffect } from 'react';
import { listOptions, editOptions } from '../DataStore';
import fields from './options.json';
import { Checkbox } from './checkbox';

export const OptionList = (props) => {
	const [options, setOptions] = useState({});

	useEffect(() => {
		const listExisting = async () => {
			const response = await listOptions();
			setOptions(response);
		};
		listExisting();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			options,
		};
		try {
			await editOptions(data);
			props.updateMessage('Settings Saved');
			props.updatedSettings(!props.settings);
		} catch (error) {
			props.updateMessage(error);
		} finally {
		}
	};

	const handleChange = (e) => {
		setOptions({ ...options, [e.target.name]: e.target.checked });
	};

	return (
		<form className="options-form" onSubmit={handleSubmit}>
			<h4>Select fields</h4>

			{fields.map((item) => (
				<Checkbox
					label={item.name}
					id={item.id}
					checked={options[item.id]}
					onChange={handleChange}
					key={item.id}
				/>
			))}

			<button type="submit" className="button button-primary">
				Save Options
			</button>
		</form>
	);
};
