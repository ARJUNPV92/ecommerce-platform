const service = require('../services/cart.service');

exports.add = async (req, res, next) => {
    try {
        res.json(await service.addItem(req.user.id, req.body));
    } catch (e) {
        next(e);
    }
};

exports.get = async (req, res, next) => {
    try {
        res.json(await service.getCart(req.user.id));
    } catch (e) {
        next(e);
    }
};
