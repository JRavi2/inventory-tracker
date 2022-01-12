const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		description: {
			type: String,
			trim: true,
			required: true
		},
		units: {
			type: Number,
			required: true
		},
		seller: {
			type: String,
			trim: true,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		deleted: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
