const db = require('../../../config/db')

class CartRepository {
    async getOrCreate(userId) {
        const existing = await db.query(
            `SELECT * FROM carts WHERE user_id=$1`,
            [userId]
        );

        if (existing.rows.length) return existing.rows[0];

        const res = await db.query(
            `INSERT INTO carts(user_id) VALUES ($1) RETURNING *`,
            [userId]
        );
        return res.rows[0];
    }

    async items(cartId) {
        const res = await db.query(
            `SELECT * FROM cart_items WHERE cart_id=$1`,
            [cartId]
        );
        return res.rows;
    }

    async upsertItem(cartId, item) {
        await db.query(
            `DELETE FROM cart_items WHERE cart_id=$1 AND variant_id=$2`,
            [cartId, item.variantId]
        );

        await db.query(
            `INSERT INTO cart_items(cart_id, product_id, variant_id, price, qty)
       VALUES ($1,$2,$3,$4,$5)`,
            [cartId, item.productId, item.variantId, item.price, item.qty]
        );
    }

    async clear(cartId) {
        await db.query(`DELETE FROM cart_items WHERE cart_id=$1`, [cartId]);
    }
}

module.exports = new CartRepository();
