import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';

// Import existing wig images
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

// Import new wig images
import pixieShortCutBlackWig from '@/assets/pixie-short-cut-black-wig.jpg';
import pixie4006Wig from '@/assets/4006-pixie-short-cut-wig.jpg';
import braidedPixieWig from '@/assets/braided-pixie-short-cut-wig.jpg';
import pixie2026Wig from '@/assets/2026-7018-pixie-wig.jpg';
import curlyT4350Wig from '@/assets/curly-t4-350-4-wig.jpg';
import fringeBobWig from '@/assets/fringe-bob-wig.jpg';
import gradeABobWig from '@/assets/12a-grade-bob-wig.jpg';

// New latest product images
import kinkyStraightHumanHairWig from '@/assets/kinky-straight-human-hair-wig.jpg';
import rawBrazilian4cKinkyCurlyWig from '@/assets/raw-brazilian-4c-kinky-curly-wig.jpg';
import rawBrazilianAfroKinkyCurlyWig from '@/assets/raw-brazilian-afro-kinky-curly-wig.jpg';
import prePluckDeepWaveIndianWig from '@/assets/pre-pluck-deep-wave-indian-wig.jpg';
import deepwaveHumanHairWig from '@/assets/deepwave-human-hair-wig.jpg';
import prePluckedBoneStraightIndianWig from '@/assets/pre-plucked-bone-straight-indian-wig.jpg';
import boneStraightBlonde27Wig from '@/assets/bone-straight-blonde-27-wig.jpg';
import coloredHumanHairBobWig from '@/assets/colored-human-hair-bob-wig.jpg';
import highlightHumanHairBobWig from '@/assets/highlight-human-hair-bob-wig.jpg';
import ginger350DoubleDrawnBobWig from '@/assets/ginger-350-double-drawn-bob-wig.jpg';
import color1bDoubleDrawnBobWig from '@/assets/color-1b-double-drawn-bob-wig.jpg';
import shortPixieCutCurlyWig from '@/assets/short-pixie-cut-curly-wig.jpg';
import highlightPianoP427BodyWaveWig from '@/assets/highlight-piano-p4-27-body-wave-wig.jpg';
import highlightPianoP427BoneStraightWig from '@/assets/highlight-piano-p4-27-bone-straight-wig.jpg';
import highlightDeepWaveP427HoneyBlondeWig from '@/assets/highlight-deep-wave-p4-27-honey-blonde-wig.jpg';
import colorB1CurlyPixieBobWig from '@/assets/color-b1-curly-pixie-bob-wig.jpg';
import curlyColor1bHumanHairWig from '@/assets/curly-color-1b-human-hair-wig.jpg';
import bodywaveColor99jBurgundyWig from '@/assets/bodywave-color-99j-burgundy-wig.jpg';
import bodywaveHighlightP427Wig from '@/assets/bodywave-highlight-p4-27-wig.jpg';
import skunkStripeBodyWaveBrownBlondeWig from '@/assets/skunk-stripe-body-wave-brown-blonde-wig.jpg';
import bodywaveColorMix35027Wig from '@/assets/bodywave-color-mix-350-27-wig.jpg';
import bodywaveColor350GingerWig from '@/assets/bodywave-color-350-ginger-wig.jpg';
import brazilianJerryCurlyBrownColor4Wig from '@/assets/brazilian-jerry-curly-brown-color-4-wig.jpg';
import brownIndianHairBoneStraightWig from '@/assets/brown-indian-hair-bone-straight-wig.jpg';
import brownIndianHairBodyWaveWig from '@/assets/brown-indian-hair-body-wave-wig.jpg';
import virginHairHdBoneStraightWig from '@/assets/virgin-hair-hd-bone-straight-wig.jpg';
import braided350CurlyWig from '@/assets/braided-350-curly-wig.jpg';
import burgundy99jBoneStraightWig from '@/assets/burgundy-99j-bone-straight-wig.jpg';
import brazilian99jJerryCurlyWig from '@/assets/brazilian-99j-jerry-curly-wig.jpg';
import brazilian99jBodywaveWig from '@/assets/brazilian-99j-bodywave-wig.jpg';

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

  // Import products from shared data file
  import { products } from '@/data/products';
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
    },
    // NEW ADDITIONAL PRODUCTS
    {
      id: 13,
      name: "9302 Pixie Short Cut Human Hair",
      description: "Edgy pixie cut with natural black (1B) color. Modern and sophisticated short style.",
      images: [pixieShortCutBlackWig, pixieShortCutBlackWig, pixieShortCutBlackWig],
      variants: [
        { laceSize: "No Lace", inchSize: "6 inches", price: 4540, stock: 8 },
        { laceSize: "No Lace", inchSize: "6 inches (Other Colors)", price: 4747, stock: 6 },
      ],
      rating: 4.7,
      reviews: 145,
      category: "pixie",
      hasVideo: false
    },
    {
      id: 14,
      name: "4006 Pixie Short Cut Human Hair Wig",
      description: "Sleek pixie cut with versatile styling options. Available in multiple colors.",
      images: [pixie4006Wig, pixie4006Wig, pixie4006Wig],
      variants: [
        { laceSize: "No Lace", inchSize: "6 inches", price: 5032, stock: 7 },
        { laceSize: "No Lace", inchSize: "6 inches (Other Colors)", price: 5226, stock: 5 },
      ],
      rating: 4.8,
      reviews: 132,
      category: "pixie",
      hasVideo: false
    },
    {
      id: 15,
      name: "4006+ Braided Pixie Short Cut - 13x4 Lace",
      description: "Unique braided pixie design with 13x4 lace. Available in burgundy, black, ginger, blonde highlights, and brown.",
      images: [braidedPixieWig, braidedPixieWig, braidedPixieWig],
      variants: [
        { laceSize: "13x4 Lace", inchSize: "6 inches", price: 5020, stock: 6 },
        { laceSize: "13x4 Lace", inchSize: "6 inches (Other Colors)", price: 5215, stock: 4 },
      ],
      rating: 4.9,
      reviews: 98,
      category: "pixie",
      hasVideo: false
    },
    {
      id: 16,
      name: "2026 & 7018 Pixie Short Cut Wig",
      description: "Classic pixie cut design with natural texture. Perfect for daily wear.",
      images: [pixie2026Wig, pixie2026Wig, pixie2026Wig],
      variants: [
        { laceSize: "No Lace", inchSize: "6 inches", price: 4345, stock: 9 },
        { laceSize: "No Lace", inchSize: "6 inches (Other Colors)", price: 4540, stock: 7 },
      ],
      rating: 4.6,
      reviews: 156,
      category: "pixie",
      hasVideo: false
    },
    {
      id: 17,
      name: "Curly Human Hair - Color T4-350-4",
      description: "Beautiful curly texture with stunning T4-350-4 color blend. 13x4 lace with 180% density.",
      images: [curlyT4350Wig, curlyT4350Wig, curlyT4350Wig],
      variants: [
        { laceSize: "13x4 Lace", inchSize: "12 inches", price: 7315, stock: 5 },
        { laceSize: "13x4 Lace", inchSize: "14 inches", price: 8009, stock: 4 },
        { laceSize: "13x4 Lace", inchSize: "16 inches", price: 8505, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "18 inches", price: 9297, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "20 inches", price: 11289, stock: 2 },
        { laceSize: "13x4 Lace", inchSize: "22 inches", price: 13373, stock: 2 },
        { laceSize: "13x4 Lace", inchSize: "24 inches", price: 15138, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "26 inches", price: 17222, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "28 inches", price: 19999, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "30 inches", price: 23999, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "32 inches", price: 26999, stock: 1 },
      ],
      rating: 4.9,
      reviews: 234,
      category: "curly",
      hasVideo: true,
      videoLength: "Various lengths"
    },
    {
      id: 18,
      name: "Fringe Bob Human Hair Wig - No Lace",
      description: "Stylish bob with bangs. No lace construction with 180% density. Natural and other colors available.",
      images: [fringeBobWig, fringeBobWig, fringeBobWig],
      variants: [
        { laceSize: "No Lace", inchSize: "10 inches", price: 4338, stock: 8 },
        { laceSize: "No Lace", inchSize: "10 inches (Other Colors)", price: 4932, stock: 6 },
      ],
      rating: 4.7,
      reviews: 187,
      category: "bob",
      hasVideo: false
    },
    {
      id: 19,
      name: "Bob Human Hair Wig - 12A Grade, 13x4 Lace",
      description: "Premium 12A grade bob wig with 13x4 lace. Available in natural and other colors. For 4x4 lace, deduct Ksh 300 from each size.",
      images: [gradeABobWig, gradeABobWig, gradeABobWig],
      variants: [
        { laceSize: "13x4 Lace", inchSize: "10 inches (Natural)", price: 5726, stock: 6 },
        { laceSize: "13x4 Lace", inchSize: "12 inches (Natural)", price: 6400, stock: 5 },
        { laceSize: "13x4 Lace", inchSize: "14 inches (Natural)", price: 7391, stock: 4 },
        { laceSize: "13x4 Lace", inchSize: "16 inches (Natural)", price: 9989, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "10 inches (Other Colors)", price: 6320, stock: 5 },
        { laceSize: "13x4 Lace", inchSize: "12 inches (Other Colors)", price: 6995, stock: 4 },
        { laceSize: "13x4 Lace", inchSize: "14 inches (Other Colors)", price: 7986, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "16 inches (Other Colors)", price: 10583, stock: 2 },
        { laceSize: "4x4 Lace", inchSize: "10 inches (Natural)", price: 5426, stock: 4 },
        { laceSize: "4x4 Lace", inchSize: "12 inches (Natural)", price: 6100, stock: 3 },
        { laceSize: "4x4 Lace", inchSize: "14 inches (Natural)", price: 7091, stock: 2 },
        { laceSize: "4x4 Lace", inchSize: "16 inches (Natural)", price: 9689, stock: 2 },
        { laceSize: "4x4 Lace", inchSize: "10 inches (Other Colors)", price: 6020, stock: 3 },
        { laceSize: "4x4 Lace", inchSize: "12 inches (Other Colors)", price: 6695, stock: 2 },
        { laceSize: "4x4 Lace", inchSize: "14 inches (Other Colors)", price: 7686, stock: 2 },
        { laceSize: "4x4 Lace", inchSize: "16 inches (Other Colors)", price: 10283, stock: 1 },
      ],
      rating: 4.8,
      reviews: 198,
      category: "bob",
      hasVideo: true,
      videoLength: "Multiple lengths"
    },
    // NEWEST PRODUCTS - Complete Collection
    {
      id: 20,
      name: "Kinky Straight Human Hair - 13x4 Lace, 180% Density",
      description: "Natural color (1B) kinky straight texture. Premium human hair with 13x4 lace construction.",
      images: [kinkyStraightHumanHairWig, kinkyStraightHumanHairWig, kinkyStraightHumanHairWig],
      variants: [
        { laceSize: "13x4 Lace", inchSize: "10 inches", price: 5788, stock: 5 },
        { laceSize: "13x4 Lace", inchSize: "12 inches", price: 6183, stock: 4 },
        { laceSize: "13x4 Lace", inchSize: "14 inches", price: 6878, stock: 4 },
        { laceSize: "13x4 Lace", inchSize: "16 inches", price: 7374, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "18 inches", price: 8167, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "20 inches", price: 9158, stock: 2 },
        { laceSize: "13x4 Lace", inchSize: "22 inches", price: 11241, stock: 2 },
        { laceSize: "13x4 Lace", inchSize: "24 inches", price: 13005, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "26 inches", price: 15087, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "28 inches", price: 18360, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "30 inches", price: 22325, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "32 inches", price: 25498, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "34 inches", price: 29860, stock: 1 }
      ],
      rating: 4.8,
      reviews: 156,
      category: "straight",
      hasVideo: true
    },
    {
      id: 21,
      name: "Raw Brazilian Hair 13x4 Glueless Front 4C Edges Afro Kinky Curly",
      description: "Natural color (1B) with 4C edges and afro kinky curly texture. Glueless design for comfort.",
      images: [rawBrazilian4cKinkyCurlyWig, rawBrazilian4cKinkyCurlyWig, rawBrazilian4cKinkyCurlyWig],
      variants: [
        { laceSize: "13x4 Glueless", inchSize: "10 inches", price: 6680, stock: 4 },
        { laceSize: "13x4 Glueless", inchSize: "12 inches", price: 6978, stock: 4 },
        { laceSize: "13x4 Glueless", inchSize: "14 inches", price: 7771, stock: 3 },
        { laceSize: "13x4 Glueless", inchSize: "16 inches", price: 8267, stock: 3 },
        { laceSize: "13x4 Glueless", inchSize: "18 inches", price: 8960, stock: 2 },
        { laceSize: "13x4 Glueless", inchSize: "20 inches", price: 9951, stock: 2 },
        { laceSize: "13x4 Glueless", inchSize: "22 inches", price: 12134, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "24 inches", price: 13899, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "26 inches", price: 15981, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "28 inches", price: 19253, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "30 inches", price: 23219, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "32 inches", price: 26391, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "34 inches", price: 30753, stock: 1 }
      ],
      rating: 4.9,
      reviews: 189,
      category: "curly",
      hasVideo: true
    },
    {
      id: 22,
      name: "Raw Brazilian Hair 13x4 Glueless Afro Kinky Curly",
      description: "Natural color (1B) with afro kinky curly texture. Raw Brazilian hair quality.",
      images: [rawBrazilianAfroKinkyCurlyWig, rawBrazilianAfroKinkyCurlyWig, rawBrazilianAfroKinkyCurlyWig],
      variants: [
        { laceSize: "13x4 Glueless", inchSize: "10 inches", price: 6580, stock: 4 },
        { laceSize: "13x4 Glueless", inchSize: "12 inches", price: 6978, stock: 4 },
        { laceSize: "13x4 Glueless", inchSize: "14 inches", price: 7671, stock: 3 },
        { laceSize: "13x4 Glueless", inchSize: "16 inches", price: 8167, stock: 3 },
        { laceSize: "13x4 Glueless", inchSize: "18 inches", price: 8960, stock: 2 },
        { laceSize: "13x4 Glueless", inchSize: "20 inches", price: 9951, stock: 2 },
        { laceSize: "13x4 Glueless", inchSize: "22 inches", price: 12034, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "24 inches", price: 13799, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "26 inches", price: 15881, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "28 inches", price: 19153, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "30 inches", price: 23119, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "32 inches", price: 26291, stock: 1 },
        { laceSize: "13x4 Glueless", inchSize: "34 inches", price: 30653, stock: 1 }
      ],
      rating: 4.8,
      reviews: 167,
      category: "curly",
      hasVideo: true
    },
    {
      id: 23,
      name: "Pre Pluck Deep Wave Raw Indian Human Hair Glueless Transparent 13x4 Frontal",
      description: "Natural color (1B) with deep wave texture. Pre-plucked and transparent lace for natural look.",
      images: [prePluckDeepWaveIndianWig, prePluckDeepWaveIndianWig, prePluckDeepWaveIndianWig],
      variants: [
        { laceSize: "13x4 Transparent", inchSize: "10 inches", price: 5528, stock: 5 },
        { laceSize: "13x4 Transparent", inchSize: "12 inches", price: 5924, stock: 4 },
        { laceSize: "13x4 Transparent", inchSize: "14 inches", price: 6618, stock: 4 },
        { laceSize: "13x4 Transparent", inchSize: "16 inches", price: 7114, stock: 3 },
        { laceSize: "13x4 Transparent", inchSize: "18 inches", price: 7907, stock: 3 },
        { laceSize: "13x4 Transparent", inchSize: "20 inches", price: 8898, stock: 2 },
        { laceSize: "13x4 Transparent", inchSize: "22 inches", price: 10981, stock: 2 },
        { laceSize: "13x4 Transparent", inchSize: "24 inches", price: 12745, stock: 1 },
        { laceSize: "13x4 Transparent", inchSize: "26 inches", price: 14827, stock: 1 },
        { laceSize: "13x4 Transparent", inchSize: "28 inches", price: 18100, stock: 1 },
        { laceSize: "13x4 Transparent", inchSize: "30 inches", price: 22065, stock: 1 },
        { laceSize: "13x4 Transparent", inchSize: "32 inches", price: 25238, stock: 1 },
        { laceSize: "13x4 Transparent", inchSize: "34 inches", price: 29600, stock: 1 }
      ],
      rating: 4.9,
      reviews: 143,
      category: "wave",
      hasVideo: true
    },
    {
      id: 24,
      name: "Deep Wave Human Hair Wig - 13x4 Lace",
      description: "Natural color (1B) with beautiful deep wave texture. Premium construction and styling.",
      images: [deepwaveHumanHairWig, deepwaveHumanHairWig, deepwaveHumanHairWig],
      variants: [
        { laceSize: "13x4 Lace", inchSize: "10 inches", price: 6320, stock: 5 },
        { laceSize: "13x4 Lace", inchSize: "12 inches", price: 6718, stock: 4 },
        { laceSize: "13x4 Lace", inchSize: "14 inches", price: 7411, stock: 4 },
        { laceSize: "13x4 Lace", inchSize: "16 inches", price: 7907, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "18 inches", price: 8700, stock: 3 },
        { laceSize: "13x4 Lace", inchSize: "20 inches", price: 9691, stock: 2 },
        { laceSize: "13x4 Lace", inchSize: "22 inches", price: 11774, stock: 2 },
        { laceSize: "13x4 Lace", inchSize: "24 inches", price: 13539, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "26 inches", price: 15621, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "28 inches", price: 18893, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "30 inches", price: 22859, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "32 inches", price: 26031, stock: 1 },
        { laceSize: "13x4 Lace", inchSize: "34 inches", price: 30393, stock: 1 }
      ],
      rating: 4.8,
      reviews: 178,
      category: "wave",
      hasVideo: true
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
                { key: 'glueless', label: 'Glueless' },
                { key: 'pixie', label: 'Pixie' },
                { key: 'curly', label: 'Curly' },
                { key: 'bob', label: 'Bob' }
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