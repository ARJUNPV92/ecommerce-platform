const router = require('express').Router();
const auth = require('../../../common/middlewares/auth.middleware')
const controller = require('../controllers/coupons.controller');

router.post('/preview', controller.preview);
router.post('/apply', auth, controller.apply);

module.exports = router;
