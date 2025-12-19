module.exports = (coupon, cart, scopes) => {
    let base = cart.total;

    if (scopes.length) {
        base = cart.items
            .filter(i => scopes.some(s =>
                (s.scope_type === 'PRODUCT' && s.scope_id === i.productId) ||
                (s.scope_type === 'CATEGORY' && s.scope_id === i.categoryId)
            ))
            .reduce((s, i) => s + i.price * i.qty, 0);
    }

    return (base * coupon.discount_value) / 100;
};
