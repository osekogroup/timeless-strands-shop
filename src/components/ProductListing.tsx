import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import { products } from '@/data/products';

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

  const handleAddToCart = (cartItem: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === cartItem.id && 
               item.laceSize === cartItem.laceSize && 
               item.inchSize === cartItem.inchSize
    );

    let newCartItems;
    if (existingItemIndex >= 0) {
      newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += cartItem.quantity;
    } else {
      newCartItems = [...cartItems, cartItem];
    }

    setCartItems(newCartItems);
    onUpdateCart(newCartItems);
  };

  const filteredProducts = products.filter(product => {
    if (filterCategory === 'all') return true;
    return product.category === filterCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price));
      case 'price-high':
        return Math.max(...b.variants.map(v => v.price)) - Math.max(...a.variants.map(v => v.price));
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All Wigs
          </button>
          <button
            onClick={() => setFilterCategory('closure')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'closure'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Closure Wigs
          </button>
          <button
            onClick={() => setFilterCategory('frontal')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'frontal'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Frontal Wigs
          </button>
          <button
            onClick={() => setFilterCategory('glueless')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'glueless'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Glueless
          </button>
          <button
            onClick={() => setFilterCategory('pixie')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'pixie'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Pixie Cuts
          </button>
          <button
            onClick={() => setFilterCategory('straight')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'straight'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Straight
          </button>
          <button
            onClick={() => setFilterCategory('curly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'curly'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Curly
          </button>
          <button
            onClick={() => setFilterCategory('wave')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'wave'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Wave
          </button>
          <button
            onClick={() => setFilterCategory('bob')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === 'bob'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Bob
          </button>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            images={product.images || []}
            variants={product.variants || []}
            rating={product.rating}
            reviews={product.reviews}
            hasVideo={product.hasVideo}
            videoLength={product.videoLength}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found in this category.</p>
        </div>
      )}
    </section>
  );
};


export default ProductListing;
