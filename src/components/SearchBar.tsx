'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

type Props = {
  onSearch?: (term: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(searchTerm.trim());
      }}
      className="w-full max-w-xl"
    >
      <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-2.5 sm:py-3 smooth-transition ${
        isFocused ? 'border-fuchsia-400 shadow-lg' : 'border-gray-200 hover:border-gray-300'
      }`}>
        <Search className={`w-5 h-5 smooth-transition ${
          isFocused ? 'text-fuchsia-600' : 'text-gray-400'
        }`} strokeWidth={2} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for deals..."
          className="w-full bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400 outline-none"
        />
        {searchTerm && (
          <button 
            type="submit" 
            className="px-4 py-1.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-fuchsia-700 hover:to-purple-700 smooth-transition whitespace-nowrap"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
}
