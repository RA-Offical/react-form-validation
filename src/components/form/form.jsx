import "./form.css";
import getMetaData from "../../data/signupData";
import useForm from "../../hooks/useForm";
import FormGroup from "../form-group/form-group";

const Form = () => {
	// optional default values passed to the useForm hook. which will be set to input fields by default.
	const defaultValues = {
		// username: "Rashid Ameer",
		// email: "rashid@gmail.com",
	};

	// getting data from signupdata.js file which is about the fields
	// fieldArray contains data about input field like id, name, type, label
	// rulesArray contain data like input name and its validation rules with their message
	const { fieldArray, rulesArray } = getMetaData();

	// sending rules and optional default values to useForm hook which will return formState, handleSubmit, handleBlur
	const { formState, handleChange, handleSubmit, handleBlur } = useForm({
		rulesArray,
		defaultValues,
	});

	return (
		<form className="form" onSubmit={handleSubmit}>
			{/* Looping over the fieldArray which just contain the id, type, label, name of input field */}
			{fieldArray.map((field) => {
				return (
					<FormGroup
						key={field.id}
						value={formState[field.name]?.value ?? ""}
						error={formState[field.name]?.error}
						{...field}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				);
			})}

			<button type="submit">Submit</button>
		</form>
	);
};

export default Form;
