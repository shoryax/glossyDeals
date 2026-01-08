'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import PriceRangeFilter from '@/components/PriceRangeFilter';
import BrandFilter from '@/components/BrandFilter';
import MobileFilters from '@/components/MobileFilters';
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-fuchsia-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">Loading amazing deals...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header onPriceSort={handlePriceSort} onStoreFilter={handleStoreFilter} onSearch={handleSearch} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Stats Header */}
        <header className="mb-6 sm:mb-8 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            {filteredProducts.length > 0
              ? `🎉 Found ${filteredProducts.length} active deals${sortType !== 'none' ? ` • Sorted by price (${sortType === 'high-to-low' ? 'High to Low' : 'Low to High'})` : ''}`
              : 'Discover the best skincare deals across the web'}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              <PriceRangeFilter 
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                onApply={applyPriceFilter}
              />

              {/* Brand Filter */}
              <BrandFilter 
                brands={brands}
                selectedBrand={selectedBrand}
                onBrandSelect={setSelectedBrand}
              />
            </div>
          </aside>

          {/* Mobile Filters - Shown only on mobile */}
          <MobileFilters 
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            onApplyPrice={applyPriceFilter}
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandSelect={setSelectedBrand}
          />

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Intersection observer sentinel */}
            <div ref={sentinelRef} className="h-10" />

            {/* Loading more indicator */}
            {loadingMore && (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-fuchsia-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-600 font-medium">Loading more deals...</p>
              </div>
            )}

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 sm:py-20">
                <div className="glass-morphism border-2 border-dashed border-gray-300 rounded-3xl p-8 sm:p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Deals Found</p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Run your scraper or adjust your filters to discover amazing deals!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}