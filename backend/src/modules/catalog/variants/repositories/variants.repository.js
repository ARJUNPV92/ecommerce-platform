const db = require('../../../../config/db');


class VariantRepository {
    async create(data) {
        const res = await db.query(
            `INSERT INTO variants(product_id, name, sku, price, stock)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [data.productId, data.name, data.sku, data.price, data.stock]
        );
        return res.rows[0];
    }

    async findByProduct(productId) {
        const res = await db.query(
            `SELECT * FROM variants WHERE product_id=$1`,
            [productId]
        );
        return res.rows;
    }
}

module.exports = new VariantRepository();
