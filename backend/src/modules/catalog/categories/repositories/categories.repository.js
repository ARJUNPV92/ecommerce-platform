const db = require('../../../../config/db');

//const db = require('../../../config/db');

class CategoryRepository {
    async create(name, parentId) {
        const res = await db.query(
            `INSERT INTO categories(name, parent_id)
       VALUES ($1, $2) RETURNING *`,
            [name, parentId || null]
        );
        return res.rows[0];
    }

    async findAll() {
        const res = await db.query(`SELECT * FROM categories`);
        return res.rows;
    }
}

module.exports = new CategoryRepository();
