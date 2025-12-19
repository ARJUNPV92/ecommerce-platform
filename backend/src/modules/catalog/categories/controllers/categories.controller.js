const service = require('../services/categories.service');

exports.create = async (req, res, next) => {
    try {
        const result = await service.create(req.body, req.user);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
};

exports.list = async (req, res, next) => {
    try {
        res.json(await service.list());
    } catch (e) {
        next(e);
    }
};
