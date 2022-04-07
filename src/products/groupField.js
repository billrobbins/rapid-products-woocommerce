/**
 * External dependencies
 */
import { useState, useEffect } from 'react';

export const GroupField = (props) => {
	const [groupValue, setGroupValue] = useState([]);

	const handleGroupChange = (e) => {
		setGroupValue({
			...groupValue,
			[e.target.name]: e.target.value,
		});
	};

	// Collects grouped input state and passes to AddProductForm
	useEffect(() => {
		props.groupChange(props.field.id, groupValue);
	}, [groupValue]);

	// Resets group fields after submission
	useEffect(() => {
		setGroupValue([]);
	}, [props.changed]);

	return (
		<>
			{props.field.options.map((field) => (
				<label htmlFor={field.id} key={field.id}>
					<p>{field.name}</p>
					<input
						type={field.type}
						name={field.id}
						onChange={(e) => {
							handleGroupChange(e, field.id);
						}}
						className={field.id}
						value={groupValue[field.id] || ''}
						autoComplete="off"
					/>
				</label>
			))}
		</>
	);
};
