const fetch = require("node-fetch");

const getData = async url => {
	let response = await fetch(url);
	let data = await response.json();
	return data;
};

const getDataByName = async (req, res, next) => {
	try {
		const repoName = req.params.name;
		const data = await getData(
			`https://api.github.com/search/repositories?q=${repoName}&per_page=100&sort=stars&order=desc`
		);
		req.data = data;
		next();
	} catch (e) {
		res.status(500).send();
	}
};

module.exports = getDataByName;
