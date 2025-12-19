const router = require('express').Router();
const auth = require('../../../common/middlewares/auth.middleware')
const controller = require('../controllers/cart.controller');

router.post('/items', auth, controller.add);
router.get('/', auth, controller.get);

module.exports = router;
