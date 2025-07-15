import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';

// Import wig images
import wig1 from '@/assets/wig-1.jpg';
import wig2 from '@/assets/wig-2.jpg';
import wig3 from '@/assets/wig-3.jpg';
import wig4 from '@/assets/wig-4.jpg';

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

  // ADMIN SECTION: Add/Edit Products Here
  const products = [
    {
      id: 1,
      name: "Brazilian Ombre Lace Front Wig",
      description: "Premium Brazilian human hair wig with natural black to honey blonde ombre. Perfect for a glamorous look with soft, bouncy waves.",
      images: [wig1, wig1, wig1], // Admin: Add more images here
      variants: [
        // Admin: Edit stock levels and prices here
        { laceSize: "13x4 Lace Front", inchSize: "16 inches", price: 12500, stock: 5 },
        { laceSize: "13x4 Lace Front", inchSize: "18 inches", price: 14500, stock: 3 },
        { laceSize: "13x4 Lace Front", inchSize: "20 inches", price: 16500, stock: 0 }, // Out of stock
        { laceSize: "13x6 Lace Front", inchSize: "16 inches", price: 14500, stock: 4 },
        { laceSize: "13x6 Lace Front", inchSize: "18 inches", price: 16500, stock: 2 },
        { laceSize: "13x6 Lace Front", inchSize: "20 inches", price: 18500, stock: 1 },
      ],
      rating: 4.8,
      reviews: 156,
      originalPrice: 20000,
      category: "lace-front"
    },
    {
      id: 2,
      name: "Peruvian Straight Full Lace Wig",
      description: "Luxurious Peruvian human hair in natural dark brown. Silky straight texture that can be styled in any direction with 360-degree lace.",
      images: [wig2, wig2, wig2],
      variants: [
        { laceSize: "Full Lace", inchSize: "14 inches", price: 18500, stock: 3 },
        { laceSize: "Full Lace", inchSize: "16 inches", price: 20500, stock: 2 },
        { laceSize: "Full Lace", inchSize: "18 inches", price: 22500, stock: 4 },
        { laceSize: "360 Lace", inchSize: "14 inches", price: 16500, stock: 6 },
        { laceSize: "360 Lace", inchSize: "16 inches", price: 18500, stock: 3 },
        { laceSize: "360 Lace", inchSize: "18 inches", price: 20500, stock: 1 },
      ],
      rating: 4.9,
      reviews: 203,
      originalPrice: 25000,
      category: "full-lace"
    },
    {
      id: 3,
      name: "Indian Curly 360 Lace Wig",
      description: "Beautiful Indian human hair with natural jet black color and bouncy curls. 360 lace construction allows for high ponytails and updos.",
      images: [wig3, wig3, wig3],
      variants: [
        { laceSize: "360 Lace", inchSize: "18 inches", price: 17500, stock: 4 },
        { laceSize: "360 Lace", inchSize: "20 inches", price: 19500, stock: 2 },
        { laceSize: "360 Lace", inchSize: "22 inches", price: 21500, stock: 3 },
        { laceSize: "Full Lace", inchSize: "18 inches", price: 21500, stock: 2 },
        { laceSize: "Full Lace", inchSize: "20 inches", price: 23500, stock: 1 },
        { laceSize: "Full Lace", inchSize: "22 inches", price: 25500, stock: 0 }, // Out of stock
      ],
      rating: 4.7,
      reviews: 89,
      originalPrice: 28000,
      category: "360-lace"
    },
    {
      id: 4,
      name: "Auburn Red Closure Wig",
      description: "Stunning Indian human hair in rich auburn red color with loose body waves. 4x4 closure construction for a natural hairline.",
      images: [wig4, wig4, wig4],
      variants: [
        { laceSize: "4x4 Closure", inchSize: "16 inches", price: 11500, stock: 6 },
        { laceSize: "4x4 Closure", inchSize: "18 inches", price: 13500, stock: 4 },
        { laceSize: "4x4 Closure", inchSize: "20 inches", price: 15500, stock: 2 },
        { laceSize: "5x5 Closure", inchSize: "16 inches", price: 13500, stock: 3 },
        { laceSize: "5x5 Closure", inchSize: "18 inches", price: 15500, stock: 5 },
        { laceSize: "5x5 Closure", inchSize: "20 inches", price: 17500, stock: 1 },
      ],
      rating: 4.6,
      reviews: 127,
      originalPrice: 18000,
      category: "closure"
    },
    // Admin: Copy the block above to add more products
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

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-elegant p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Wigs' },
                { key: 'lace-front', label: 'Lace Front' },
                { key: 'full-lace', label: 'Full Lace' },
                { key: '360-lace', label: '360 Lace' },
                { key: 'closure', label: 'Closure' }
              ].map(category => (
                <button
                  key={category.key}
                  onClick={() => setFilterCategory(category.key)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
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
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-border rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-light rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-gold' : 'text-muted-foreground'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white text-gold' : 'text-muted-foreground'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-muted-foreground mb-6">
          Showing {sortedProducts.length} of {products.length} wigs
        </div>

        {/* Product Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 lg:grid-cols-2'
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