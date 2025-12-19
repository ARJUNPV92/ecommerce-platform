const percentEval = require('./evaluators/percent');
const flatEval = require('./evaluators/flat');
const bogoEval = require('./evaluators/bogo');

class CouponEngine {
    apply(coupon, cart, scopes) {
        this.validate(coupon, cart);

        let discount = 0;

        switch (coupon.discount_type) {
            case 'PERCENT':
                discount = percentEval(coupon, cart, scopes);
                break;
            case 'FLAT':
                discount = flatEval(coupon, cart, scopes);
                break;
            case 'BOGO':
                discount = bogoEval(coupon, cart, scopes);
                break;
        }

        if (coupon.max_discount && discount > coupon.max_discount) {
            discount = coupon.max_discount;
        }

        return {
            coupon: coupon.code,
            discount
        };
    }

    validate(coupon, cart) {
        const now = new Date();

        if (coupon.starts_at && now < coupon.starts_at) {
            throw new Error('Coupon not started');
        }
        if (coupon.ends_at && now > coupon.ends_at) {
            throw new Error('Coupon expired');
        }
        if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
            throw new Error('Coupon usage exceeded');
        }
        if (coupon.min_cart_value && cart.total < coupon.min_cart_value) {
            throw new Error('Minimum cart value not met');
        }
    }
}

module.exports = new CouponEngine();
