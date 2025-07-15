import React from 'react';
import { ShoppingBag, Search, Phone, User, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  user: any;
  cartItems: any[];
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, cartItems, onAuthClick }) => {
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out.",
      });
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-elegant sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gold text-ts-black py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>🇰🇪 Free Delivery in Nairobi County | Express Delivery Available</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+254 768 174 878</span>
            </div>
            <span>|</span>
            <span>Customer Service 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gold w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-ts-black font-bold text-xl">TS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-poppins">Timeless Strands</h1>
              <p className="text-xs opacity-90">Premium Wigs Kenya</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for wigs, colors, sizes..."
                className="w-full pl-4 pr-12 py-2 rounded-full border-2 border-gold focus:border-gold-light text-ts-black"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-dark rounded-full p-1.5 transition-colors">
                <Search className="w-4 h-4 text-ts-black" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('products')}
              className="hover:text-gold transition-colors"
            >
              Wigs
            </button>
            <button 
              onClick={() => scrollToSection('checkout')}
              className="hover:text-gold transition-colors"
            >
              Checkout
            </button>
            <button 
              onClick={() => scrollToSection('track-order')}
              className="hover:text-gold transition-colors"
            >
              Track Order
            </button>
            <button 
              onClick={() => scrollToSection('checkout')}
              className="bg-gold hover:bg-gold-dark text-ts-black px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center space-x-1"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({cartItems.length})</span>
            </button>
            
            {/* Auth Button */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm">Hi, {user.user_metadata?.display_name || user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gold hover:text-gold-dark transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-1 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-ts-black px-4 py-2 rounded-full font-semibold transition-all"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for wigs..."
              className="w-full pl-4 pr-12 py-2 rounded-full border-2 border-gold focus:border-gold-light text-ts-black"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-dark rounded-full p-1.5 transition-colors">
              <Search className="w-4 h-4 text-ts-black" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;