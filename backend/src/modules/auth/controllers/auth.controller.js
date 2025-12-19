const service = require('../services/auth.service');

exports.register = async (req, res, next) => {
    try {
        const user = await service.register(req.body.email, req.body.password);
        res.status(201).json(user);
    } catch (e) {
        next(e);
    }
};

exports.login = async (req, res, next) => {
    try {
        const result = await service.login(req.body.email, req.body.password);
        res.json(result);
    } catch (e) {
        next(e);
    }
};
