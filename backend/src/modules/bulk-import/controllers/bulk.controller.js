const service = require('../services/bulk.service');

exports.upload = async (req, res, next) => {
  try {
    const result = await service.process(
      req.file.path,
      req.body.dryRun === 'true',
      req.user
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
};
