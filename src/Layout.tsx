import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Instagram, Facebook, Phone, Mail, User, LogOut } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { BRAND_NAME, CONTACT_PHONE } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { PhilippineFlag } from './components/PhilippineFlag';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, login, logout, isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (user) {
    navLinks.push({ name: 'Orders', path: '/orders' });
  }

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold tracking-tighter uppercase font-display italic leading-none">
                {BRAND_NAME}
              </span>
            </div>
            <PhilippineFlag className="w-8 h-5 rounded-sm shadow-lg group-hover:scale-110 transition-transform" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-accent' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-bold uppercase tracking-widest text-accent hover:text-white transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {user ? (
              <div className="flex items-center space-x-4">
                <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-white/20" />
                <button onClick={logout} className="p-2 hover:text-accent transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button onClick={login} className="p-2 hover:text-accent transition-colors" title="Login">
                <User size={24} />
              </button>
            )}
            <Link to="/cart" className="relative p-2 hover:text-accent transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-4 text-base font-medium uppercase tracking-widest hover:bg-white/5 hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-extrabold tracking-tighter uppercase font-display italic">
                {BRAND_NAME}
              </span>
              <PhilippineFlag className="w-8 h-5 rounded-sm shadow-lg opacity-90" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Built for performance, strength, and style. Rise above your limits with ASCEND sportswear.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
              <li><Link to="/collections" className="hover:text-accent transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-primary transition-all">
                <span className="font-bold text-xs">TikTok</span>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-accent" />
                <span>{CONTACT_PHONE}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-accent" />
                <span>info@ascendsportswear.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {BRAND_NAME} Sportswear. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
