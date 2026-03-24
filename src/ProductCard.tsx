import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from './types';
import { motion } from 'motion/react';
import { useCart } from './CartContext';
import { PhilippineFlag } from './components/PhilippineFlag';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-accent text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              Featured
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
              className="flex-1 bg-accent text-primary font-bold text-xs uppercase py-3 flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              className="p-3 bg-white text-primary hover:bg-accent transition-colors"
            >
              <Eye size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-1 group-hover:text-primary/70 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-xs text-primary/60 uppercase tracking-widest">{product.category}</p>
        </div>
        <p className="font-bold text-sm">₱{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};
