interface PriceRangeFilterProps {
  priceRange: { min: string; max: string };
  onPriceChange: (range: { min: string; max: string }) => void;
  onApply: () => void;
}

export default function PriceRangeFilter({ priceRange, onPriceChange, onApply }: PriceRangeFilterProps) {
  return (
    <div className="glass-morphism border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        💰 Price Range
      </h3>
      <div className="flex items-center gap-3">
        <input
          type="number"
          inputMode="decimal"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-medium focus:border-fuchsia-400 focus:outline-none smooth-transition"
          placeholder="Min ₹"
          value={priceRange.min}
          onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
        />
        <span className="text-gray-400 font-bold">—</span>
        <input
          type="number"
          inputMode="decimal"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-medium focus:border-fuchsia-400 focus:outline-none smooth-transition"
          placeholder="Max ₹"
          value={priceRange.max}
          onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
        />
      </div>
      <button
        type="button"
        className="w-full rounded-xl bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white py-3 text-sm font-bold shadow-lg hover:shadow-xl smooth-transition"
        onClick={onApply}
      >
        Apply Filter
      </button>
    </div>
  );
}
