const service = require('../services/coupons.service');

exports.preview = async (req, res, next) => {
    try {
        res.json(await service.preview(req.body.code, req.body.cart));
    } catch (e) {
        next(e);
    }
};

exports.apply = async (req, res, next) => {
    try {
        res.json(await service.apply(
            req.body.code,
            req.body.cart,
            req.user.id
        ));
    } catch (e) {
        next(e);
    }
};
