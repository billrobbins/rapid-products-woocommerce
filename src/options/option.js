export const Option = (props) => {
	return (
		<label htmlFor="name">
			<input
				type="checkbox"
				name={props.name}
				checked={props.checked}
				onChange={props.onChange}
			/>
			Option Name
		</label>
	);
};
