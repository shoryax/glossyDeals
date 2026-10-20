interface MobileFiltersProps {
  priceRange: { min: string; max: string };
  onPriceChange: (range: { min: string; max: string }) => void;
  onApplyPrice: () => void;
  brands: string[];
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}

export default function MobileFilters({
  priceRange,
  onPriceChange,
  onApplyPrice,
  brands,
  selectedBrand,
  onBrandSelect,
}: MobileFiltersProps) {
  return (
    <div className="lg:hidden space-y-4">
      {/* Price Range Filter */}
      <details className="glass-morphism border border-gray-200 rounded-2xl overflow-hidden">
        <summary className="px-4 py-3 font-semibold text-gray-900 cursor-pointer smooth-transition">
          💰 Price Range
        </summary>
        <div className="px-4 pb-4 pt-2 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border-2 border-gray-200 px-3 py-2 text-sm focus:border-fuchsia-400 focus:outline-none"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border-2 border-gray-200 px-3 py-2 text-sm focus:border-fuchsia-400 focus:outline-none"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-linear-to-r from-fuchsia-600 to-purple-600 text-white py-2.5 text-sm font-semibold"
            onClick={onApplyPrice}
          >
            Apply Filter
          </button>
        </div>
      </details>

      {/* Brand Filter */}
      <details className="glass-morphism border border-gray-200 rounded-2xl overflow-hidden">
        <summary className="px-4 py-3 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 smooth-transition flex items-center justify-between">
          <span>✨ Brands</span>
          {selectedBrand && (
            <button
              type="button"
              className="text-xs text-fuchsia-600 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                onBrandSelect(null);
              }}
            >
              Clear
            </button>
          )}
        </summary>
        <div className="px-4 pb-4 pt-2 max-h-60 overflow-y-auto space-y-2">
          {brands.map((brand) => {
            const isActive = selectedBrand?.toLowerCase() === brand.toLowerCase();
            return (
              <button
                key={brand}
                type="button"
                className={`w-full text-left rounded-xl border-2 px-3 py-2 text-sm font-medium smooth-transition ${
                  isActive
                    ? 'border-fuchsia-500 bg-linear-to-r from-fuchsia-50 to-purple-50 text-fuchsia-700'
                    : 'border-gray-200 hover:border-fuchsia-200'
                }`}
                onClick={() => onBrandSelect(brand)}
              >
                {brand}
              </button>
            );
          })}
          {brands.length === 0 && (
            <p className="text-xs text-gray-500 text-center py-2">No brands available</p>
          )}
        </div>
      </details>
    </div>
  );
}
