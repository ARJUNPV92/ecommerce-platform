const repo = require('../repositories/variants.repository');
const audit = require('../../../../common/audit/audit.service');

class VariantService {
    generateSku(productSku, name) {
        return `${productSku}-${name.toUpperCase()}`;
    }

    async create(data, user) {
        const sku = this.generateSku(data.productSku, data.name);

        const variant = await repo.create({
            ...data,
            sku
        });

        await audit.log({
            userId: user.id,
            action: 'CREATE_VARIANT',
            entity: 'variant',
            entityId: variant.id
        });

        return variant;
    }

    async list(productId) {
        return repo.findByProduct(productId);
    }
}

module.exports = new VariantService();
