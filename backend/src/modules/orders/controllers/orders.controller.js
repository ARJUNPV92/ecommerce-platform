const service = require('../services/orders.service');

exports.checkout = async (req, res, next) => {
    try {
        res.json(await service.checkout(req.user.id, req.body.coupon));
    } catch (e) {
        next(e);
    }
};
