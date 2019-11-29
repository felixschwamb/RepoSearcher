const express = require("express");
const path = require("path");

const getDataByName = require("./callGitHub");
const bookmarkData = require("./bookmarkData");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// // Endpoints
// // Get all reservations
app.get("/repos/:repoName", async (req, res) => {
	try {
		const repoName = req.params.repoName;
		const data = await getDataByName(repoName);

		res.status(200).send(data);
	} catch (e) {
		res.status(500).send();
	}
});

app.get("/bookmarks", async (req, res) => {
	try {
		res.status(200).send(bookmarkData);
	} catch (e) {
		res.status(500).send();
	}
});

app.post("/bookmarks", async (req, res) => {
	try {
		const data = req.body;
		bookmarkData.push(data);

		res.status(200).send();
	} catch (e) {
		res.status(500).send();
	}
});

app.delete("/bookmarks/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const index = bookmarkData.findIndex(item => {
			return item.id === id;
		});
		bookmarkData.splice(index, 1);

		res.status(200).send();
	} catch (e) {
		res.status(500).send();
	}
});

app.listen(port, () => console.log("Server up on port ", port));
