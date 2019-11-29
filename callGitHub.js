const fetch = require("node-fetch");

const getData = async url => {
	let response = await fetch(url);
	let data = await response.json();
	return data;
};

const getDataByName = async repoName => {
	return await getData(
		`https://api.github.com/search/repositories?q=${repoName}&per_page=100&sort=stars&order=desc`
	);
};

module.exports = getDataByName;
