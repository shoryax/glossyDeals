'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '../components/ProductCard';
import type { Product } from '@/types/product';

const PAGE_SIZE = 48;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<'high-to-low' | 'low-to-high' | 'none'>('none');
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const applySort = (items: Product[], sort: 'high-to-low' | 'low-to-high' | 'none') => {
    const next = [...items];
    if (sort === 'high-to-low') {
      next.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === 'low-to-high') {
      next.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    return next;
  };

  const sortedProducts = useMemo(() => applySort(products, sortType), [products, sortType]);

  const buildUrl = useCallback(
    (nextOffset: number) => {
      const params = new URLSearchParams();
      params.set('limit', String(PAGE_SIZE));
      params.set('offset', String(nextOffset));
      if (searchTerm.trim()) params.set('search', searchTerm.trim());
      return `/api/products?${params.toString()}`;
    },
    [searchTerm]
  );

  const loadPage = useCallback(
    async (nextOffset: number, mode: 'replace' | 'append') => {
      const url = buildUrl(nextOffset);
      const response = await fetch(url);
      const data: Product[] = await response.json();

      if (mode === 'replace') {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
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
        await loadPage(0, 'replace');
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstPage();
  }, [loadPage]);

  const handlePriceSort = (sortType: 'high-to-low' | 'low-to-high' | 'none') => {
    setSortType(sortType);
  };

  const handleSearch = async (term: string) => {
    try {
      setSearchTerm(term);
      setOffset(0);
      setHasMore(true);
      setLoading(true);
      await loadPage(0, 'replace');
    } catch (error) {
      console.error('Failed to search products:', error);
    } finally {
      setLoading(false);
    }
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
        loadPage(offset, 'append')
          .catch((error) => console.error('Failed to load more products:', error))
          .finally(() => setLoadingMore(false));
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, offset, loadPage]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header onPriceSort={handlePriceSort} onSearch={handleSearch} />
        <div className="flex items-center justify-center bg-white/60 min-h-screen">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onPriceSort={handlePriceSort} onSearch={handleSearch} />
      
      <div className="max-w-[1400px] mx-auto p-8">
        <header className="mb-8 text-center">
          <p className="text-gray-500">
            {sortedProducts.length > 0 
              ? `Found ${sortedProducts.length} active deals${sortType !== 'none' ? ` - Sorted by price (${sortType === 'high-to-low' ? 'High to Low' : 'Low to High'})` : ''}` 
              : 'Find the best prices across the web.'}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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