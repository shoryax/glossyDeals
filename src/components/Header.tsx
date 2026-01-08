'use client';

import { useState, useEffect } from 'react';
import { Heart, ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import '@/components/product.css';
import SearchBar from '@/components/SearchBar';
import StoreSortButton, { type StoreFilterType } from '@/components/StoreSortButton';

interface HeaderProps {
  onPriceSort?: (sortType: 'high-to-low' | 'low-to-high' | 'none') => void;
  onStoreFilter?: (store: StoreFilterType) => void;
  onSearch?: (term: string) => void;
}

export default function Header({ onPriceSort, onStoreFilter, onSearch }: HeaderProps) {
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState<'high-to-low' | 'low-to-high' | 'none'>('none');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handlePriceSort = (sortType: 'high-to-low' | 'low-to-high' | 'none') => {
    setSelectedSort(sortType);
    onPriceSort?.(sortType);
    setShowPriceDropdown(false);
  };
  
  return (
    <header className={`sticky top-0 z-50 smooth-transition ${
      scrolled ? 'glass-morphism shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Top promo bar */}
      <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 text-center py-2.5 px-4 overflow-hidden">
        <div className="flex items-center justify-center gap-2 animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 hidden sm:block" />
          <span className="text-white font-semibold text-xs sm:text-sm tracking-wide">
            GET THE BEST DEALS ON SKINCARE - LIMITED TIME OFFERS!
          </span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 hidden sm:block" />
        </div>
      </div>
      
      {/* Main header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <h1 className="gradient-text font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              Glossy Deals
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <SearchBar onSearch={onSearch} />
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-fuchsia-300 hover:shadow-md smooth-transition"
                >
                  Price
                  <ChevronDown className={`w-4 h-4 smooth-transition ${
                    showPriceDropdown ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {showPriceDropdown && (
                  <div className="absolute right-0 mt-2 w-56 glass-morphism border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-up">
                    <button
                      onClick={() => handlePriceSort('none')}
                      className={`w-full text-left px-4 py-3 text-sm smooth-transition ${
                        selectedSort === 'none' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      No Sort
                    </button>
                    <button
                      onClick={() => handlePriceSort('high-to-low')}
                      className={`w-full text-left px-4 py-3 text-sm smooth-transition border-t border-gray-100 ${
                        selectedSort === 'high-to-low' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => handlePriceSort('low-to-high')}
                      className={`w-full text-left px-4 py-3 text-sm smooth-transition border-t border-gray-100 ${
                        selectedSort === 'low-to-high' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      Price: Low to High
                    </button>
                  </div>
                )}
              </div>

              <StoreSortButton onStoreFilter={onStoreFilter} />

              <button className="p-2 hover:bg-fuchsia-50 rounded-full smooth-transition group">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-fuchsia-600 group-hover:fill-fuchsia-100 smooth-transition" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg smooth-transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 animate-fade-in-up border-t border-gray-200 pt-4">
            <SearchBar onSearch={onSearch} />
            
            <div className="flex flex-col gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-fuchsia-300 smooth-transition"
                >
                  <span>Price Sort</span>
                  <ChevronDown className={`w-4 h-4 smooth-transition ${
                    showPriceDropdown ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {showPriceDropdown && (
                  <div className="mt-2 glass-morphism border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => handlePriceSort('none')}
                      className={`w-full text-left px-4 py-3 text-sm smooth-transition ${
                        selectedSort === 'none' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      No Sort
                    </button>
                    <button
                      onClick={() => handlePriceSort('high-to-low')}
                      className={`w-full text-left px-4 py-3 text-sm smooth-transition border-t border-gray-100 ${
                        selectedSort === 'high-to-low' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => handlePriceSort('low-to-high')}
                      className={`w-full text-left px-4 py-3 text-sm smooth-transition border-t border-gray-100 ${
                        selectedSort === 'low-to-high' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      Price: Low to High
                    </button>
                  </div>
                )}
              </div>

              <StoreSortButton onStoreFilter={onStoreFilter} />

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-fuchsia-300 smooth-transition">
                <Heart className="w-5 h-5 text-gray-600" strokeWidth={2} />
                <span className="text-sm font-medium text-gray-700">Favorites</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}