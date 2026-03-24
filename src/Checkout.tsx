import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, QrCode, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { db, collection, addDoc, handleFirestoreError, OperationType } from './firebase';
import { motion } from 'motion/react';

export const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    paymentMethod: 'card' as 'card' | 'qr' | 'cod'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to complete your order.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: user.uid,
        items: cart,
        total: subtotal + 250,
        status: 'pending',
        shippingInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        },
        paymentMethod: formData.paymentMethod,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'orders'), orderData);
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-white py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg bg-white p-16 rounded-3xl shadow-2xl border border-gray-100"
        >
          <div className="inline-flex p-6 bg-green-50 text-green-500 rounded-full mb-8">
            <CheckCircle2 size={64} />
          </div>
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter italic">Order Confirmed!</h1>
          <p className="text-primary/60 mb-10 text-lg leading-relaxed">
            Thank you for your order. We've received your request and are preparing your gear. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full py-5 bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-xl"
            >
              Return Home
            </Link>
            <Link
              to="/shop"
              className="block w-full py-5 bg-white text-primary border border-gray-100 font-bold uppercase tracking-widest hover:bg-soft-white transition-all"
            >
              Shop More Gear
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-soft-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">Checkout</h1>
          <Link to="/cart" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">
            <ChevronLeft size={16} />
            Back to Cart
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Shipping Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full text-sm not-italic">1</span>
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-none focus:ring-2 focus:ring-accent outline-none shadow-sm font-medium"
                    placeholder="Marius Polo Banayos"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-none focus:ring-2 focus:ring-accent outline-none shadow-sm font-medium"
                    placeholder="marius@example.com"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-none focus:ring-2 focus:ring-accent outline-none shadow-sm font-medium"
                    placeholder="09157172071"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Shipping Address</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-none focus:ring-2 focus:ring-accent outline-none shadow-sm font-medium h-32 resize-none"
                    placeholder="Street, Barangay, City, Province, Zip Code"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full text-sm not-italic">2</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'card', icon: <CreditCard size={24} />, label: 'Card Payment' },
                  { id: 'qr', icon: <QrCode size={24} />, label: 'QR Payment' },
                  { id: 'cod', icon: <Truck size={24} />, label: 'Cash on Delivery' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`p-8 flex flex-col items-center gap-4 border-2 transition-all rounded-2xl ${
                      formData.paymentMethod === method.id ? 'bg-primary text-white border-primary shadow-xl' : 'bg-white border-gray-100 hover:border-accent'
                    }`}
                  >
                    {method.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{method.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Order Review */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-3xl shadow-xl sticky top-32 border border-gray-100">
              <h2 className="text-xl font-black italic tracking-tighter uppercase mb-8 border-b border-gray-100 pb-6">Order Review</h2>
              <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[10px] text-primary/40 uppercase tracking-widest">Qty: {item.quantity} | {item.selectedSize}</p>
                    </div>
                    <p className="text-sm font-bold">₱{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mb-10 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-primary/60 text-xs uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-primary font-bold">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-primary/60 text-xs uppercase tracking-widest">
                  <span>Shipping Fee</span>
                  <span className="text-primary font-bold">₱250</span>
                </div>
                <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                  <span className="text-primary/60 text-[10px] uppercase tracking-widest font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-primary">₱{(subtotal + 250).toLocaleString()}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-primary text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent hover:text-primary transition-all shadow-xl transform hover:-translate-y-1"
              >
                Complete Order
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
