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

		case 'select':
			return (
				<label htmlFor={field.id}>
					<p>{field.name}</p>
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
						required={field.required}
					/>
				</label>
			);
	}
};
