const service = require('../services/products.service');

exports.create = async (req, res, next) => {
    try {
        res.status(201).json(await service.create(req.body, req.user));
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
