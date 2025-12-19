const repo = require('../repositories/products.repository');
const audit = require('../../../../common/audit/audit.service');

class ProductService {
    generateSku(name) {
        return (
            name.toUpperCase().replace(/\s+/g, '-') +
            '-' +
            Date.now()
        );
    }

    async create(data, user) {
        const sku = this.generateSku(data.name);

        const product = await repo.create({
            ...data,
            sku
        });

        await audit.log({
            userId: user.id,
            action: 'CREATE_PRODUCT',
            entity: 'product',
            entityId: product.id
        });

        return product;
    }

    async list() {
        return repo.findAll();
    }
}

module.exports = new ProductService();
