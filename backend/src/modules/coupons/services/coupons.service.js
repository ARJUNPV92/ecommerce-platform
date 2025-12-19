const repo = require('../repositories/coupons.repository');
const engine = require('../engine/coupon.engine');

class CouponService {
    async preview(code, cart) {
        const coupon = await repo.findByCode(code);
        if (!coupon) throw new Error('Invalid coupon');

        const scopes = await repo.getScopes(coupon.id);
        return engine.apply(coupon, cart, scopes);
    }

    async apply(code, cart, userId) {
        const result = await this.preview(code, cart);
        await repo.incrementUsage(result.coupon);
        return result;
    }
}

module.exports = new CouponService();
