import { Product } from './types';

export const BRAND_NAME = "ASCEND";
export const BRAND_TAGLINE = "Rise Above";
export const BRAND_SUBTITLE = "Built for Performance";
export const BRAND_OWNER = "Marius Polo Banayos";
export const CONTACT_PHONE = "09157172071";

export const CATEGORIES = [
  "Training Shirts",
  "Hoodies",
  "Shorts",
  "Joggers",
  "Jackets",
  "Caps",
  "Accessories"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Performance Training Tee",
    price: 850,
    description: "Engineered for high-intensity workouts with sweat-wicking fabric.",
    category: "Training Shirts",
    images: [
      "https://picsum.photos/seed/manila-athlete-1/800/1000",
      "https://picsum.photos/seed/manila-athlete-1-back/800/1000"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Grey"],
    features: ["Performance", "Sweat-resistant", "Comfort"],
    isFeatured: true,
    isNew: true,
    stock: 50
  },
  {
    id: "5",
    name: "Vanguard Compression Top",
    price: 950,
    description: "Ultra-tight, second-skin fit that keeps you locked in and ready.",
    category: "Training Shirts",
    images: [
      "https://picsum.photos/seed/bgc-taguig-athlete-5/800/1000",
      "https://picsum.photos/seed/bgc-taguig-athlete-5-back/800/1000"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    features: ["Compression", "Quick-dry", "Supportive"],
    isFeatured: false,
    stock: 45
  },
  {
    id: "6",
    name: "Summit Performance Cap",
    price: 550,
    description: "Breathable mesh panels and adjustable strap for a perfect fit.",
    category: "Caps",
    images: [
      "https://picsum.photos/seed/makati-athlete-6/800/1000",
      "https://picsum.photos/seed/makati-athlete-6-alt/800/1000"
    ],
    sizes: ["One Size"],
    colors: ["Black", "Navy"],
    features: ["Breathable", "Adjustable", "Lightweight"],
    isNew: true,
    stock: 100
  },
  {
    id: "2",
    name: "Ascend Elite Hoodie",
    price: 1850,
    description: "Premium heavyweight cotton blend for warmth and style.",
    category: "Hoodies",
    images: [
      "https://picsum.photos/seed/pinoy-fitness-2/800/1000",
      "https://picsum.photos/seed/pinoy-fitness-2-back/800/1000"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    features: ["Heavyweight", "Premium Fit", "Durable"],
    isFeatured: true,
    stock: 30
  },
  {
    id: "3",
    name: "Pro-Flex Shorts",
    price: 750,
    description: "Lightweight and flexible shorts for maximum range of motion.",
    category: "Shorts",
    images: [
      "https://picsum.photos/seed/philippine-gym-3/800/1000",
      "https://picsum.photos/seed/philippine-gym-3-back/800/1000"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Blue"],
    features: ["Lightweight", "Flexible", "Breathable"],
    isNew: true,
    stock: 40
  },
  {
    id: "4",
    name: "Stealth Joggers",
    price: 1250,
    description: "Tapered fit joggers designed for both training and lifestyle.",
    category: "Joggers",
    images: [
      "https://picsum.photos/seed/manila-gym-athlete-4/800/1000",
      "https://picsum.photos/seed/manila-gym-athlete-4-back/800/1000"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Grey"],
    features: ["Tapered Fit", "Soft Fabric", "Versatile"],
    isFeatured: true,
    stock: 25
  },
  {
    id: "7",
    name: "Apex Compression Leggings",
    price: 1150,
    description: "Full-length compression for improved circulation and muscle support.",
    category: "Joggers",
    images: [
      "https://picsum.photos/seed/pinoy-athlete-7/800/1000",
      "https://picsum.photos/seed/pinoy-athlete-7-back/800/1000"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Navy"],
    features: ["Compression", "Muscle Support", "Quick-dry"],
    isNew: true,
    stock: 35
  },
  {
    id: "8",
    name: "Velocity Windbreaker",
    price: 2250,
    description: "Ultra-lightweight protection against the elements.",
    category: "Jackets",
    images: [
      "https://picsum.photos/seed/makati-fitness-8/800/1000",
      "https://picsum.photos/seed/makati-fitness-8-back/800/1000"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Grey", "Black"],
    features: ["Windproof", "Water-resistant", "Packable"],
    isFeatured: true,
    stock: 20
  }
];
