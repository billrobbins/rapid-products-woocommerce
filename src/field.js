export const Field = (props) => {
	const field = props.field;
	return (
		<label htmlFor={field.id} key={field.id}>
			<p>{field.name}</p>
			<input
				type={field.type}
				name={field.id}
				onChange={(e) => {
					props.handleChange(e, field.id);
				}}
				className={field.id}
				value={props.formData[field.id] || ''}
				autoComplete="off"
			/>
		</label>
	);
};
