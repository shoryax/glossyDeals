'use client';

import { useState } from 'react';
import { ChevronDown, Store } from 'lucide-react';

export type StoreFilterType = 'all' | 'YesStyle' | 'Chicor';

type Props = {
  onStoreFilter?: (store: StoreFilterType) => void;
};

export default function StoreSortButton({ onStoreFilter }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreFilterType>('all');

  const buttonLabel = selectedStore === 'all' ? 'Store' : selectedStore;

  const handleStoreFilter = (store: StoreFilterType) => {
    setSelectedStore(store);
    onStoreFilter?.(store);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full lg:w-auto">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-2 px-4 py-2 sm:py-3 lg:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-fuchsia-300 hover:shadow-md smooth-transition"
      >
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-gray-600" />
          <span>{buttonLabel}</span>
        </div>
        <ChevronDown className={`w-4 h-4 smooth-transition ${
          showDropdown ? 'rotate-180' : ''
        }`} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 lg:right-auto left-0 mt-2 w-full lg:w-56 glass-morphism border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-up">
          <button
            onClick={() => handleStoreFilter('all')}
            className={`w-full text-left px-4 py-3 text-sm smooth-transition ${
              selectedStore === 'all' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
            }`}
          >
            All Stores
          </button>
          <button
            onClick={() => handleStoreFilter('YesStyle')}
            className={`w-full text-left px-4 py-3 text-sm smooth-transition border-t border-gray-100 ${
              selectedStore === 'YesStyle' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
            }`}
          >
            YesStyle
          </button>
          <button
            onClick={() => handleStoreFilter('Chicor')}
            className={`w-full text-left px-4 py-3 text-sm smooth-transition border-t border-gray-100 ${
              selectedStore === 'Chicor' ? 'bg-fuchsia-50 font-semibold text-fuchsia-700' : 'hover:bg-gray-50'
            }`}
          >
            Chicor
          </button>
        </div>
      )}
    </div>
  );
}
