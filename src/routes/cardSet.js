const router = require('express-promise-router')();

const cardSetController = require('../controllers/cardSet');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/').get(cardSetController.index).post(validateBody(schemas.cardSetSchema), cardSetController.newCardSet);

router
	.route('/:id')
	.get(validateParam(schemas.idSchema, 'id'), cardSetController.getCardSet)
	.delete(validateParam(schemas.idSchema, 'id'), cardSetController.deleteCardSet);

module.exports = router;
