const cartService = require('../../cart/services/cart.service');
const orderRepo = require('../repositories/orders.repository');
const couponService = require('../../coupons/services/coupons.service');
const cartRepo = require('../../cart/repositories/cart.repository');
const audit = require('../../../common/audit/audit.service')

class OrdersService {
    async checkout(userId, couponCode) {
        const cart = await cartService.getCart(userId);

        let discount = 0;
        if (couponCode) {
            const preview = await couponService.preview(couponCode, {
                total: cart.subtotal,
                items: cart.items.map(i => ({
                    productId: i.product_id,
                    price: i.price,
                    qty: i.qty
                }))
            });
            discount = preview.discount;
        }

        const order = await orderRepo.create({
            userId,
            subtotal: cart.subtotal,
            discount,
            total: cart.subtotal - discount,
            coupon: couponCode
        });

        await orderRepo.addItems(order.id, cart.items);
        await cartRepo.clear(cart.cartId);

        await audit.log({
            userId,
            action: 'PLACE_ORDER',
            entity: 'order',
            entityId: order.id
        });

        return order;
    }
}

module.exports = new OrdersService();
