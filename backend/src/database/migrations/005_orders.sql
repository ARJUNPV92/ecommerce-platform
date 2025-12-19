CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
  product_id INT,
  variant_id INT,
  price NUMERIC(10,2) NOT NULL,
  qty INT NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  subtotal NUMERIC(10,2) NOT NULL,
  discount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  coupon_code TEXT,
  status TEXT DEFAULT 'PLACED',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT,
  variant_id INT,
  price NUMERIC(10,2),
  qty INT
);
