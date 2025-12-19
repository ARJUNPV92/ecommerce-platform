const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./common/middlewares/error.middleware');

// Routes
const authRoutes = require('./modules/auth/routes/auth.routes');
const userRoutes = require('./modules/users/routes/users.routes');
const categoryRoutes = require('./modules/catalog/categories/routes/categories.routes');
const productRoutes = require('./modules/catalog/products/routes/products.routes');
const variantRoutes = require('./modules/catalog/variants/routes/variants.routes');
const imageRoutes = require('./modules/images/routes/images.routes');
const couponRoutes = require('./modules/coupons/routes/coupons.routes');
const cartRoutes = require('./modules/cart/routes/cart.routes');
const orderRoutes = require('./modules/orders/routes/orders.routes');
const bulkRoutes = require('./modules/bulk-import/routes/bulk.routes');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Path
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bulk-import', bulkRoutes);


// Error handler (ALWAYS LAST)
app.use(errorMiddleware);

module.exports = app;
