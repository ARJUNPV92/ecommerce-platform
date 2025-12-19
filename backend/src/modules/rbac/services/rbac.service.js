const repo = require('../repositories/rbac.repository');
const audit = require('../../../common/audit/audit.service');

class RbacService {
    async assign(userId, role) {
        await repo.assignRole(userId, role);

        await audit.log({
            userId,
            action: 'ASSIGN_ROLE',
            entity: 'role',
            entityId: role
        });
    }
}

module.exports = new RbacService();
