import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';

interface ProductVariant {
  laceSize: string;
  inchSize: string;
  price: number;
  stock: number;
}

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviews: number;
  originalPrice?: number;
  onAddToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  images,
  variants,
  rating,
  reviews,
  originalPrice,
  onAddToCart
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLaceSize, setSelectedLaceSize] = useState('');
  const [selectedInchSize, setSelectedInchSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get unique lace and inch sizes
  const laceSizes = [...new Set(variants.map(v => v.laceSize))];
  const inchSizes = [...new Set(variants.map(v => v.inchSize))];

  // Get current variant based on selections
  const currentVariant = variants.find(
    v => v.laceSize === selectedLaceSize && v.inchSize === selectedInchSize
  );

  const currentPrice = currentVariant?.price || variants[0]?.price || 0;
  const currentStock = currentVariant?.stock || 0;

  const handleAddToCart = () => {
    if (!selectedLaceSize || !selectedInchSize) {
      alert('Please select both lace size and inch size');
      return;
    }
    
    if (currentStock === 0) {
      alert('This variant is out of stock');
      return;
    }

    onAddToCart({
      id,
      name,
      image: images[0],
      laceSize: selectedLaceSize,
      inchSize: selectedInchSize,
      price: currentPrice,
      quantity: 1
    });
  };

  return (
    <div className="bg-card rounded-2xl shadow-elegant hover:shadow-gold transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-gold' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>

        {/* Stock Badge */}
        {currentStock === 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}

        {/* Discount Badge */}
        {originalPrice && (
          <div className="absolute top-4 left-4 bg-gold text-ts-black px-3 py-1 rounded-full text-sm font-semibold">
            Save Ksh {originalPrice - currentPrice}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'text-gold fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>
          <button className="text-muted-foreground hover:text-gold transition-colors">
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-card-foreground font-poppins line-clamp-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Variant Selectors */}
        <div className="space-y-3">
          {/* Lace Size */}
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-2">
              Lace Size:
            </label>
            <select
              value={selectedLaceSize}
              onChange={(e) => setSelectedLaceSize(e.target.value)}
              className="w-full p-2 border border-border rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option value="">Select Lace Size</option>
              {laceSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Inch Size */}
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-2">
              Length:
            </label>
            <select
              value={selectedInchSize}
              onChange={(e) => setSelectedInchSize(e.target.value)}
              className="w-full p-2 border border-border rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option value="">Select Length</option>
              {inchSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock Status */}
        {selectedLaceSize && selectedInchSize && (
          <div className="text-sm">
            {currentStock > 0 ? (
              <span className="text-green-600 font-semibold">
                ✅ In Stock ({currentStock} available)
              </span>
            ) : (
              <span className="text-red-600 font-semibold">
                ❌ Out of Stock
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gold">
                Ksh {currentPrice.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  Ksh {originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              + delivery fee
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedLaceSize || !selectedInchSize || currentStock === 0}
          className="w-full bg-gold hover:bg-gold-dark disabled:bg-gray-medium disabled:cursor-not-allowed text-ts-black font-bold py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Order</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;