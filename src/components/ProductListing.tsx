import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';

// Import new wig images
import curlyHumanHairWig from '@/assets/curly-human-hair-wig.jpg';
import blondeBobWig from '@/assets/blonde-bob-wig.jpg';
import burgundyStraightWig from '@/assets/burgundy-straight-wig.jpg';
import deepBurgundyLongWig from '@/assets/deep-burgundy-long-wig.jpg';
import naturalStraightBobWig from '@/assets/natural-straight-bob-wig.jpg';
import naturalAfroWig from '@/assets/natural-afro-wig.jpg';
import fullLaceCurlyWig from '@/assets/full-lace-curly-wig.jpg';
import redAfroWig from '@/assets/red-afro-wig.jpg';
import kinkyCurlyRedHighlightWig from '@/assets/kinky-curly-red-highlight-wig.jpg';
import gluelessStraightLongWig from '@/assets/glueless-straight-long-wig.jpg';
import honeyBlondeAfroWig from '@/assets/honey-blonde-afro-wig.jpg';
import redBouncyCurlsWig from '@/assets/red-bouncy-curls-wig.jpg';

interface CartItem {
  id: number;
  name: string;
  image: string;
  laceSize: string;
  inchSize: string;
  price: number;
  quantity: number;
}

interface ProductListingProps {
  onUpdateCart: (items: CartItem[]) => void;
}

