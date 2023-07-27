import { useEffect, useRef, useState } from "react";
import useValidate from "./useValidate";

const useForm = ({ rulesArray, defaultValues }) => {
	// This is validation hook having one validate method.
	const { validate } = useValidate();

	// creating form state
	const [formState, setFormState] = useState({});

	// register function for register attributes and initial values
	const register = () => {
		const formState = {};

		// if the defaualt values are passed then set them otherwise set empty string for them. Also a validation strategy is set by default to onBlur. It means that input fields will be validated onBlur events. But if the error occured in the input field then validationStrategy for that input field will be changed to onChange and input will be validated on every change.
		for (const key of rulesArray) {
			formState[key.name] = {
				value: defaultValues?.[key.name] ?? "",
				error: "",
				validationStrategy: "onBlur",
				strategySet: false,
				validationRules: key.validationRules,
			};
		}

		// setting state
		setFormState(formState);
	};

	// call register function to intitalize state.
	useEffect(() => {
		register();
	}, []);

	// creating handler that will handle the onChange and onBlur.

	const changeHandler = (e, mode = "onChange") => {
		const { name, value } = e.target;

		// validating input
		let error = formState[name].error;
		if (formState[name].validationStrategy === mode) {
			error = validate(value, formState[name].validationRules);
		}

		// change the validation strategy to onChange if the error occur.
		let validationStrategy = formState[name].validationStrategy;
		let strategySet = formState[name].strategySet;

		if (!formState[name].strategySet && error) {
			validationStrategy = "onChange";
			strategySet = true;
		}

		// setting state
		setFormState((formState) => {
			return {
				...formState,
				[name]: {
					...formState[name],
					value,
					error,
					validationStrategy,
					strategySet,
				},
			};
		});
	};

	// creating handle change function
	const handleChange = (e) => {
		changeHandler(e);
	};

	// creating blur
	const handleBlur = (e) => {
		changeHandler(e, "onBlur");
	};

	const handleSubmit = (e) => {
		// preventing form from submitting
		e.preventDefault();

		const inputErrors = [];
		const newFormState = { ...formState };

		//validating values, if error found then push in inputErros array
		for (const fieldName in formState) {
			if (!formState[fieldName].error) {
				const inputName = formState[fieldName].value;

				// if input is valid then empty string is return otherwise a error message
				const isNotValid = validate(
					inputName,
					formState[fieldName].validationRules
				);

				if (isNotValid) {
					inputErrors.push({ fieldName, errorMessage: isNotValid });
				}
			}
		}

		// if there are any errors then update the state
		for (const { fieldName, errorMessage } of inputErrors) {
			newFormState[fieldName] = {
				...newFormState[fieldName],
				error: errorMessage,
				validationStrategy: "onChange",
			};
		}

		// setting state
		setFormState(newFormState);
	};

	// return form state, change, blur and submit function.
	return { formState, handleChange, handleSubmit, handleBlur };
};

export default useForm;
