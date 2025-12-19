module.exports = (row, index) => {
  const errors = [];

  if (!row.type) errors.push('type missing');
  if (!row.category) errors.push('category missing');
  if (!row.product_sku) errors.push('product_sku missing');

  if (row.type === 'VARIANT') {
    if (!row.variant_sku) errors.push('variant_sku missing');
    if (!row.price) errors.push('price missing');
    if (!row.stock) errors.push('stock missing');
  }

  return errors.length
    ? { row: index, errors }
    : null;
};
