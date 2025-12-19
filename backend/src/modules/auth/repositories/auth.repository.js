const db = require('../../../config/db');

class AuthRepository {
    async createUser(email, password) {
        const res = await db.query(
            `INSERT INTO users(email, password)
       VALUES ($1, $2)
       RETURNING id, email`,
            [email, password]
        );
        return res.rows[0];
    }

    async findByEmail(email) {
        const res = await db.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        );
        return res.rows[0];
    }
}

module.exports = new AuthRepository();
