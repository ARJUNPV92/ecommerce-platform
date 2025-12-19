const service = require('../services/users.service');

exports.assignRole = async (req, res, next) => {
    try {
        await service.assignRole(req.params.id, req.body.role);
        res.json({ status: 'ok' });
    } catch (e) {
        next(e);
    }
};
