'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '../components/ProductCard';
import type { Product } from '@/types/product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<'high-to-low' | 'low-to-high' | 'none'>('none');

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setSortedProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceSort = (sortType: 'high-to-low' | 'low-to-high' | 'none') => {
    setSortType(sortType);
    
    const sorted = [...products];
    
    if (sortType === 'high-to-low') {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortType === 'low-to-high') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    
    setSortedProducts(sorted);
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header onPriceSort={handlePriceSort} />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onPriceSort={handlePriceSort} />
      
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