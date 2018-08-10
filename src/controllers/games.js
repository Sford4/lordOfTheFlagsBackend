const Game = require('../models/game');
const CardSet = require('../models/cardSet');
const shortid = require('shortid');

let checkIfAddCodeUnique = async addCode => {
	console.log('checking if add code unique');
	await Game.count({ addCode: addCode }, (err, count) => {
		if (count > 0) {
			console.log('there are ' + count + ' games with that add code');
			return false;
		} else {
			return true;
		}
	});
};

module.exports = {
	index: async (req, res, next) => {
		const games = await Game.find({});
		res.status(200).json(games);
	},

	deleteAllGames: async (req, res, next) => {
		const games = await Game.remove({});
		res.status(200).json('All games deleted');
	},

	newGame: async (req, res, next) => {
		let cardsArr = [];
		for (let i = 0; i < req.value.body.editions.length; i++) {
			console.log('edition desired', req.value.body.editions[i].editionNum);
			let edition = await CardSet.find({ edition: req.value.body.editions[i].editionNum });
			// console.log('edition found', edition[0]);
			Array.prototype.push.apply(cardsArr, edition[0].cards);
		}
		console.log('cards array', cardsArr);
		const newGame = req.value.body;
		newGame.cards = cardsArr;
		let addCode = shortid.generate();
		while (!checkIfAddCodeUnique(addCode.substring(0, addCode.length - 4))) {
			// console.log('addcode not unique, making a new one');
			addCode = shortid.generate();
		}
		newGame.addCode = addCode.substring(0, addCode.length - 4);
		const game = new Game(newGame);
		await game.save();
		res.status(200).json({ game });
	},

	getGame: async (req, res, next) => {
		const game = await Game.findById(req.value.params.id);

		res.status(200).json(game);
	},

	searchGames: async (req, res, next) => {
		console.log('add code search', req.body);
		const game = await Game.find({ addCode: req.body.addCode });
		console.log('game returned', game);
		if (game[0]._id) {
			res.status(200).json({ gameId: game[0]._id, organizer: game[0].organizer });
		} else {
			res.status(200).json('No games with that add code!');
		}
	},

	deleteGame: async (req, res, next) => {
		const game = await Game.findByIdAndRemove(req.value.params.id);
		if (!game) {
			return res.status(404).json({ error: "Game doesn't exist." });
		}
		res.status(200).json({ success: true });
	}
};
