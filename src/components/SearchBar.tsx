'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

type Props = {
  onSearch?: (term: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(searchTerm.trim());
      }}
      className="w-full max-w-xl"
    >
      <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
        <Search className="w-4 h-4 text-gray-500" strokeWidth={2} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products"
          className="w-full bg-transparent text-sm text-gray-700 outline-none"
        />
        <button type="submit" className="text-sm font-medium text-gray-700">
          Search
        </button>
      </div>
    </form>
  );
}
