const db = require('../../config/db');

class AuditService {
    async log({ userId, action, entity, entityId }) {
        await db.query(
            `INSERT INTO audit_logs(user_id, action, entity, entity_id)
       VALUES ($1, $2, $3, $4)`,
            [userId, action, entity, entityId]
        );
    }
}

module.exports = new AuditService();
