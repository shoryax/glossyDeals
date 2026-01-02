'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type StoreFilterType = 'all' | 'YesStyle' | 'Chicor';

type Props = {
  onStoreFilter?: (store: StoreFilterType) => void;
};

export default function StoreSortButton({ onStoreFilter }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreFilterType>('all');

  const buttonLabel = selectedStore === 'all' ? 'Store' : `Store: ${selectedStore}`;

  const handleStoreFilter = (store: StoreFilterType) => {
    setSelectedStore(store);
    onStoreFilter?.(store);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
      >
        {buttonLabel}
        <ChevronDown className="w-4 h-4" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 text-black rounded shadow-lg z-50">
          <button
            onClick={() => handleStoreFilter('all')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              selectedStore === 'all' ? 'bg-gray-50 font-medium' : ''
            }`}
          >
            All stores
          </button>
          <button
            onClick={() => handleStoreFilter('YesStyle')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t border-gray-200 ${
              selectedStore === 'YesStyle' ? 'bg-gray-50 font-medium' : ''
            }`}
          >
            YesStyle
          </button>
          <button
            onClick={() => handleStoreFilter('Chicor')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t border-gray-200 ${
              selectedStore === 'Chicor' ? 'bg-gray-50 font-medium' : ''
            }`}
          >
            Chicor
          </button>
        </div>
      )}
    </div>
  );
}
