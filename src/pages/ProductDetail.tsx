import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, Play, ShoppingCart, Plus, Minus, Check, Truck, Shield, RotateCcw, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductReviews from '@/components/ProductReviews';
import ProductRecommendations from '@/components/ProductRecommendations';
import CouponSystem from '@/components/CouponSystem';
import { useWishlist } from '@/components/WishlistProvider';

// Import all product images
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

interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  video?: string;
  variants: Array<{
    laceSize: string;
    inchSize: string;
    price: number;
    stock: number;
  }>;
  rating: number;
  reviews: number;
  category: string;
  hasVideo: boolean;
  videoLength?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details');
  
  const isWishlisted = isInWishlist(parseInt(id || '0'));

  // Get current user
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user || null;
    },
  });

  // Product data (same as ProductListing)
  const products: Product[] = [
    {
      id: 1,
      name: "Curly Human Hair Wig",
      description: "Beautiful bouncy curls with natural black color. Premium human hair that maintains its curl pattern and shine. This luxurious wig features 100% virgin human hair that can be styled, dyed, and treated just like your natural hair. The curl pattern is consistent throughout and maintains its bounce even after washing.",
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
      description: "#613 blonde color with body wave texture and hair curler style. Perfect short bob for a chic look. This stunning bob features a beautiful blonde shade that complements all skin tones. The body wave texture adds volume and movement while maintaining a sophisticated appearance.",
      images: [blondeBobWig, blondeBobWig, blondeBobWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "1B with dark burgundy 99J color highlights. Straight texture for a sleek, sophisticated look. This elegant wig combines the natural black base with rich burgundy highlights that catch the light beautifully. Perfect for those who want to make a statement.",
      images: [burgundyStraightWig, burgundyStraightWig, burgundyStraightWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Deep burgundy 99J color with straight texture. Ultra-long lengths for maximum glamour. This dramatic wig features a rich burgundy color that's perfect for special occasions or everyday glamour. The straight texture provides a sleek, polished finish.",
      images: [deepBurgundyLongWig, deepBurgundyLongWig, deepBurgundyLongWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Natural black color with straight BOB style. Perfect for a classic, polished look. This timeless bob style offers versatility and elegance. The straight texture provides a sleek finish that's perfect for professional or casual settings.",
      images: [naturalStraightBobWig, naturalStraightBobWig, naturalStraightBobWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Natural black color with afro texture. Glueless application for comfort and convenience. This comfortable wig features a natural afro texture that celebrates natural hair patterns. The glueless design ensures easy application and removal.",
      images: [naturalAfroWig, naturalAfroWig, naturalAfroWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Natural black color with customized curly pattern. Premium 12A grade hair with 210% density. This premium wig features the highest grade of human hair with exceptional curl definition and volume. Perfect for those who want the ultimate in luxury.",
      images: [fullLaceCurlyWig, fullLaceCurlyWig, fullLaceCurlyWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Vibrant red color with afro texture. Bold and beautiful for making a statement. This striking wig features a vibrant red color that's perfect for those who love to stand out. The afro texture adds natural volume and movement.",
      images: [redAfroWig, redAfroWig, redAfroWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "P1B/Red30 color blend with kinky curly texture. Natural black base with red highlights. This unique wig combines natural black with vibrant red highlights in a kinky curly pattern that adds texture and dimension.",
      images: [kinkyCurlyRedHighlightWig, kinkyCurlyRedHighlightWig, kinkyCurlyRedHighlightWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Natural black color with straight texture. Extra long lengths with glueless application. This ultra-long wig provides maximum length and volume while maintaining the convenience of glueless application.",
      images: [gluelessStraightLongWig, gluelessStraightLongWig, gluelessStraightLongWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Honey blonde #6 color with special afro texture. Permanent middle part with ultra-high density. This stunning blonde wig features maximum density for incredible volume and a beautiful honey blonde shade.",
      images: [honeyBlondeAfroWig, honeyBlondeAfroWig, honeyBlondeAfroWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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
      description: "Vibrant red color with bouncy curl pattern. Premium 12A grade hair with perfect curl definition. This premium wig features vibrant red color with bouncy curls that maintain their shape and definition.",
      images: [redBouncyCurlsWig, redBouncyCurlsWig, redBouncyCurlsWig],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
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

  const product = products.find(p => p.id === parseInt(id || ''));

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const currentVariant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleWishlistToggle = () => {
    const productId = parseInt(id || '0');
    if (isWishlisted) {
      removeFromWishlist(productId);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        image: product.images[0],
        price: currentVariant.price
      });
      toast.success('Added to wishlist');
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= currentVariant.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        cartItems={cartItems} 
        onAuthClick={() => setShowAuth(true)} 
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images & Video */}
          <div className="space-y-4">
            {/* Main Image/Video Display */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              {showVideo && product.hasVideo && product.video ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster={product.images[selectedImageIndex]}
                >
                  <source src={product.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Video Play Button Overlay */}
              {product.hasVideo && !showVideo && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center group hover:bg-black/30 transition-colors"
                >
                  <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary fill-current" />
                  </div>
                </button>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={handleWishlistToggle}
                  className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
                <button
                  onClick={() => setShowImageZoom(true)}
                  className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                >
                  <ZoomIn className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setShowVideo(false);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index && !showVideo ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              
              {/* Video Thumbnail */}
              {product.hasVideo && (
                <button
                  onClick={() => setShowVideo(true)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors relative ${
                    showVideo ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={product.images[0]} alt="Video thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {product.category}
                </Badge>
              </div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-primary">
              Ksh {currentVariant.price.toLocaleString()}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size & Length Options:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedVariant(index);
                        setQuantity(1);
                      }}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        selectedVariant === index
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{variant.laceSize} - {variant.inchSize}</div>
                          <div className="text-sm text-gray-500">Ksh {variant.price.toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {variant.stock > 0 ? `${variant.stock} in stock` : 'Out of stock'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= currentVariant.stock}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={currentVariant.stock === 0}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-500">On orders over Ksh 5,000</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Quality Guarantee</div>
                  <div className="text-xs text-gray-500">100% human hair</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Easy Returns</div>
                  <div className="text-xs text-gray-500">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {(['details', 'reviews', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-gold text-gold'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'details' ? 'Product Details' : tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'details' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                <ul className="space-y-2">
                  <li><strong>Hair Type:</strong> 100% Virgin Human Hair</li>
                  <li><strong>Texture:</strong> Natural</li>
                  <li><strong>Color:</strong> Can be dyed</li>
                  <li><strong>Care:</strong> Wash with sulfate-free shampoo</li>
                  <li><strong>Lifespan:</strong> 12-18 months with proper care</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <ProductReviews 
                productId={parseInt(id || '0')} 
                rating={product.rating} 
                totalReviews={product.reviews} 
              />
            )}
            
            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shipping & Returns</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Delivery Options</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Standard Delivery: 2-3 business days</li>
                      <li>• Express Delivery: Next day delivery</li>
                      <li>• Free shipping on orders over Ksh 5,000</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• 30-day return window</li>
                      <li>• Free returns for defective items</li>
                      <li>• Original packaging required</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Coupons Section */}
        <div className="mt-12">
          <CouponSystem />
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <ProductRecommendations currentProductId={parseInt(id || '0')} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;