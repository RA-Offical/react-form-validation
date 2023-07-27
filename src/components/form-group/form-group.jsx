import "./form-group.css";

const FormGroup = ({
	label,
	id,
	name,
	type,
	error,
	value,
	handleChange,
	handleBlur,
}) => {
	return (
		<div className="flex flex-col form-group">
			<label htmlFor={id} className="form__input-label">
				{label}
			</label>

			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				className="form__input-field"
			/>

			{error && <p className="form__input-error">{error}</p>}
		</div>
	);
};

export default FormGroup;
