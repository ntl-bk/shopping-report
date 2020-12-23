const getCurrancy = async () => {
	return await fetch(
		'http://data.fixer.io/api/latest?access_key=d9877ccd39b4b3e40994de61be3a44ed&base=EUR&symbols=PLN,USD,EUR'
	).then((data) => data.json());
};
export default getCurrancy;
