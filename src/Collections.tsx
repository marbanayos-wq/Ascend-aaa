import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from './constants';
import { PhilippineFlag } from './components/PhilippineFlag';

export const Collections = () => {
  const collections = [
    { name: "Summer Performance", image: "https://picsum.photos/seed/filipino-summer/1200/800", count: 12 },
    { name: "Winter Training", image: "https://picsum.photos/seed/asian-winter/1200/800", count: 8 },
    { name: "Elite Lifestyle", image: "https://picsum.photos/seed/filipino-elite/1200/800", count: 15 },
    { name: "Training Essentials", image: "https://picsum.photos/seed/asian-essentials/1200/800", count: 20 },
  ];

  return (
    <div className="bg-soft-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-4">Collections</h1>
          <p className="text-primary/60 uppercase tracking-widest text-xs">Curated gear for every season and style</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {collections.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[600px] overflow-hidden rounded-3xl shadow-2xl"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 z-20">
                <PhilippineFlag className="w-8 h-5 rounded-sm shadow-xl opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <p className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">
                  {col.count} Products
                </p>
                <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase mb-8">
                  {col.name}
                </h2>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold uppercase tracking-widest hover:bg-accent transition-all transform hover:-translate-y-1"
                >
                  Explore Collection
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category Grid */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Shop by Category</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                to={`/shop?category=${cat}`}
                className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center hover:bg-primary hover:text-white transition-all group"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest group-hover:text-accent transition-colors">
                  {cat}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
