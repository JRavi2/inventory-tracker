const path = require("path");
const express = require("express");
require("./db/mongoose");
const itemRouter = require("./routes/item");

// Initialize
const app = express();
const PORT = process.env.PORT || 8000;

// Automatically parse the incoming JSON
app.use(express.json());

// Setup middleware to server static files
app.use(express.static("static"));

// Setup the router
app.use(itemRouter);

// Serve the Homepage
app.get("/", (req, res) => {
	res.sendFile(path.join("/index.html"));
});

// Endpoint to test connectivity
app.get("/ping", (req, res) => {
	res.send("Ping");
});

// Start Listening on PORT
app.listen(PORT, () => {
	console.log("Server is Running on port", PORT);
});
