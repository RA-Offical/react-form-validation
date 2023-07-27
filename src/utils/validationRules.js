const required = (value) => {
	return value !== "";
};

const minLength = (value, minLength) => {
	return value.length >= minLength;
};

const pattern = (value, pattern) => {
	return pattern.test(value);
};

// map object to store all the function. I will call function bases on input validation rule. e.g: if the input is required then i will call required function. if the input has pattern I will call pattern function.
const validator = new Map([
	["required", required],
	["minLength", minLength],
	["pattern", pattern],
]);

export default validator;
