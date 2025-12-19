const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/imports' });

const auth = require('../../../common/middlewares/auth.middleware')
const rbac = require('../../../common/middlewares/rbac.middleware');
const controller = require('../controllers/bulk.controller');

router.post(
  '/',
  auth,
  rbac(['Admin', 'SuperAdmin']),
  upload.single('file'),
  controller.upload
);

module.exports = router;
