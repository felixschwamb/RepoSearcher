const fs = require("fs");
const express = require("express");

const getDataByName = require("./middleware/repoData");
// const bookmarkData = require("./bookmarkData");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// /bookmarkData.json has been added to /nodemon.json, so it gets ignored by Nodemon and a change in the file does not trigger a restart
fs.writeFileSync("./bookmarkData.json", "[]");

// // Endpoints
// // Get all reservations
app.get("/api/repositories/:name", getDataByName, async (req, res) => {
	try {
		res.status(200).send(req.data);
	} catch (e) {
		res.status(500).send();
	}
});

app.get("/api/bookmarks", async (req, res) => {
	try {
		const bookmarkData = JSON.parse(fs.readFileSync("./bookmarkData.json"));
		res.status(200).send(bookmarkData);
	} catch (e) {
		res.status(500).send();
	}
});

app.post("/api/bookmarks", async (req, res) => {
	try {
		const data = req.body;
		const bookmarkData = JSON.parse(fs.readFileSync("./bookmarkData.json"));
		bookmarkData.push(data);
		fs.writeFileSync("./bookmarkData.json", JSON.stringify(bookmarkData));

		res.status(200).send();
	} catch (e) {
		res.status(500).send();
	}
});

app.delete("/api/bookmarks/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const bookmarkData = JSON.parse(fs.readFileSync("./bookmarkData.json"));
		const index = bookmarkData.findIndex(item => {
			return item.id === id;
		});
		bookmarkData.splice(index, 1);

		fs.writeFileSync("./bookmarkData.json", JSON.stringify(bookmarkData));

		res.status(200).send();
	} catch (e) {
		res.status(500).send();
	}
});

app.listen(port, () => console.log("Server up on port ", port));
