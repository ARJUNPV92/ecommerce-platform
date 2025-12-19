const db = require('../../../../config/db');


class ProductRepository {
    async create(data) {
        const res = await db.query(
            `INSERT INTO products(name, description, category_id, sku)
       VALUES ($1,$2,$3,$4) RETURNING *`,
            [data.name, data.description, data.categoryId, data.sku]
        );
        return res.rows[0];
    }

    async findAll() {
        const res = await db.query(`SELECT * FROM products`);
        return res.rows;
    }
}

module.exports = new ProductRepository();
