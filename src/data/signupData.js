import filterRules from "./filterRules";
const signupMeta = [
	{
		id: "username",
		label: "Username",
		name: "username",
		type: "text",
		validationRules: {
			required: { value: true, message: `Username is required` },
		},
	},
	{
		id: "email",
		label: "Email",
		type: "email",
		name: "email",
		validationRules: {
			required: { value: true, message: `Email is required` },
			pattern: {
				value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
				message: `Not a valid email`,
			},
		},
	},
];

export default () => {
	return filterRules(signupMeta);
};
