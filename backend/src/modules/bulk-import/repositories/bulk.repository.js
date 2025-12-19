const db = require('../../../config/db')

class BulkRepository {
  async findCategoryByName(name, client) {
    const res = await client.query(
      `SELECT id FROM categories WHERE name=$1`,
      [name]
    );
    return res.rows[0];
  }

  async upsertProduct(data, client) {
    const res = await client.query(
      `INSERT INTO products(name, sku, category_id)
       VALUES ($1,$2,$3)
       ON CONFLICT (sku)
       DO UPDATE SET name=EXCLUDED.name
       RETURNING id, sku`,
      [data.name, data.sku, data.categoryId]
    );
    return res.rows[0];
  }

  async upsertVariant(data, client) {
    await client.query(
      `INSERT INTO variants(product_id, name, sku, price, stock)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (sku)
       DO UPDATE SET price=EXCLUDED.price, stock=EXCLUDED.stock`,
      [data.productId, data.name, data.sku, data.price, data.stock]
    );
  }
}

module.exports = new BulkRepository();
