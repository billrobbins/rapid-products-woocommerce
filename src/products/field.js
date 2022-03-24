import { InputField, TextAreaField, SelectField } from './fieldComponents';

export const Field = (props) => {
	let FieldComponent = InputField;
	switch (props.field.type) {
		case 'textarea':
			FieldComponent = TextAreaField;
			break;
		case 'select':
			FieldComponent = SelectField;
			break;
	}
	return (
		<label htmlFor={props.field.id}>
			<p>{props.field.name}</p>
			<FieldComponent
				field={props.field}
				handleChange={props.handleChange}
				formData={props.formData}
			/>
		</label>
	);
};
