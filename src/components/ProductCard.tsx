import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Heart, ChevronLeft, ChevronRight, Share2, Play, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  hasVideo?: boolean;
  videoLength?: string;
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
  hasVideo = false,
  videoLength,
  onAddToCart
}) => {
  const navigate = useNavigate();
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
    <div className="bg-card rounded-xl sm:rounded-2xl shadow-elegant hover:shadow-gold transition-all duration-300 overflow-hidden group border border-border w-full max-w-sm mx-auto">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={images[currentImageIndex]}
          alt={name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Video Indicator */}
        {hasVideo && (
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-xs">
            <Video className="w-3 h-3" />
            <span>Video</span>
            {videoLength && <span>• {videoLength}</span>}
          </div>
        )}
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Navigation Dots */}
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
          </>
        )}

        {/* Top Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-md"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
          <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-md">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Status Badges */}
        <div className={`absolute ${hasVideo ? 'top-12' : 'top-4'} left-4 flex flex-col space-y-2`}>
          {currentStock === 0 && (
            <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              Out of Stock
            </div>
          )}
          {originalPrice && currentPrice < originalPrice && (
            <div className="bg-gold text-ts-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              -{Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%
            </div>
          )}
          {currentStock > 0 && currentStock <= 3 && (
            <div className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              Only {currentStock} left
            </div>
          )}
        </div>

        {/* Quick View/Play Video on Hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={() => navigate(`/product/${id}`)}
              className="bg-white text-ts-black px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transform scale-90 group-hover:scale-100 transition-transform text-sm"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View Details</span>
            </button>
            {hasVideo && (
              <button 
                onClick={() => navigate(`/product/${id}`)}
                className="bg-gold text-ts-black px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transform scale-90 group-hover:scale-100 transition-transform text-sm"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Watch Video</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(rating) ? 'text-gold fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
          <span className="text-xs text-green-600 font-semibold">Free Shipping</span>
        </div>

        {/* Product Name */}
        <h3 
          onClick={() => navigate(`/product/${id}`)}
          className="text-sm sm:text-base font-bold text-card-foreground font-poppins line-clamp-2 hover:text-gold cursor-pointer transition-colors leading-tight"
        >
          {name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Variant Selectors */}
        <div className="space-y-3">
          {/* Lace Size */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-card-foreground mb-1 sm:mb-2">
              Lace Size:
            </label>
            <select
              value={selectedLaceSize}
              onChange={(e) => setSelectedLaceSize(e.target.value)}
              className="w-full p-2 border border-border rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20 text-xs sm:text-sm"
            >
              <option value="">Select Lace Size</option>
              {laceSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Inch Size */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-card-foreground mb-1 sm:mb-2">
              Length:
            </label>
            <select
              value={selectedInchSize}
              onChange={(e) => setSelectedInchSize(e.target.value)}
              className="w-full p-2 border border-border rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20 text-xs sm:text-sm"
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
        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gold">
                  Ksh {currentPrice.toLocaleString()}
                </span>
                {originalPrice && originalPrice > currentPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    Ksh {originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                + delivery fee
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-green-600">Free Returns</div>
              <div className="text-xs text-muted-foreground">7-14 days</div>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedLaceSize || !selectedInchSize || currentStock === 0}
          className="w-full bg-gold hover:bg-gold-dark disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 text-ts-black font-bold py-2 sm:py-2.5 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md text-sm sm:text-base"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="truncate">{currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;