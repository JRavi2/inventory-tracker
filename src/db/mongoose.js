const mongoose = require("mongoose");

const url = `mongodb://mongo:27017/`;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Successfully connected to database"))
	.catch((err) => console.log(err));
