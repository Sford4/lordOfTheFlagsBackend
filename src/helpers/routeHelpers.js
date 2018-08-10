const Joi = require('joi');

module.exports = {
	validateParam: (schema, name) => {
		return (req, res, next) => {
			const result = Joi.validate({ param: req['params'][name] }, schema);
			if (result.error) {
				return res.status(400).json(result.error);
			}

			if (!req.value) req.value = {};
			if (!req.value['params']) req.value['params'] = {};

			req.value['params'][name] = result.value.param;
			next();
		};
	},

	validateBody: schema => {
		return (req, res, next) => {
			const result = Joi.validate(req.body, schema);

			if (result.error) {
				return res.status(400).json(result.error);
			}

			if (!req.value) req.value = {};
			if (!req.value['body']) req.value['body'] = {};

			req.value['body'] = result.value;
			next();
		};
	},

	schemas: {
		gameSchema: Joi.object().keys({
			// cards: Joi.array()
			// 	.items(
			// 		Joi.object().keys({
			// 			image: Joi.string(),
			// 			cardType: Joi.string(),
			// 			title: Joi.string(),
			// 			description: Joi.string()
			// 		})
			// 	)
			// 	.required(),
			editions: Joi.array().items(
				Joi.object().keys({
					title: Joi.string(),
					editionNum: Joi.number()
				})
			),
			organizer: Joi.string().required()
		}),

		cardSetSchema: Joi.object().keys({
			edition: Joi.number(),
			cards: Joi.array()
				.items(
					Joi.object().keys({
						image: Joi.string().required(),
						cardType: Joi.string().required(),
						title: Joi.string().required(),
						description: Joi.string().required()
					})
				)
				.required()
		}),

		idSchema: Joi.object().keys({
			param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		})
	}
};
