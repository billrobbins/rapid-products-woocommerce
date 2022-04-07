/**
 * Internal dependencies
 */
import { InputField, TextAreaField, SelectField } from './fieldComponents';
import { GroupField } from './groupField';

export const Field = (props) => {
	let FieldComponent = InputField;
	switch (props.field.type) {
		case 'textarea':
			FieldComponent = TextAreaField;
			break;
		case 'select':
			FieldComponent = SelectField;
			break;
		case 'group':
			FieldComponent = GroupField;
			break;
	}
	return (
		<label
			htmlFor={props.field.id}
			className={'field-' + props.field.type + ' field-' + props.field.id}
		>
			<p>{props.field.name}</p>
			<FieldComponent
				field={props.field}
				handleChange={props.handleChange}
				formData={props.formData}
				groupChange={props.groupChange}
				changed={props.changed}
			/>
		</label>
	);
};
