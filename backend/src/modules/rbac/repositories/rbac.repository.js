const db = require('../../../config/db');

class RbacRepository {
    async assignRole(userId, roleName) {
        const role = await db.query(
            `SELECT id FROM roles WHERE name=$1`,
            [roleName]
        );

        await db.query(
            `INSERT INTO user_roles(user_id, role_id)
       VALUES ($1, $2)`,
            [userId, role.rows[0].id]
        );
    }

    async getUserRoles(userId) {
        const res = await db.query(
            `SELECT r.name FROM roles r
       JOIN user_roles ur ON ur.role_id=r.id
       WHERE ur.user_id=$1`,
            [userId]
        );
        return res.rows.map(r => r.name);
    }
}

module.exports = new RbacRepository();
