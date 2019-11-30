const express = require("express");

const getDataByName = require("./middleware/repoData");
const bookmarkData = require("./bookmarkData");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

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
		res.status(200).send(bookmarkData);
	} catch (e) {
		res.status(500).send();
	}
});

app.post("/api/bookmarks", async (req, res) => {
	try {
		const data = req.body;
		bookmarkData.push(data);

		res.status(200).send();
	} catch (e) {
		res.status(500).send();
	}
});

app.delete("/api/bookmarks/:id", async (req, res) => {
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
