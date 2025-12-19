CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  variant_id INT REFERENCES variants(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
