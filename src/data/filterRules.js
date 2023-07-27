const filterRules = (metaData) => {
	const rulesArray = [];
	const fieldArray = [];

	for (const data of metaData) {
		const { name, id, label, type, validationRules } = data;

		const filterObj = {
			name,
			validationRules,
		};

		const fieldObj = { id, label, type, name };

		fieldArray.push(fieldObj);
		rulesArray.push(filterObj);
	}

	return { fieldArray, rulesArray };
};

export default filterRules;
