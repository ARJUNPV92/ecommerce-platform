const service = require('../services/images.service');

exports.upload = async (req, res, next) => {
    try {
        const result = await service.upload(req.file, req.body, req.user);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
};

exports.listByProduct = async (req, res, next) => {
    try {
        res.json(await service.listProductImages(req.params.productId));
    } catch (e) {
        next(e);
    }
};
