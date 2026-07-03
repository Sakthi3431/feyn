import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import ProductCard from '../pages/ProductCard';
import ProductDetailPage from '../pages/ProductDetailPage';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import CheckoutPage from '../pages/CheckoutPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
// import OrdersPage from './pages/OrdersPage';
// import OrderDetailPage from './pages/OrderDetailPage';
// import ProfilePage from './pages/ProfilePage';
// import SellerDashboard from './pages/SellerDashboard';
// import SellerProducts from './pages/SellerProducts';
// import SellerOrders from './pages/SellerOrders';

const PrivateRoute = ({ children, sellerOnly }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh'}}><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (sellerOnly && user.role !== 'seller') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' } }} />
          <main style={{ minHeight: 'calc(100vh - 140px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductCard />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
              {/* <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
              <Route path="/orders/:id" element={<PrivateRoute><OrderDetailPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/seller" element={<PrivateRoute sellerOnly><SellerDashboard /></PrivateRoute>} />
              <Route path="/seller/products" element={<PrivateRoute sellerOnly><SellerProducts /></PrivateRoute>} />
              <Route path="/seller/orders" element={<PrivateRoute sellerOnly><SellerOrders /></PrivateRoute>} /> */}
            </Routes>
            </main>
                 <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        borderRadius: "12px",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                  />
          <Footer />
        </CartProvider>
      </AuthProvider>
  );
}
export default App;