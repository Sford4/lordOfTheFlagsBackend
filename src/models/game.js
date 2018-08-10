const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
	addCode: String,
	organizer: String,
	cards: Array
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;

// players: [
// 	{
// 		avatar: String,
// 		health: Number,
// 		attack: Number,
// 		fortPieces: Number,
// 		energy: Number,
// 		cards: [
// 			{
// 				image: String,
// 				type: String,
// 				title: String,
// 				description: String
// 			}
// 		]
// 	}
// ],
