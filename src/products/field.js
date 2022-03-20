export const Field = (props) => {
	const field = props.field;
	switch (field.type) {
		case 'textarea':
			return (
				<label htmlFor={field.id}>
					<p>{field.name}</p>
					<textarea
						name={field.id}
						onChange={(e) => {
							props.handleChange(e, field.id);
						}}
						className={field.id}
						value={props.formData[field.id] || ''}
					/>
				</label>
			);

		default:
			return (
				<label htmlFor={field.id}>
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
	}
};