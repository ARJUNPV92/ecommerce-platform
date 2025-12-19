const repo = require('../repositories/cart.repository');

class CartService {
    async addItem(userId, item) {
        const cart = await repo.getOrCreate(userId);
        await repo.upsertItem(cart.id, item);
        return this.getCart(userId);
    }

    async getCart(userId) {
        const cart = await repo.getOrCreate(userId);
        const items = await repo.items(cart.id);

        const subtotal = items.reduce(
            (s, i) => s + i.price * i.qty, 0
        );

        return { cartId: cart.id, items, subtotal };
    }

    async clear(userId) {
        const cart = await repo.getOrCreate(userId);
        await repo.clear(cart.id);
    }
}

module.exports = new CartService();
