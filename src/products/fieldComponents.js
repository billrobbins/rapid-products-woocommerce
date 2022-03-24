const InputField = (props) => {
	const field = props.field;
	return (
		<input
			type={field.type}
			name={field.id}
			onChange={(e) => {
				props.handleChange(e, field.id);
			}}
			className={field.id}
			value={props.formData[field.id] || ''}
			autoComplete="off"
			required={field.required}
		/>
	);
};

const TextAreaField = (props) => {
	const field = props.field;
	return (
		<textarea
			name={field.id}
			onChange={(e) => {
				props.handleChange(e, field.id);
			}}
			className={field.id}
			value={props.formData[field.id] || ''}
		/>
	);
};

const SelectField = (props) => {
	const field = props.field;
	return (
		<select
			name={field.id}
			className={field.id}
			value={props.formData[field.id] || ''}
			onChange={(e) => {
				props.handleChange(e, field.id);
			}}
		>
			{field.options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export { InputField, TextAreaField, SelectField };
