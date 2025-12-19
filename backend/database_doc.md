📘 DATABASE DOCUMENTATION

E-Commerce Platform

Database: PostgreSQL
Architecture: Normalized, transactional, RBAC-enabled

🧩 ENTITY RELATIONSHIP OVERVIEW (HIGH LEVEL)
Users ──┬── User_Roles ── Roles ── Role_Permissions ── Permissions
        └── Orders ── Order_Items
               └── Coupon_Usage_Log

Categories ── Products ── Variants ── Product_Images

Carts ── Cart_Items ── Products / Variants

Coupons ── Coupon_Scopes

🔐 AUTH & RBAC TABLES
1️⃣ users

Stores registered users.

Column	Type	Constraints	Description
id	UUID	PK	Unique user identifier
email	TEXT	UNIQUE, NOT NULL	Login email
password	TEXT	NOT NULL	Hashed password
is_active	BOOLEAN	DEFAULT true	Account status
created_at	TIMESTAMP	DEFAULT now()	Account creation time

🔗 Relationships

One user → many roles

One user → many orders

One user → many audit logs

2️⃣ roles

Defines system roles.

Column	Type	Constraints	Description
id	SERIAL	PK	Role ID
name	TEXT	UNIQUE	Role name (Admin, User, etc.)
3️⃣ user_roles

Many-to-many mapping between users and roles.

Column	Type	Constraints	Description
user_id	UUID	FK → users.id	User
role_id	INT	FK → roles.id	Role

🧠 Purpose

Enables RBAC

Users can have multiple roles

4️⃣ permissions

Defines atomic permissions (optional extension).

Column	Type	Constraints	Description
id	SERIAL	PK	Permission ID
name	TEXT	UNIQUE	Permission name
5️⃣ role_permissions

Maps roles to permissions.

Column	Type	Constraints	Description
role_id	INT	FK → roles.id	Role
permission_id	INT	FK → permissions.id	Permission
6️⃣ audit_logs

Tracks all sensitive write operations.

Column	Type	Constraints	Description
id	SERIAL	PK	Log ID
user_id	UUID	FK → users.id	Actor
action	TEXT	NOT NULL	Action name
entity	TEXT	NOT NULL	Affected entity
entity_id	INT	Nullable	Entity ID
created_at	TIMESTAMP	DEFAULT now()	Timestamp

🧠 Why this exists

Compliance

Debugging

Security audits

🗂️ CATALOG TABLES
7️⃣ categories

Product categorization (supports hierarchy).

Column	Type	Constraints	Description
id	SERIAL	PK	Category ID
name	TEXT	NOT NULL	Category name
parent_id	INT	FK → categories.id	Parent category
created_at	TIMESTAMP	DEFAULT now()	Creation time
8️⃣ products

Base product entity.

Column	Type	Constraints	Description
id	SERIAL	PK	Product ID
name	TEXT	NOT NULL	Product name
description	TEXT	Nullable	Description
category_id	INT	FK → categories.id	Category
sku	TEXT	UNIQUE	Product SKU
is_active	BOOLEAN	DEFAULT true	Visibility
created_at	TIMESTAMP	DEFAULT now()	Created time
9️⃣ variants

Sellable units of a product.

Column	Type	Constraints	Description
id	SERIAL	PK	Variant ID
product_id	INT	FK → products.id	Parent product
name	TEXT	NOT NULL	Variant name
sku	TEXT	UNIQUE	Variant SKU
price	NUMERIC	NOT NULL	Selling price
stock	INT	DEFAULT 0	Inventory
created_at	TIMESTAMP	DEFAULT now()	Created time
🔟 product_images

Stores image metadata (local storage).

Column	Type	Constraints	Description
id	SERIAL	PK	Image ID
product_id	INT	FK → products.id	Product
variant_id	INT	FK → variants.id	Variant
file_path	TEXT	NOT NULL	Image path
thumbnail_path	TEXT	NOT NULL	Thumbnail path
is_primary	BOOLEAN	DEFAULT false	Main image
created_at	TIMESTAMP	DEFAULT now()	Uploaded time
🛒 CART & ORDER TABLES
1️⃣1️⃣ carts

Represents active user cart.

Column	Type	Constraints	Description
id	SERIAL	PK	Cart ID
user_id	UUID	FK → users.id	Owner
updated_at	TIMESTAMP	DEFAULT now()	Last update
1️⃣2️⃣ cart_items

Items inside cart.

Column	Type	Constraints	Description
id	SERIAL	PK	Item ID
cart_id	INT	FK → carts.id	Cart
product_id	INT	FK	Product
variant_id	INT	FK	Variant
price	NUMERIC	NOT NULL	Snapshot price
qty	INT	NOT NULL	Quantity
1️⃣3️⃣ orders

Finalized purchase record.

Column	Type	Constraints	Description
id	SERIAL	PK	Order ID
user_id	UUID	FK → users.id	Buyer
subtotal	NUMERIC	NOT NULL	Cart total
discount	NUMERIC	DEFAULT 0	Discount
total	NUMERIC	NOT NULL	Final payable
coupon_code	TEXT	Nullable	Applied coupon
status	TEXT	DEFAULT 'PLACED'	Order status
created_at	TIMESTAMP	DEFAULT now()	Order time
1️⃣4️⃣ order_items

Order snapshot (immutable).

Column	Type	Constraints	Description
id	SERIAL	PK	Item ID
order_id	INT	FK → orders.id	Order
product_id	INT	FK	Product
variant_id	INT	FK	Variant
price	NUMERIC	NOT NULL	Price at purchase
qty	INT	NOT NULL	Quantity
🎟️ COUPON ENGINE TABLES
1️⃣5️⃣ coupons

Defines discount rules.

Column	Type	Constraints	Description
id	SERIAL	PK	Coupon ID
code	TEXT	UNIQUE	Coupon code
discount_type	TEXT	NOT NULL	PERCENT / FLAT / BOGO
discount_value	NUMERIC	Nullable	Discount value
max_discount	NUMERIC	Nullable	Cap
min_cart_value	NUMERIC	Nullable	Minimum cart
priority	INT	DEFAULT 0	Rule priority
is_stackable	BOOLEAN	DEFAULT false	Stackable
starts_at	TIMESTAMP	Nullable	Start date
ends_at	TIMESTAMP	Nullable	End date
usage_limit	INT	Nullable	Max usage
used_count	INT	DEFAULT 0	Used count
is_active	BOOLEAN	DEFAULT true	Status
created_at	TIMESTAMP	DEFAULT now()	Created
1️⃣6️⃣ coupon_scopes

Defines where coupon applies.

Column	Type	Constraints	Description
id	SERIAL	PK	Scope ID
coupon_id	INT	FK → coupons.id	Coupon
scope_type	TEXT	NOT NULL	CART / PRODUCT / CATEGORY
scope_id	INT	Nullable	Target ID
1️⃣7️⃣ coupon_usage_log

Tracks coupon usage.

Column	Type	Constraints	Description
id	SERIAL	PK	Log ID
coupon_id	INT	FK → coupons.id	Coupon
user_id	UUID	FK → users.id	User
order_id	INT	FK → orders.id	Order
used_at	TIMESTAMP	DEFAULT now()	Used time
📦 BULK IMPORT SUPPORT

Uses existing tables:

categories

products

variants

Transaction-safe, no separate table required.