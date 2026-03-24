import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-white py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-4"
        >
          <div className="inline-flex p-8 bg-white rounded-full mb-8 shadow-xl text-primary/20">
            <ShoppingCart size={64} />
          </div>
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter italic">Your Cart is Empty</h1>
          <p className="text-primary/60 mb-10 text-lg leading-relaxed">
            Looks like you haven't added any gear yet. Start your journey with ASCEND today.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-xl transform hover:-translate-y-1"
          >
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-soft-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">Your Cart</h1>
          <Link to="/shop" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">
            <ChevronLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-32 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-primary/40 uppercase tracking-widest mb-4">
                      Size: <span className="text-primary">{item.selectedSize}</span> | Color: <span className="text-primary">{item.selectedColor}</span>
                    </p>
                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                      <div className="flex items-center bg-soft-white border border-gray-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="p-3 hover:text-accent transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="p-3 hover:text-accent transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">₱{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-[10px] text-primary/40 uppercase tracking-widest">₱{item.price.toLocaleString()} each</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-white p-10 rounded-3xl shadow-2xl sticky top-32">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-8 border-b border-white/10 pb-6">Order Summary</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-white/60 text-sm uppercase tracking-widest">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-white font-bold">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-accent font-bold italic">Calculated at checkout</span>
                </div>
                <div className="border-t border-white/10 pt-6 flex justify-between items-end">
                  <span className="text-white/60 text-xs uppercase tracking-widest">Total Amount</span>
                  <span className="text-3xl font-black text-accent">₱{subtotal.toLocaleString()}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full py-5 bg-accent text-primary font-bold uppercase tracking-widest text-center hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl"
              >
                Proceed to Checkout
              </Link>
              <p className="text-[10px] text-white/40 text-center mt-6 uppercase tracking-widest">
                Secure SSL encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
