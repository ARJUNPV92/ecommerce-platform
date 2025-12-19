const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../../config/jwt');
const repo = require('../repositories/auth.repository');
const audit = require('../../../common/audit/audit.service');

class AuthService {
    async register(email, password) {
        const hash = await bcrypt.hash(password, 10);
        const user = await repo.createUser(email, hash);

        await audit.log({
            userId: user.id,
            action: 'REGISTER',
            entity: 'user',
            entityId: user.id
        });

        return user;
    }

    async login(email, password) {
        const user = await repo.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid credentials');

        const rolesRes = await require('../../rbac/repositories/rbac.repository')
            .getUserRoles(user.id);

        const token = jwt.sign(
            { id: user.id, roles: rolesRes },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );

        return { token };
    }
}

module.exports = new AuthService();
