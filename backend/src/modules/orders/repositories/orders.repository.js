const db = require('../../../config/db')

class OrdersRepository {
    async create(order) {
        const res = await db.query(
            `INSERT INTO orders(user_id, subtotal, discount, total, coupon_code)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [
                order.userId,
                order.subtotal,
                order.discount,
                order.total,
                order.coupon
            ]
        );
        return res.rows[0];
    }

    async addItems(orderId, items) {
        for (const i of items) {
            await db.query(
                `INSERT INTO order_items(order_id, product_id, variant_id, price, qty)
         VALUES ($1,$2,$3,$4,$5)`,
                [orderId, i.product_id, i.variant_id, i.price, i.qty]
            );
        }
    }
}

module.exports = new OrdersRepository();
