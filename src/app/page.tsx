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

  const sortedProducts = useMemo(() => applySort(products, sortType), [products, sortType]);

  const storeParam = storeFilter === 'all' ? null : storeFilter;

  const buildUrl = useCallback(
    (nextOffset: number, search: string, store: string | null) => {
      const params = new URLSearchParams();
      params.set('limit', String(PAGE_SIZE));
      params.set('offset', String(nextOffset));
      if (search.trim()) params.set('search', search.trim());
      if (store) params.set('store', store);
      return `/api/products?${params.toString()}`;
    },
    []
  );

  const loadPage = useCallback(
    async (
      nextOffset: number,
      mode: 'replace' | 'append',
      options: { search: string; store: string | null }
    ) => {
      const url = buildUrl(nextOffset, options.search, options.store);
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
        await loadPage(0, 'replace', { search: searchTerm, store: storeParam });
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
        loadPage(offset, 'append', { search: searchTerm, store: storeParam })
          .catch((error) => console.error('Failed to load more products:', error))
          .finally(() => setLoadingMore(false));
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, offset, loadPage, searchTerm, storeParam]);

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
            {sortedProducts.length > 0
              ? `Found ${sortedProducts.length} active deals${sortType !== 'none' ? ` - Sorted by price (${sortType === 'high-to-low' ? 'High to Low' : 'Low to High'})` : ''}`
              : 'Find the best prices across the web.'}
          </p>
        </header>

        {/* Left section – 25% */}
        <div className="w-[25%] p-4">
          Left content (filters, sidebar, etc.)
        </div>

        {/* Right section – 75% */}
        <div className="w-[75%] ml-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" />

        {loadingMore && (
          <div className="text-center py-8 text-gray-500">
            Loading more…
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 border-2 border-dashed rounded-lg">
            <p className="text-xl font-semibold">Database is empty</p>
            <p className="mt-2 text-sm">Run your scraper or use the seeder script to see products here.</p>
          </div>
        )}
      </div>
    </main>
  );
}