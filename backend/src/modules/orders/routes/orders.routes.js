const router = require('express').Router();
const auth = require('../../../common/middlewares/auth.middleware')
const controller = require('../controllers/orders.controller');

router.post('/checkout', auth, controller.checkout);

module.exports = router;
