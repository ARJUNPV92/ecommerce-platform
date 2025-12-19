import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/NavBar';
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import Register from './auth/Register';


import ProductList from './storefront/ProductList';
import Cart from './storefront/Cart';

import Products from './admin/Products';
import BulkImport from './admin/BulkImport';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Storefront */}
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute roles={['Admin', 'SuperAdmin']}>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/import"
            element={
              <ProtectedRoute roles={['Admin', 'SuperAdmin']}>
                <BulkImport />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
