import validator from "../utils/validationRules";

const useValidate = () => {
	const validate = (value, validationRules) => {
		for (const validationRule in validationRules) {
			// getting property to test and corresponding error message
			const { value: prop, message } = validationRules[validationRule];

			// gettting corresponding function from validationRules map object according to property.
			const handler = validator.get(validationRule);

			// validating the property
			const isValid = handler(value, prop);

			if (!isValid) {
				return message;
			}
		}
		return "";
	};

	return { validate };
};

export default useValidate;
