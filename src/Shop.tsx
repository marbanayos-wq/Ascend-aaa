import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from './constants';
import { ProductCard } from './ProductCard';
import { Product } from './types';
import { db, collection, onSnapshot, handleFirestoreError, OperationType } from './firebase';
import { PhilippineFlag } from './components/PhilippineFlag';

export const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  useEffect(() => {
    const path = 'products';
    const unsubscribe = onSnapshot(
      collection(db, path), 
      (snapshot) => {
        const productData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productData);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0; // Default newest
    });
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-soft-white">Loading...</div>;
  }

  return (
    <div className="bg-soft-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/filipino-athlete-shop/1920/1080?grayscale"
            alt="The Shop"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute top-8 right-8 z-20">
          <PhilippineFlag className="w-8 h-5 rounded-sm shadow-xl opacity-60" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl sm:text-7xl font-black italic tracking-tighter text-white mb-4 uppercase">
            The Shop
          </h1>
          <p className="text-accent font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
            Performance gear for elite athletes
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-none focus:ring-2 focus:ring-accent outline-none shadow-sm font-medium"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white font-bold uppercase tracking-widest text-xs shadow-sm hover:bg-accent transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
            <div className="relative flex-1 md:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-6 py-4 bg-white font-bold uppercase tracking-widest text-xs shadow-sm focus:ring-2 focus:ring-accent outline-none pr-12"
              >
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40" size={16} />
            </div>
          </div>
        </div>

        {/* Filter Drawer */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white p-8 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Categories */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold uppercase tracking-widest text-sm">Categories</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                          selectedCategory === 'All' ? 'bg-primary text-white border-primary' : 'border-gray-100 hover:border-accent'
                        }`}
                      >
                        All
                      </button>
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                            selectedCategory === cat ? 'bg-primary text-white border-primary' : 'border-gray-100 hover:border-accent'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold uppercase tracking-widest text-sm">Price Range</h3>
                      <span className="text-xs font-bold text-accent">₱{priceRange[0]} - ₱{priceRange[1]}</span>
                    </div>
                    <div className="space-y-6">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary/40">
                        <span>₱0</span>
                        <span>₱5,000+</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceRange([0, 5000]);
                    }}
                    className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-2xl font-bold mb-4 uppercase">No products found</h3>
            <p className="text-primary/60 mb-8">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setPriceRange([0, 5000]); }}
              className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
