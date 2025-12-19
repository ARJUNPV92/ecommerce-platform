const rbac = require('../../rbac/services/rbac.service');

exports.assignRole = async (userId, role) => {
    await rbac.assign(userId, role);
};
