const router = require('express').Router();
const auth = require('../../../common/middlewares/auth.middleware');
const rbac = require('../../../common/middlewares/rbac.middleware');
const controller = require('../controllers/users.controller');

router.post(
    '/:id/roles',
    auth,
    rbac(['SuperAdmin', 'Admin']),
    controller.assignRole
);

module.exports = router;
