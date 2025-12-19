const router = require('express').Router();

const auth = require('../../../../common/middlewares/auth.middleware');
const rbac = require('../../../../common/middlewares/rbac.middleware');
const controller = require('../controllers/products.controller');

router.post('/', auth, rbac(['Admin', 'SuperAdmin']), controller.create);
router.get('/', controller.list);

module.exports = router;
