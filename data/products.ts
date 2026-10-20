export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  heroImage?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  collection: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  brand: string;
  retailer?: string;
  description: string;
  longDescription: string;
  materials: string;
  dimensions?: string;
  images: string[];
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
}

export const collections: Collection[] = [
  {
    id: "cleansers",
    name: "Cleansers",
    slug: "cleansers",
    description: "Gentle first steps for every routine",
    image: "https://images.unsplash.com/photo-1556228720-195a1e23f0a4?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1556228720-195a1e23f0a4?w=1920&q=80",
  },
  {
    id: "toners",
    name: "Toners",
    slug: "toners",
    description: "Balancing layers that prep and soothe",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1617897903246-719242758050?w=1920&q=80",
  },
  {
    id: "serums",
    name: "Serums",
    slug: "serums",
    description: "Concentrated actives for targeted results",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1920&q=80",
  },
  {
    id: "moisturizers",
    name: "Moisturizers",
    slug: "moisturizers",
    description: "Barrier support and lasting hydration",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1920&q=80",
  },
  {
    id: "sunscreens",
    name: "Sunscreens",
    slug: "sunscreens",
    description: "Daily protection that wears like skincare",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd0b82?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1596755389378-c31d21fd0b82?w=1920&q=80",
  },
  {
    id: "masks",
    name: "Masks",
    slug: "masks",
    description: "Weekly treatments for reset and glow",
    image: "https://images.unsplash.com/photo-1598440947619-2c0fc1a64a91?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1598440947619-2c0fc1a64a91?w=1920&q=80",
  },
  {
    id: "bestsellers",
    name: "Bestsellers",
    slug: "bestsellers",
    description: "The most-loved products across every routine",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1920&q=80",
  },
  {
    id: "new",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest drops and freshly tracked deals",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=1920&q=80",
  },
];

