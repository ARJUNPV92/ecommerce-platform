const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.body.variantId) {
            cb(null, 'uploads/variants/originals');
        } else {
            cb(null, 'uploads/products/originals');
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, crypto.randomUUID() + ext);
    }
});

module.exports = multer({ storage });
