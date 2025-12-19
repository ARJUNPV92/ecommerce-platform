const router = require('express').Router();
const auth = require('../../../common/middlewares/auth.middleware');
const rbac = require('../../../common/middlewares/rbac.middleware');
const upload = require('../services/upload.config');
const controller = require('../controllers/images.controller');

router.post(
    '/',
    auth,
    rbac(['Admin', 'SuperAdmin']),
    upload.single('image'),
    controller.upload
);

router.get('/product/:productId', controller.listByProduct);

module.exports = router;
