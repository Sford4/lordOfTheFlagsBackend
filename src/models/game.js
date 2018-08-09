const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
	addCode: String,
	players: [{
		avatar: String,
		health: Number,
		attack: Number,
		fortPieces: Number,
		energy: Number,
		items: [
			{
				image: String,
				types: String,
				title: String,
				description: String
			}
		]
	}],
	cardSet: [
		{
			type: Schema.Types.ObjectId,
			ref: 'cardSet'
		}
	]
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;

player: {
	avatar: String,
	health: Number,
	attack: Number,
	fortPieces: Number,
	energy: Number,
	items: [
		{
			image: String,
			types: String,
			title: String,
			description: String
		}
	]
}
