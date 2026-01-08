interface BrandFilterProps {
  brands: string[];
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}

export default function BrandFilter({ brands, selectedBrand, onBrandSelect }: BrandFilterProps) {
  return (
    <div className="glass-morphism border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          ✨ Brands
        </h3>
        {selectedBrand && (
          <button
            type="button"
            className="text-xs text-fuchsia-600 hover:text-fuchsia-700 font-semibold"
            onClick={() => onBrandSelect(null)}
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {brands.map((brand) => {
          const isActive = selectedBrand?.toLowerCase() === brand.toLowerCase();
          return (
            <button
              key={brand}
              type="button"
              className={`text-left rounded-xl border-2 px-4 py-3 text-sm font-medium smooth-transition ${
                isActive
                  ? 'border-fuchsia-500 bg-linear-to-r from-fuchsia-50 to-purple-50 text-fuchsia-700 shadow-md'
                  : 'border-gray-200 hover:border-fuchsia-200 hover:bg-gray-50'
              }`}
              onClick={() => onBrandSelect(brand)}
            >
              {brand}
            </button>
          );
        })}
        {brands.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-4">Brands will appear as products load</p>
        )}
      </div>
    </div>
  );
}
