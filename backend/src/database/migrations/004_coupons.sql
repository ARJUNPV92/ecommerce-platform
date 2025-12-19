CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL, -- PERCENT, FLAT, BOGO
  discount_value NUMERIC(10,2),
  max_discount NUMERIC(10,2),
  min_cart_value NUMERIC(10,2),
  priority INT DEFAULT 0,
  is_stackable BOOLEAN DEFAULT FALSE,
  starts_at TIMESTAMP,
  ends_at TIMESTAMP,
  usage_limit INT,
  used_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE coupon_scopes (
  id SERIAL PRIMARY KEY,
  coupon_id INT REFERENCES coupons(id) ON DELETE CASCADE,
  scope_type TEXT NOT NULL, -- CART, PRODUCT, CATEGORY
  scope_id INT
);

CREATE TABLE coupon_usage_log (
  id SERIAL PRIMARY KEY,
  coupon_id INT REFERENCES coupons(id),
  user_id UUID,
  order_id INT,
  used_at TIMESTAMP DEFAULT NOW()
);
