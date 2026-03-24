import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle, Clock, ChevronRight, ExternalLink, PackageCheck } from 'lucide-react';
import { db, collection, query, where, onSnapshot, handleFirestoreError, OperationType } from './firebase';
import { Order } from './types';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const ordersPath = 'orders';
    const q = query(collection(db, ordersPath), where('userId', '==', user.uid));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orderData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        // Sort by date descending
        setOrders(orderData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, ordersPath);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-soft-white uppercase tracking-widest text-xs font-bold">Loading your orders...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-white p-4">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-4">Please Login</h2>
        <p className="text-primary/40 uppercase tracking-widest text-xs mb-8">You need to be logged in to view your order history.</p>
        <Link to="/login" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-xl">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-white min-h-screen py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">Order History</h1>
          <p className="text-primary/40 uppercase tracking-widest text-xs">Track your ASCEND gear from our warehouse to your doorstep.</p>
        </header>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Order ID</p>
                  <p className="font-mono text-xs font-bold">{order.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {order.status === 'pending' && <Clock size={12} />}
                    {order.status === 'confirmed' && <CheckCircle size={12} />}
                    {order.status === 'shipped' && <Truck size={12} />}
                    {order.status === 'delivered' && <PackageCheck size={12} />}
                    {order.status}
                  </span>
                  <p className="text-sm font-bold">₱{order.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Items Summary */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-4">Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img src={item.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                          <div className="flex-grow">
                            <p className="text-xs font-bold uppercase tracking-tight line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-primary/40 uppercase tracking-widest">
                              {item.selectedSize} / {item.selectedColor} x {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking Info */}
                  <div className="bg-soft-white/50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-4">Shipping Status</h4>
                    {order.status === 'shipped' || order.status === 'delivered' ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Carrier</p>
                          <p className="text-sm font-bold uppercase">{order.shippingCarrier || 'Standard Shipping'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Tracking Number</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-mono font-bold">{order.trackingNumber || 'Processing...'}</p>
                            {order.trackingNumber && (
                              <button className="text-accent hover:text-primary transition-colors">
                                <ExternalLink size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 text-center">
                        <Clock size={24} className="text-primary/20 mb-2" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
                          Tracking info will be available once your order is shipped.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-soft-white flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-primary/40">
                <span>Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                <Link to={`/contact`} className="hover:text-primary transition-colors flex items-center gap-1">
                  Need Help? <ChevronRight size={10} />
                </Link>
              </div>
            </motion.div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
              <Package size={48} className="mx-auto text-primary/10 mb-4" />
              <h3 className="text-xl font-black italic tracking-tighter uppercase mb-2">No Orders Yet</h3>
              <p className="text-primary/40 uppercase tracking-widest text-xs mb-8">Your ASCEND journey starts with your first piece of gear.</p>
              <Link to="/shop" className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-xl">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
