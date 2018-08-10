const CardSet = require('../models/cardSet');

module.exports = {
	index: async (req, res, next) => {
		const cardSets = await CardSet.find({});

		res.status(200).json(cardSets);
	},

	deleteAllCardSets: async (req, res, next) => {
		const cardSets = await CardSet.remove({});
		res.status(200).json('All cardSets deleted');
	},

	newCardSet: async (req, res, next) => {
		const newCardSet = req.value.body;
		const cardSet = new CardSet(newCardSet);
		await cardSet.save();
		res.status(200).json(cardSet);
	},

	getCardSet: async (req, res, next) => {
		const cardSet = await CardSet.findById(req.value.params.id);
		res.status(200).json(cardSet);
	},

	deleteCardSet: async (req, res, next) => {
		const cardSet = await CardSet.findByIdAndRemove(req.value.params.id);
		if (!cardSet) {
			return res.status(404).json({ error: "CardSet doesn't exist." });
		}
		res.status(200).json({ success: true });
	}
};
