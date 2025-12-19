const db = require('../../../config/db')

class CouponRepository {
    async findByCode(code) {
        const res = await db.query(
            `SELECT * FROM coupons WHERE code=$1 AND is_active=true`,
            [code]
        );
        return res.rows[0];
    }

    async getScopes(couponId) {
        const res = await db.query(
            `SELECT * FROM coupon_scopes WHERE coupon_id=$1`,
            [couponId]
        );
        return res.rows;
    }

    async incrementUsage(couponId) {
        await db.query(
            `UPDATE coupons SET used_count = used_count + 1 WHERE id=$1`,
            [couponId]
        );
    }
}

module.exports = new CouponRepository();