export const products: Product[] = [
  // Cleansers
  {
    id: "anua-cleansing-oil",
    name: "Heartleaf Pore Control Cleansing Oil",
    slug: "anua-heartleaf-cleansing-oil",
    collection: "cleansers",
    price: 16.8,
    originalPrice: 24.0,
    discount: 30,
    brand: "Anua",
    retailer: "YesStyle",
    description: "Mild daily oil cleanser that melts away SPF and sebum",
    longDescription: "Anua's Heartleaf Cleansing Oil dissolves makeup, sunscreen, and excess oil without stripping the skin. Heartleaf extract calms irritation while a lightweight texture rinses clean, leaving skin soft and balanced.",
    materials: "Heartleaf extract, plant-derived oils",
    dimensions: "200ml",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a1e23f0a4?w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "cosrx-low-ph",
    name: "Low pH Good Morning Gel Cleanser",
    slug: "cosrx-low-ph-cleanser",
    collection: "cleansers",
    price: 8.5,
    originalPrice: 14.0,
    discount: 39,
    brand: "COSRX",
    retailer: "Olive Young Global",
    description: "Gentle pH-balanced gel cleanser for morning and night",
    longDescription: "COSRX's cult-favorite Low pH cleanser uses tea tree oil and BHA to purify pores while maintaining the skin's natural barrier. The soft foam leaves skin refreshed, never tight.",
    materials: "Tea tree oil, BHA, purifying botanicals",
    dimensions: "150ml",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a1e23f0a4?w=800&q=80",
    ],
    new: true,
  },
  // Toners
  {
    id: "anua-heartleaf-toner",
    name: "Heartleaf 77% Soothing Toner",
    slug: "anua-heartleaf-77-toner",
    collection: "toners",
    price: 18.2,
    originalPrice: 28.0,
    discount: 35,
    brand: "Anua",
    retailer: "Olive Young Global",
    description: "Calming toner with 77% heartleaf extract",
    longDescription: "A minimalist toner built around 77% heartleaf extract to soothe redness, balance oil, and prep skin for the next steps. Fragrance-free and suitable for sensitive complexions.",
    materials: "77% Heartleaf extract, Centella, Panthenol",
    dimensions: "250ml",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "cosrx-snail-toner",
    name: "Advanced Snail 96 Mucin Power Essence",
    slug: "cosrx-snail-96-essence",
    collection: "toners",
    price: 13.75,
    originalPrice: 25.0,
    discount: 45,
    brand: "COSRX",
    retailer: "StyleKorean",
    description: "96% snail mucin essence for repair and glow",
    longDescription: "A lightweight, viscous essence packed with 96% snail secretion filtrate to hydrate, repair, and improve texture. A holy grail for dry, damaged, or post-breakout skin.",
    materials: "96% Snail Secretion Filtrate, Sodium Hyaluronate",
    dimensions: "100ml",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
    ],
    bestseller: true,
  },
  // Serums
  {
    id: "beauty-of-joseon-glow-serum",
    name: "Glow Serum : Propolis + Niacinamide",
    slug: "beauty-of-joseon-glow-serum",
    collection: "serums",
    price: 14.4,
    originalPrice: 18.0,
    discount: 20,
    brand: "Beauty of Joseon",
    retailer: "StyleKorean",
    description: "Brightening serum for uneven tone and texture",
    longDescription: "This honey-like serum combines propolis extract and niacinamide to brighten, calm, and refine pores. The rich texture absorbs smoothly and layers well under moisturizer.",
    materials: "Propolis extract, Niacinamide, BHA",
    dimensions: "30ml",
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "skin1004-centella",
    name: "Madagascar Centella Ampoule",
    slug: "skin1004-centella-ampoule",
    collection: "serums",
    price: 14.9,
    originalPrice: 20.0,
    discount: 25,
    brand: "Skin1004",
    retailer: "YesStyle",
    description: "100% centella extract for sensitive skin recovery",
    longDescription: "A single-ingredient ampoule featuring pure Centella Asiatica extract from Madagascar. It calms irritation, strengthens the barrier, and delivers lightweight hydration.",
    materials: "100% Centella Asiatica Extract",
    dimensions: "100ml",
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd0b82?w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80",
    ],
    new: true,
  },
  // Moisturizers
  {
    id: "cosrx-oil-free",
    name: "Oil-Free Ultra Moisturizing Lotion",
    slug: "cosrx-oil-free-lotion",
    collection: "moisturizers",
    price: 16.0,
    originalPrice: 22.0,
    discount: 27,
    brand: "COSRX",
    retailer: "Olive Young Global",
    description: "Lightweight daily lotion with birch sap",
    longDescription: "A fast-absorbing, oil-free moisturizer powered by birch sap to hydrate oily and combination skin without heaviness or shine. Perfect for humid climates and layering.",
    materials: "Birch Sap, Hyaluronic Acid, Tea Tree Oil",
    dimensions: "100ml",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c0fc1a64a91?w=800&q=80",
    ],
  },
  {
    id: "laneige-cream-skin",
    name: "Cream Skin Refiner",
    slug: "laneige-cream-skin-refiner",
    collection: "moisturizers",
    price: 21.0,
    originalPrice: 33.0,
    discount: 36,
    brand: "Laneige",
    retailer: "YesStyle",
    description: "A toner and moisturizer in one milky formula",
    longDescription: "Laneige's Cream Skin blends the benefits of a toner and cream into one soothing, milky layer. White leaf tea water strengthens the barrier while delivering long-lasting hydration.",
    materials: "White Leaf Tea Water, Amino Acids",
    dimensions: "170ml",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c0fc1a64a91?w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    ],
    featured: true,
  },
  // Sunscreens
  {
    id: "beauty-of-joseon-relief-sun",
    name: "Relief Sun : Rice + Probiotics (SPF50+)",
    slug: "beauty-of-joseon-relief-sun",
    collection: "sunscreens",
    price: 12.24,
    originalPrice: 18.0,
    discount: 32,
    brand: "Beauty of Joseon",
    retailer: "StyleKorean",
    description: "Cult-favorite chemical sunscreen with a dewy finish",
    longDescription: "A lightweight, creamy sunscreen infused with rice extract and probiotics to brighten and strengthen skin while providing broad-spectrum SPF50+ PA++++ protection. No white cast, perfect under makeup.",
    materials: "Rice Extract, Probiotics, Niacinamide",
    dimensions: "50ml",
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd0b82?w=800&q=80",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "missha-essence-sun",
    name: "All Around Safe Block Essence Sun Milk",
    slug: "missha-essence-sun-milk",
    collection: "sunscreens",
    price: 11.0,
    originalPrice: 16.0,
    discount: 31,
    brand: "Missha",
    retailer: "YesStyle",
    description: "Weightless sun milk with a matte, silky finish",
    longDescription: "Missha's Essence Sun Milk delivers high protection in a featherlight, non-greasy texture. Double-layer UV technology resists sweat and water for all-day wear.",
    materials: "Edelweiss, Aloe Vera, UV Filters",
    dimensions: "70ml",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=800&q=80",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd0b82?w=800&q=80",
    ],
  },
  // Masks
  {
    id: "laneige-lip-mask",
    name: "Lip Sleeping Mask (Berry)",
    slug: "laneige-lip-sleeping-mask",
    collection: "masks",
    price: 11.0,
    originalPrice: 22.0,
    discount: 50,
    brand: "Laneige",
    retailer: "YesStyle",
    description: "Overnight lip mask for soft, supple lips",
    longDescription: "Laneige's iconic overnight lip mask uses Berry Fruit Complex and Vitamin C to gently exfoliate and deeply moisturize lips while you sleep. Wake up to a smoother, plumper pout.",
    materials: "Berry Fruit Complex, Vitamin C, Coconut Oil",
    dimensions: "20g",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "mediheal-tea-tree",
    name: "Tea Tree Care Solution Essential Mask",
    slug: "mediheal-tea-tree-mask",
    collection: "masks",
    price: 1.5,
    originalPrice: 2.5,
    discount: 40,
    brand: "Mediheal",
    retailer: "Olive Young Global",
    description: "Soothing sheet mask for troubled skin",
    longDescription: "A calming sheet mask soaked in tea tree and chamomile extracts to reduce redness, control oil, and comfort irritated skin in just 15 minutes.",
    materials: "Tea Tree Extract, Chamomile, Witch Hazel",
    dimensions: "1 sheet",
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
    ],
    new: true,
  },
  // Bestsellers
  {
    id: "cosrx-snail-essence",
    name: "Advanced Snail 96 Mucin Power Essence",
    slug: "cosrx-snail-96-essence-bestseller",
    collection: "bestsellers",
    price: 13.75,
    originalPrice: 25.0,
    discount: 45,
    brand: "COSRX",
    retailer: "StyleKorean",
    description: "96% snail mucin essence for repair and glow",
    longDescription: "A lightweight, viscous essence packed with 96% snail secretion filtrate to hydrate, repair, and improve texture. A holy grail for dry, damaged, or post-breakout skin.",
    materials: "96% Snail Secretion Filtrate, Sodium Hyaluronate",
    dimensions: "100ml",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
    ],
    featured: true,
  },
  // New Arrivals
  {
    id: "torriden-dive-in",
    name: "Dive-In Low Molecular Hyaluronic Acid Serum",
    slug: "torriden-dive-in-serum",
    collection: "new",
    price: 15.3,
    originalPrice: 19.0,
    discount: 19,
    brand: "Torriden",
    retailer: "YesStyle",
    description: "Deep hydration with 5 molecular weights of HA",
    longDescription: "Torriden's Dive-In Serum uses five types of hyaluronic acid to hydrate every layer of the skin. Panthenol and allantoin soothe while the watery texture absorbs instantly.",
    materials: "5D Hyaluronic Acid, Panthenol, Allantoin",
    dimensions: "50ml",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    ],
    new: true,
  },
];

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  const collection = collections.find((c) => c.slug === collectionSlug);
  if (!collection) return [];
  return products.filter((product) => product.collection === collection.id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.new);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((collection) => collection.slug === slug);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return products
    .filter((p) => p.collection === product.collection && p.id !== productId)
    .slice(0, limit);
};
