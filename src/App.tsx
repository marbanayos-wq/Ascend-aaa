/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './Home';
import { Shop } from './Shop';
import { ProductDetail } from './ProductDetail';
import { Collections } from './Collections';
import { About } from './About';
import { Contact } from './Contact';
import { Cart } from './Cart';
import { Checkout } from './Checkout';
import { Admin } from './Admin';
import { Login } from './Login';
import { OrderHistory } from './OrderHistory';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<OrderHistory />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
