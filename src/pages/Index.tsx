import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import ProductListing from '@/components/ProductListing';
import CheckoutForm from '@/components/CheckoutForm';
import OrderConfirmation from '@/components/OrderConfirmation';
import TrackOrder from '@/components/TrackOrder';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  name: string;
  image: string;
  laceSize: string;
  inchSize: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderData, setOrderData] = useState<any>(null);

  const handleUpdateCart = (items: CartItem[]) => {
    setCartItems(items);
  };

  const handleOrderSubmit = (data: any) => {
    setOrderData(data);
    // In a real app, this would be sent to a backend
    console.log('Order submitted:', data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ADMIN SECTION: All website sections - edit content directly in each component */}
      
      {/* 1. Header: Logo and navigation */}
      <Header />
      
      {/* 2. Hero Banner: Big bold call-to-action */}
      <HeroBanner />
      
      {/* 3. Product Listing: Grid layout with product cards */}
      <ProductListing onUpdateCart={handleUpdateCart} />
      
      {/* 4. Checkout Form: Customer details and payment */}
      <CheckoutForm cartItems={cartItems} onOrderSubmit={handleOrderSubmit} />
      
      {/* 5. Confirmation Section: Order confirmation */}
      <OrderConfirmation orderData={orderData} />
      
      {/* 6. Track Order Section: Order tracking */}
      <TrackOrder />
      
      {/* 7. Footer: Contact info and links */}
      <Footer />
    </div>
  );
};

export default Index;
