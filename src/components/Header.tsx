import React from 'react';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';

export default function Header() {
  const navItems = ['LADIES', 'MEN', 'KIDS', 'HOME', 'BEAUTY'];
  
  return (
    <header className="border-b border-gray-200">
      {/* Top promo bar */}
      <div className="bg-[#e4e4e4] text-center py-2 text-xs tracking-wide">
        <span className="text-red-600 font-medium">10% OFF YOUR FIRST ORDER! </span>
        <span className="underline cursor-pointer">NEW MEMBER EXCLUSIVE</span>
      </div>
      
      {/* Main header */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 font-bold text-3xl tracking-tight">H&M</h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-sm tracking-wide hover:underline ${
                  index === 1 ? 'underline font-medium' : ''
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="hover:opacity-70 transition-opacity">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}