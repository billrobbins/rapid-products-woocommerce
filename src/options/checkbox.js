export const Checkbox = (props) => {
	return (
		<label htmlFor={props.id}>
			<input
				type="checkbox"
				name={props.id}
				checked={props.checked || ''}
				onChange={props.onChange}
			/>
			{props.label}
		</label>
	);
};
