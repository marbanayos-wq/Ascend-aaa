import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ChevronRight, Check, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from './CartContext';
import { ProductCard } from './ProductCard';
import { Product } from './types';
import { db, doc, getDoc, collection, onSnapshot } from './firebase';
import { PhilippineFlag } from './components/PhilippineFlag';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() } as Product;
        setProduct(data);
        setSelectedSize(data.sizes[0]);
        setSelectedColor(data.colors[0]);
      }
      setLoading(false);
    };

    fetchProduct();

    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      if (product) {
        setRelatedProducts(allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4));
      } else {
        setRelatedProducts(allProducts.slice(0, 4));
      }
    });

    return () => unsubscribe();
  }, [id, product?.category]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-soft-white">Loading...</div>;
  }

  return (
    <div className="bg-soft-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center flex-wrap gap-y-2 space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-8 md:mb-12">
          <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight size={12} className="flex-shrink-0" />
          <Link to="/shop" className="hover:text-primary transition-colors whitespace-nowrap">Shop</Link>
          <ChevronRight size={12} className="flex-shrink-0" />
          <span className="text-primary line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-24">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] bg-white overflow-hidden rounded-2xl shadow-sm relative"
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-accent shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.2em] mb-2 md:mb-4 block">
                {product.category}
              </span>
              <div className="flex items-center gap-4 mb-3 md:mb-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter leading-tight md:leading-none">
                  {product.name}
                </h1>
              </div>
              <p className="text-xl md:text-2xl font-bold text-primary">₱{product.price.toLocaleString()}</p>
            </div>

            <p className="text-base md:text-lg text-primary/70 leading-relaxed mb-8 md:mb-10">
              {product.description}
            </p>

            {/* Selection */}
            <div className="space-y-8 mb-12">
              {/* Sizes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center font-bold text-sm border-2 transition-all ${
                        selectedSize === size ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white border-gray-100 hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Select Color</h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 font-bold text-xs uppercase border-2 transition-all ${
                        selectedColor === color ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white border-gray-100 hover:border-accent'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Quantity</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white border border-gray-100 rounded-lg shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:text-accent transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 hover:text-accent transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12">
              <button
                onClick={() => addToCart(product, selectedSize, selectedColor)}
                className="flex-[2] bg-primary text-white font-bold uppercase tracking-widest py-4 md:py-5 flex items-center justify-center gap-3 hover:bg-primary/90 transition-all transform hover:-translate-y-1 shadow-xl"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="flex-1 bg-white text-primary border border-gray-100 font-bold uppercase tracking-widest py-4 md:py-5 flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-sm">
                <Heart size={20} />
                Wishlist
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-100 pt-10 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm font-medium text-primary/70">
                    <div className="p-1 bg-accent/20 text-accent rounded-full">
                      <Check size={14} />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-24 border-t border-gray-100">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Related Gear</h2>
              <div className="w-24 h-1 bg-accent mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