const ProductListing: React.FC<ProductListingProps> = ({ onUpdateCart }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // NEW WIG COLLECTION - 13 Premium Products
  const products = [
    {
      id: 1,
      name: "Curly Human Hair Wig",
      description: "Beautiful bouncy curls with natural black color. Premium human hair that maintains its curl pattern and shine.",
      images: [curlyHumanHairWig, curlyHumanHairWig, curlyHumanHairWig],
      variants: [
        { laceSize: "4x4 Closure", inchSize: "16 inches", price: 4500, stock: 8 },
      ],
      rating: 4.9,
      reviews: 234,
      category: "closure",
      hasVideo: false
    },
    {
      id: 2,
      name: "4x4 Lace Closure BOB Wig - 180% Density",
      description: "#613 blonde color with body wave texture and hair curler style. Perfect short bob for a chic look.",
      images: [blondeBobWig, blondeBobWig, blondeBobWig],
      variants: [
        { laceSize: "4x4 Closure", inchSize: "10 inches", price: 7200, stock: 5 },
        { laceSize: "4x4 Closure", inchSize: "12 inches", price: 7400, stock: 3 },
        { laceSize: "4x4 Closure", inchSize: "14 inches", price: 8100, stock: 4 },
      ],
      rating: 4.8,
      reviews: 189,
      category: "closure",
      hasVideo: true,
      videoLength: "10 inches"
    },
    {
      id: 3,
      name: "5x5 Lace Closure Wig - 180% Density",
      description: "1B with dark burgundy 99J color highlights. Straight texture for a sleek, sophisticated look.",
      images: [burgundyStraightWig, burgundyStraightWig, burgundyStraightWig],
      variants: [
        { laceSize: "5x5 Closure", inchSize: "18 inches", price: 8405, stock: 6 },
        { laceSize: "5x5 Closure", inchSize: "20 inches", price: 9397, stock: 4 },
        { laceSize: "5x5 Closure", inchSize: "22 inches", price: 11083, stock: 2 },
      ],
      rating: 4.7,
      reviews: 156,
      category: "closure",
      hasVideo: true,
      videoLength: "20 inches"
    },
    {
      id: 4,
      name: "4x4 Lace Closure Wig - 180% Density",
      description: "Deep burgundy 99J color with straight texture. Ultra-long lengths for maximum glamour.",
      images: [deepBurgundyLongWig, deepBurgundyLongWig, deepBurgundyLongWig],
      variants: [
        { laceSize: "4x4 Closure", inchSize: "26 inches", price: 14999, stock: 3 },
        { laceSize: "4x4 Closure", inchSize: "28 inches", price: 17900, stock: 2 },
        { laceSize: "4x4 Closure", inchSize: "30 inches", price: 21999, stock: 1 },
      ],
      rating: 4.9,
      reviews: 98,
      category: "closure",
      hasVideo: true,
      videoLength: "28 inches"
    },
    {
      id: 5,
      name: "4x4 Lace Closure Straight BOB - 180% Density",
      description: "Natural black color with straight BOB style. Perfect for a classic, polished look.",
      images: [naturalStraightBobWig, naturalStraightBobWig, naturalStraightBobWig],
      variants: [
        { laceSize: "4x4 Closure", inchSize: "10 inches", price: 5210, stock: 7 },
        { laceSize: "4x4 Closure", inchSize: "12 inches", price: 6122, stock: 5 },
        { laceSize: "4x4 Closure", inchSize: "14 inches", price: 7083, stock: 4 },
      ],
      rating: 4.8,
      reviews: 203,
      category: "closure",
      hasVideo: true,
      videoLength: "10 inches"
    },
    {
      id: 6,
      name: "5x5 Lace Glueless Closure Wig - 180% Density",
      description: "Natural black color with afro texture. Glueless application for comfort and convenience.",
      images: [naturalAfroWig, naturalAfroWig, naturalAfroWig],
      variants: [
        { laceSize: "5x5 Glueless", inchSize: "16 inches", price: 8067, stock: 5 },
        { laceSize: "5x5 Glueless", inchSize: "18 inches", price: 8860, stock: 3 },
        { laceSize: "5x5 Glueless", inchSize: "20 inches", price: 10199, stock: 2 },
      ],
      rating: 4.9,
      reviews: 167,
      category: "glueless",
      hasVideo: true,
      videoLength: "18 inches"
    },
    {
      id: 7,
      name: "12A 13x4 Full Lace Frontal Wig - 210% Density",
      description: "Natural black color with customized curly pattern. Premium 12A grade hair with 210% density.",
      images: [fullLaceCurlyWig, fullLaceCurlyWig, fullLaceCurlyWig],
      variants: [
        { laceSize: "13x4 Frontal", inchSize: "14 inches", price: 10271, stock: 4 },
        { laceSize: "13x4 Frontal", inchSize: "16 inches", price: 12035, stock: 3 },
        { laceSize: "13x4 Frontal", inchSize: "18 inches", price: 13517, stock: 2 },
      ],
      rating: 4.9,
      reviews: 145,
      category: "frontal",
      hasVideo: true,
      videoLength: "16 inches"
    },
    {
      id: 8,
      name: "13x4 Full Lace Frontal Wig - 180% Density",
      description: "Vibrant red color with afro texture. Bold and beautiful for making a statement.",
      images: [redAfroWig, redAfroWig, redAfroWig],
      variants: [
        { laceSize: "13x4 Frontal", inchSize: "16 inches", price: 8764, stock: 4 },
        { laceSize: "13x4 Frontal", inchSize: "18 inches", price: 9556, stock: 3 },
        { laceSize: "13x4 Frontal", inchSize: "20 inches", price: 11399, stock: 2 },
      ],
      rating: 4.7,
      reviews: 134,
      category: "frontal",
      hasVideo: true,
      videoLength: "18 inches"
    },
    {
      id: 9,
      name: "4x4 Lace Closure Wig - 210% Density",
      description: "P1B/Red30 color blend with kinky curly texture. Natural black base with red highlights.",
      images: [kinkyCurlyRedHighlightWig, kinkyCurlyRedHighlightWig, kinkyCurlyRedHighlightWig],
      variants: [
        { laceSize: "4x4 Closure", inchSize: "16 inches", price: 8505, stock: 5 },
        { laceSize: "4x4 Closure", inchSize: "18 inches", price: 9397, stock: 3 },
        { laceSize: "4x4 Closure", inchSize: "20 inches", price: 10999, stock: 2 },
      ],
      rating: 4.8,
      reviews: 178,
      category: "closure",
      hasVideo: true,
      videoLength: "18 inches"
    },
    {
      id: 10,
      name: "5x5 Lace Glueless Wig - 210% Density",
      description: "Natural black color with straight texture. Extra long lengths with glueless application.",
      images: [gluelessStraightLongWig, gluelessStraightLongWig, gluelessStraightLongWig],
      variants: [
        { laceSize: "5x5 Glueless", inchSize: "22 inches", price: 12999, stock: 3 },
        { laceSize: "5x5 Glueless", inchSize: "24 inches", price: 14399, stock: 2 },
        { laceSize: "5x5 Glueless", inchSize: "26 inches", price: 16599, stock: 1 },
      ],
      rating: 4.9,
      reviews: 156,
      category: "glueless",
      hasVideo: true,
      videoLength: "24 inches"
    },
    {
      id: 11,
      name: "4x4 Lace Closure Wig - 250% Density",
      description: "Honey blonde #6 color with special afro texture. Permanent middle part with ultra-high density.",
      images: [honeyBlondeAfroWig, honeyBlondeAfroWig, honeyBlondeAfroWig],
      variants: [
        { laceSize: "4x4 Closure", inchSize: "12 inches", price: 8229, stock: 4 },
        { laceSize: "4x4 Closure", inchSize: "14 inches", price: 8923, stock: 3 },
        { laceSize: "4x4 Closure", inchSize: "16 inches", price: 9617, stock: 2 },
      ],
      rating: 4.8,
      reviews: 142,
      category: "closure",
      hasVideo: true,
      videoLength: "14 inches"
    },
    {
      id: 12,
      name: "12A Grade 13x4 Full Lace Frontal Wig - 180% Density",
      description: "Vibrant red color with bouncy curl pattern. Premium 12A grade hair with perfect curl definition.",
      images: [redBouncyCurlsWig, redBouncyCurlsWig, redBouncyCurlsWig],
      variants: [
        { laceSize: "13x4 Frontal", inchSize: "16 inches", price: 11235, stock: 3 },
        { laceSize: "13x4 Frontal", inchSize: "18 inches", price: 12557, stock: 2 },
        { laceSize: "13x4 Frontal", inchSize: "20 inches", price: 15499, stock: 1 },
      ],
      rating: 4.9,
      reviews: 123,
      category: "frontal",
      hasVideo: true,
      videoLength: "18 inches"
    }
  ];

  const handleAddToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      cartItem => 
        cartItem.id === item.id && 
        cartItem.laceSize === item.laceSize && 
        cartItem.inchSize === item.inchSize
    );

    let newCartItems;
    if (existingItemIndex > -1) {
      newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
    } else {
      newCartItems = [...cartItems, item];
    }

    setCartItems(newCartItems);
    onUpdateCart(newCartItems);

    // Scroll to checkout section
    const element = document.getElementById('checkout');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = products.filter(product => 
    filterCategory === 'all' || product.category === filterCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price));
      case 'price-high':
        return Math.max(...b.variants.map(v => v.price)) - Math.max(...a.variants.map(v => v.price));
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <section id="products" className="py-16 bg-gray-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-ts-black font-poppins mb-4">
            Our Premium Wig Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium human hair wigs. Each piece is carefully selected 
            for quality, style, and natural beauty.
          </p>
        </div>

        {/* Filters and Controls - Super Responsive */}
        <div className="bg-white rounded-xl shadow-elegant p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {[
                { key: 'all', label: 'All Wigs' },
                { key: 'closure', label: 'Closure' },
                { key: 'frontal', label: 'Frontal' },
                { key: 'glueless', label: 'Glueless' }
              ].map(category => (
                <button
                  key={category.key}
                  onClick={() => setFilterCategory(category.key)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    filterCategory === category.key
                      ? 'bg-gold text-ts-black'
                      : 'bg-gray-light text-muted-foreground hover:bg-gold hover:text-ts-black'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto p-2 border border-border rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm sm:text-base"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-light rounded-lg p-1 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors flex-1 sm:flex-none ${
                    viewMode === 'grid' ? 'bg-white text-gold' : 'text-muted-foreground'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors flex-1 sm:flex-none ${
                    viewMode === 'list' ? 'bg-white text-gold' : 'text-muted-foreground'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-muted-foreground mb-6">
          Showing {sortedProducts.length} of {products.length} wigs
        </div>

        {/* Product Grid - Super Responsive */}
        <div className={`grid gap-4 sm:gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gold hover:bg-gold-dark text-ts-black px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
            Load More Wigs
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;