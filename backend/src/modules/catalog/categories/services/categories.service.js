const repo = require('../repositories/categories.repository');
const audit = require('../../../../common/audit/audit.service');

class CategoryService {
    async create(data, user) {
        const category = await repo.create(data.name, data.parentId);

        await audit.log({
            userId: user.id,
            action: 'CREATE_CATEGORY',
            entity: 'category',
            entityId: category.id
        });

        return category;
    }

    async list() {
        return repo.findAll();
    }
}

module.exports = new CategoryService();
