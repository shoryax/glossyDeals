'use client';

import React, { useState } from 'react';
import { Search, Heart, ChevronDown } from 'lucide-react';
import '@/components/product.css';

interface HeaderProps {
  onPriceSort?: (sortType: 'high-to-low' | 'low-to-high' | 'none') => void;
}

export default function Header({ onPriceSort }: HeaderProps) {
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState<'high-to-low' | 'low-to-high' | 'none'>('none');
  
  const handlePriceSort = (sortType: 'high-to-low' | 'low-to-high' | 'none') => {
    setSelectedSort(sortType);
    onPriceSort?.(sortType);
    setShowPriceDropdown(false);
  };
  
  return (
    <header className="border-b border-gray-200">
      {/* Top promo bar */}
      <div className="bg-[#e4e4e4] text-center py-2 text-xs tracking-wide">
        <span className="haha text-red-600 font-medium">GET THE BEST DEALS ON SKINCARE!!!</span>
      </div>
      
      {/* Main header */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-gray-500 font-bold text-3xl tracking-light">Glossy Deals</h1>
        
        </div>
        
        {/* Icons and Filter */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <button
              onClick={() => setShowPriceDropdown(!showPriceDropdown)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Price
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showPriceDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 text-black rounded shadow-lg z-50">
                <button
                  onClick={() => handlePriceSort('none')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    selectedSort === 'none' ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  No Sort
                </button>
                <button
                  onClick={() => handlePriceSort('high-to-low')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t border-gray-200 ${
                    selectedSort === 'high-to-low' ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => handlePriceSort('low-to-high')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t border-gray-200 ${
                    selectedSort === 'low-to-high' ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  Price: Low to High
                </button>
              </div>
            )}
          </div>
          
          <button className="hover:opacity-100 transition-opacity text-gray-500">
            <Search className="w-5 h-5" strokeWidth={2} />
          </button>

          <button className="hover:opacity-100 transition-opacity text-gray-500">
            <Heart className="w-5 h-5" strokeWidth={2} />
          </button>

        </div>
      </div>
    </header>
  );
}