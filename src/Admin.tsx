import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Settings, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { db, collection, onSnapshot, deleteDoc, doc, updateDoc, handleFirestoreError, OperationType } from './firebase';
import { Product, Order } from './types';
import { useAuth } from './AuthContext';
import { X, CheckCircle, Truck, PackageCheck, Clock } from 'lucide-react';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('pending');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingCarrier, setShippingCarrier] = useState('');
  
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    const productsPath = 'products';
    const unsubProducts = onSnapshot(
      collection(db, productsPath), 
      (snapshot) => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, productsPath);
      }
    );

    const ordersPath = 'orders';
    const unsubOrders = onSnapshot(
      collection(db, ordersPath), 
      (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, ordersPath);
      }
    );

    return () => {
      unsubProducts();
      unsubOrders();
    };
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
      }
    }
  };

  const handleUpdateOrderStatus = async () => {
    if (!editingOrder) return;
    
    try {
      const orderRef = doc(db, 'orders', editingOrder.id);
      await updateDoc(orderRef, {
        status: newStatus,
        trackingNumber: trackingNumber || null,
        shippingCarrier: shippingCarrier || null
      });
      setEditingOrder(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${editingOrder.id}`);
    }
  };

  const openOrderEdit = (order: Order) => {
    setEditingOrder(order);
    setNewStatus(order.status);
    setTrackingNumber(order.trackingNumber || '');
    setShippingCarrier(order.shippingCarrier || '');
  };

  const stats = [
    { label: 'Total Sales', value: `₱${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, icon: <ShoppingBag size={20} /> },
    { label: 'Active Orders', value: orders.filter(o => o.status === 'pending').length.toString(), icon: <Package size={20} /> },
    { label: 'Products', value: products.length.toString(), icon: <LayoutDashboard size={20} /> },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-soft-white">Loading Admin...</div>;
  if (!isAdmin) return null;

  return (
    <div className="bg-soft-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-8 hidden lg:block">
        <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-12">Admin Panel</h2>
        <nav className="space-y-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
            { id: 'products', label: 'Products', icon: <Package size={18} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-accent text-primary shadow-lg' : 'hover:bg-white/5 text-white/60'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <button 
          onClick={logout}
          className="mt-auto w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:text-red-300 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-grow p-12">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-primary/40 text-xs uppercase tracking-widest">Manage your ASCEND empire</p>
            </div>
            {activeTab === 'products' && (
              <button className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-accent hover:text-primary transition-all shadow-xl">
                <Plus size={20} />
                Add Product
              </button>
            )}
          </header>

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-soft-white text-primary rounded-xl">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black italic tracking-tighter">{stat.value}</h3>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-soft-white">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Product</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Category</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Price</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Stock</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-soft-white/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={product.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                          <span className="font-bold text-sm uppercase tracking-tight">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs text-primary/60 uppercase tracking-widest">{product.category}</td>
                      <td className="px-8 py-6 font-bold text-sm">₱{product.price.toLocaleString()}</td>
                      <td className="px-8 py-6 text-sm">{product.stock}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 hover:text-accent transition-colors"><Edit size={18} /></button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-soft-white">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Order ID</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Customer</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Total</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40">Status</th>
                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-primary/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-soft-white/50 transition-colors">
                      <td className="px-8 py-6 text-xs font-mono">{order.id}</td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-sm uppercase tracking-tight">{order.shippingInfo.name}</p>
                        <p className="text-[10px] text-primary/40">{order.shippingInfo.email}</p>
                      </td>
                      <td className="px-8 py-6 font-bold text-sm">₱{order.total.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => openOrderEdit(order)}
                          className="p-2 hover:text-accent transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-primary/40 uppercase tracking-widest text-xs">No active orders found.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Edit Modal */}
        {editingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-black italic tracking-tighter uppercase">Update Order Status</h3>
                <button onClick={() => setEditingOrder(null)} className="text-primary/40 hover:text-primary">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2">Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'pending', icon: <Clock size={14} />, color: 'yellow' },
                      { id: 'confirmed', icon: <CheckCircle size={14} />, color: 'blue' },
                      { id: 'shipped', icon: <Truck size={14} />, color: 'purple' },
                      { id: 'delivered', icon: <PackageCheck size={14} />, color: 'green' }
                    ].map(status => (
                      <button
                        key={status.id}
                        onClick={() => setNewStatus(status.id as Order['status'])}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all text-[10px] font-bold uppercase tracking-widest ${
                          newStatus === status.id 
                            ? `bg-${status.color}-50 border-${status.color}-500 text-${status.color}-700` 
                            : 'border-gray-100 hover:border-accent'
                        }`}
                      >
                        {status.icon}
                        {status.id}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2">Shipping Carrier</label>
                  <input
                    type="text"
                    value={shippingCarrier}
                    onChange={(e) => setShippingCarrier(e.target.value)}
                    placeholder="e.g. J&T Express, LBC"
                    className="w-full px-6 py-4 bg-soft-white rounded-xl border-none focus:ring-2 focus:ring-accent outline-none font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking ID"
                    className="w-full px-6 py-4 bg-soft-white rounded-xl border-none focus:ring-2 focus:ring-accent outline-none font-medium text-sm"
                  />
                </div>

                <button
                  onClick={handleUpdateOrderStatus}
                  className="w-full py-5 bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-xl"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};
