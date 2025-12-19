const fs = require('fs');
const { parse } = require('csv-parse/sync');
const db = require('../../../config/db')
const repo = require('../repositories/bulk.repository');
const validate = require('../validators/bulk.validator');
const audit = require('../../../common/audit/audit.service')

class BulkImportService {
  async process(filePath, dryRun, user) {
    const content = fs.readFileSync(filePath);
    const rows = parse(content, {
      columns: true,
      skip_empty_lines: true
    });

    const errors = [];
    const client = await db.connect();

    try {
      await client.query('BEGIN');

      let currentProduct = null;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const err = validate(row, i + 1);
        if (err) {
          errors.push(err);
          continue;
        }

        const category = await repo.findCategoryByName(
          row.category,
          client
        );
        if (!category) {
          errors.push({
            row: i + 1,
            errors: ['category not found']
          });
          continue;
        }

        if (row.type === 'PRODUCT') {
          currentProduct = await repo.upsertProduct({
            name: row.product_name,
            sku: row.product_sku,
            categoryId: category.id
          }, client);
        }

        if (row.type === 'VARIANT') {
          if (!currentProduct) {
            errors.push({
              row: i + 1,
              errors: ['variant without product']
            });
            continue;
          }

          await repo.upsertVariant({
            productId: currentProduct.id,
            name: row.variant_name,
            sku: row.variant_sku,
            price: row.price,
            stock: row.stock
          }, client);
        }
      }

      if (errors.length || dryRun) {
        await client.query('ROLLBACK');
      } else {
        await client.query('COMMIT');

        await audit.log({
          userId: user.id,
          action: 'BULK_IMPORT',
          entity: 'catalog',
          entityId: null
        });
      }

      return {
        dryRun,
        success: errors.length === 0,
        errors
      };

    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

module.exports = new BulkImportService();
