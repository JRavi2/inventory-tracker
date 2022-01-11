const express = require("express");
const Item = require("../models/item");
const router = new express.Router();

// Create a new Item
router.post("/items", async (req, res) => {
	const item = new Item({
		...req.body,
	});

	try {
		await item.save();
		res.status(201).send(item);
	} catch (err) {
		res.status(400).send(err);
	}
});

// List all the Items
router.get("/items", async (req, res) => {
	try {
		const items = await Item.find({});
		res.status(200).send(items);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Query a single Item
router.get("/items/:id", async (req, res) => {
	const _id = req.params.id;

	try {
		const item = await Item.findOne({_id});

		if (!item) res.status(404).send();

		res.status(200).send(item);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Edit an Item
router.patch("/items/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const validUpdates = ["name", "description", "units", "seller", "price"];
	const isValidOperation = updates.every(update =>
		validUpdates.includes(update)
	);

	if (!isValidOperation)
		return res.status(400).send({error: "Invalid Updates"});

	try {
		const item = await Item.findOne({
			_id: req.params.id
		});

		if (!item) return res.status(404).send();

		updates.forEach(update => (item[update] = req.body[update]));

		item.save();

		res.status(200).send(item);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete an Item
router.delete("/items/:id", async (req, res) => {
	try {
		const item = await Item.findOneAndDelete({
			_id: req.params.id
		});

		if (!item) return res.status(404).send();

		res.status(200).send(item);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
