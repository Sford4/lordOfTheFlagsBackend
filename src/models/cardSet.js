const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSetSchema = new Schema({
	edition: Number,
	cards: [
		{
			image: String,
			cardType: String,
			title: String,
			description: String
		}
	]
});

const CardSet = mongoose.model('cardSet', CardSetSchema);

module.exports = CardSet;
