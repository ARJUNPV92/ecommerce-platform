const db = require('../../../config/db');

class ImagesRepository {
    async save(data) {
        const res = await db.query(
            `INSERT INTO product_images
       (product_id, variant_id, file_path, thumbnail_path, is_primary)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
            [
                data.productId || null,
                data.variantId || null,
                data.filePath,
                data.thumbnailPath,
                !!data.isPrimary
            ]
        );
        return res.rows[0];
    }

    async listByProduct(productId) {
        const res = await db.query(
            `SELECT * FROM product_images WHERE product_id=$1`,
            [productId]
        );
        return res.rows;
    }
}

module.exports = new ImagesRepository();
