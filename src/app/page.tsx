'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '../components/ProductCard';
import type { Product } from '@/types/product';
import type { StoreFilterType } from '@/components/StoreSortButton';

const PAGE_SIZE = 48;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<'high-to-low' | 'low-to-high' | 'none'>('none');
  const [storeFilter, setStoreFilter] = useState<StoreFilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const applySort = (items: Product[], priceSort: 'high-to-low' | 'low-to-high' | 'none') => {
    const next = [...items];

    if (priceSort === 'high-to-low') {
      next.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (priceSort === 'low-to-high') {
      next.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }

    return next;
  };

  const filteredProducts = useMemo(() => {
    const base = selectedBrand
      ? products.filter((p) => {
          const brandGuess = (p.name || '').split(/\s+/)[0];
          return brandGuess.toLowerCase() === selectedBrand.toLowerCase();
        })
      : products;
    return applySort(base, sortType);
  }, [products, sortType, selectedBrand]);

  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      const guess = (p.name || '').split(/\s+/)[0];
      if (guess) set.add(guess);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const storeParam = storeFilter === 'all' ? null : storeFilter;

  const buildUrl = useCallback(
    (
      nextOffset: number,
      search: string,
      store: string | null,
      minPrice: string,
      maxPrice: string
    ) => {
      const params = new URLSearchParams();
      params.set('limit', String(PAGE_SIZE));
      params.set('offset', String(nextOffset));
      if (search.trim()) params.set('search', search.trim());
      if (store) params.set('store', store);
      if (minPrice.trim()) params.set('minPrice', minPrice.trim());
      if (maxPrice.trim()) params.set('maxPrice', maxPrice.trim());
      return `/api/products?${params.toString()}`;
    },
    []
  );

  const loadPage = useCallback(
    async (
      nextOffset: number,
      mode: 'replace' | 'append',
      options: { search: string; store: string | null; minPrice: string; maxPrice: string }
    ) => {
      const url = buildUrl(
        nextOffset,
        options.search,
        options.store,
        options.minPrice,
        options.maxPrice
      );
      const response = await fetch(url);
      const data: Product[] = await response.json();

      if (mode === 'replace') {
        setProducts(data);
      } else {
        setProducts((prev) => {
          const seen = new Set(prev.map((p) => p.id));
          const uniqueNext = data.filter((p) => !seen.has(p.id));
          return [...prev, ...uniqueNext];
        });
      }

      setOffset(nextOffset + data.length);
      setHasMore(data.length === PAGE_SIZE);
    },
    [buildUrl]
  );

  useEffect(() => {
    const fetchFirstPage = async () => {
      try {
        setLoading(true);
        setOffset(0);
        setHasMore(true);
        await loadPage(0, 'replace', {
          search: searchTerm,
          store: storeParam,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
        });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstPage();
  }, [loadPage, searchTerm, storeParam]);

  const handlePriceSort = (sortType: 'high-to-low' | 'low-to-high' | 'none') => {
    setSortType(sortType);
  };

  const handleStoreFilter = (store: StoreFilterType) => {
    setStoreFilter(store);
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (!hasMore || loadingMore || loading) return;

        setLoadingMore(true);
        loadPage(offset, 'append', {
          search: searchTerm,
          store: storeParam,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
        })
          .catch((error) => console.error('Failed to load more products:', error))
          .finally(() => setLoadingMore(false));
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, offset, loadPage, searchTerm, storeParam, priceRange]);

  const applyPriceFilter = () => {
    setOffset(0);
    setHasMore(true);
    loadPage(0, 'replace', {
      search: searchTerm,
      store: storeParam,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    }).catch((error) => console.error('Failed to apply price filter:', error));
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header onPriceSort={handlePriceSort} onStoreFilter={handleStoreFilter} onSearch={handleSearch} />
        <div className="flex items-center justify-center bg-white/60 min-h-screen">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onPriceSort={handlePriceSort} onStoreFilter={handleStoreFilter} onSearch={handleSearch} />

      <div className="max-w-[1400px] mx-auto p-8">
        <header className="mb-8 text-center">
          <p className="text-gray-500">
            {filteredProducts.length > 0
              ? `Found ${filteredProducts.length} active deals${sortType !== 'none' ? ` - Sorted by price (${sortType === 'high-to-low' ? 'High to Low' : 'Low to High'})` : ''}`
              : 'Find the best prices across the web.'}
          </p>
        </header>

        <div className="flex gap-10">
          {/* Left section – 25% */}
          <div className="w-[25%] p-4 border border-gray-200 min-h-screen">
            <div className="p-5 border border-gray-200 space-y-3">
              <p className="font-semibold text-gray-800">Price range</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  inputMode="decimal"
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                />
              </div>
              <button
                type="button"
                className="w-full rounded bg-pink-700 text-white py-2 text-sm hover:bg-pink-900"
                onClick={applyPriceFilter}
              >
                Apply range
              </button>
            </div>

            <div className="mt-6 p-5 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">Brands</p>
                {selectedBrand && (
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedBrand(null)}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
                {brands.map((brand) => {
                  const isActive = selectedBrand?.toLowerCase() === brand.toLowerCase();
                  return (
                    <button
                      key={brand}
                      type="button"
                      className={`text-left rounded border px-3 py-2 text-sm transition ${
                        isActive
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      {brand}
                    </button>
                  );
                })}
                {brands.length === 0 && (
                  <p className="text-xs text-gray-500">Brands will appear as products load.</p>
                )}
              </div>
            </div>
            
          </div>

          {/* Right section – 75% */}
          <div className="w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div ref={sentinelRef} className="h-10" />

        {loadingMore && (
          <div className="text-center py-8 text-gray-500">
            Loading more…
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 border-2 border-dashed rounded-lg">
            <p className="text-xl font-semibold">Database is empty</p>
            <p className="mt-2 text-sm">Run your scraper or use the seeder script to see products here.</p>
          </div>
        )}
      </div>
    </main>
  );
}