module.exports = (coupon, cart, scopes) => {
    let discount = 0;

    cart.items.forEach(item => {
        if (scopes.some(s => s.scope_id === item.productId)) {
            const freeQty = Math.floor(item.qty / 2);
            discount += freeQty * item.price;
        }
    });

    return discount;
};
