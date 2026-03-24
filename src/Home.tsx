import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_TAGLINE, BRAND_SUBTITLE, MOCK_PRODUCTS, BRAND_OWNER } from './constants';
import { ProductCard } from './ProductCard';
import { Product } from './types';
import { db, collection, onSnapshot, setDoc, doc, handleFirestoreError, OperationType } from './firebase';
import { useAuth } from './AuthContext';

import { PhilippineFlag } from './components/PhilippineFlag';

// Helper to seed database if empty
const seedDatabase = async (products: Product[]) => {
  try {
    for (const product of products) {
      await setDoc(doc(db, 'products', product.id), product);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'products');
  }
};

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/filipino-athlete-hero/1920/1080?grayscale"
          alt="Athlete training"
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
      </div>

      {/* Flag Badge */}
      <div className="absolute top-24 right-8 z-20 hidden lg:block">
        <PhilippineFlag className="w-12 h-8 rounded-md shadow-2xl opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl sm:text-8xl font-black italic tracking-tighter text-white mb-4 leading-none">
            {BRAND_TAGLINE}
          </h1>
          
          <div className="flex items-center gap-3 mb-6">
            <PhilippineFlag className="w-6 h-4 rounded-sm shadow-lg" />
          </div>

          <p className="text-xl sm:text-2xl font-medium text-accent uppercase tracking-[0.2em] mb-8">
            {BRAND_SUBTITLE}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="px-10 py-5 bg-accent text-primary font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-3"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/collections"
              className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all flex items-center justify-center"
            >
              View Collections
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Zap size={32} />, title: "Elite Performance", desc: "Engineered for the athlete's peak output." },
    { icon: <ShieldCheck size={32} />, title: "Local Durability", desc: "Built to withstand the toughest training in the tropics." },
    { icon: <TrendingUp size={32} />, title: "Asian Fit", desc: "Modern athletic aesthetic tailored for the Asian physique." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center p-8 border border-gray-100 hover:shadow-2xl transition-shadow rounded-2xl"
            >
              <div className="inline-flex p-4 bg-soft-white text-primary rounded-full mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-primary/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  const featured = products.filter(p => p.isFeatured);

  return (
    <section className="py-24 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black mb-2">Featured Gear</h2>
            <p className="text-primary/60 uppercase tracking-widest text-xs">Top picks for elite performance</p>
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-accent transition-colors">
            View All Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandStory = () => {
  return (
    <section className="py-24 bg-accent text-primary overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-8 leading-tight">
              The ASCEND Story: <br />
              Performance Meets Purpose
            </h2>
            <div className="space-y-6 text-lg leading-relaxed font-medium">
              <p>
                ASCEND is a high-performance sportswear brand created for athletes and active individuals who refuse to settle for anything less than excellence.
              </p>
              <p>
                Founded by {BRAND_OWNER}, ASCEND combines cutting-edge performance technology with a commitment to strength and style. Every stitch is designed to help you rise above your limits, showcasing elite craftsmanship to the world.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-block mt-10 px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Read Our Full Story
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-primary/10 rounded-full absolute -top-10 -right-10 w-full h-full -z-10" />
            <div className="relative">
              <img
                src="https://picsum.photos/seed/filipino-athlete-story/800/800"
                alt="Brand story"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 right-6">
                <PhilippineFlag className="w-12 h-8 rounded-md shadow-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const path = 'products';
    const unsubscribe = onSnapshot(
      collection(db, path), 
      (snapshot) => {
        const productData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productData);
        setLoading(false);
        
        // Seed if empty and user is admin
        if (productData.length === 0 && isAdmin) {
          seedDatabase(MOCK_PRODUCTS);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-soft-white">Loading...</div>;
  }

  return (
    <div className="bg-soft-white">
      <Hero />
      <Features />
      <FeaturedProducts products={products} />
      <BrandStory />
      {/* New Arrivals Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">New Arrivals</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.isNew).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

