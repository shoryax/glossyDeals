import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import ProductCard from '../components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { scrapedAt: 'desc' }, // Show newest scraped items first
    take: 50,
  });

  return (
    <main className="min-h-screen p-8 bg-white">
      <Header />
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">GLOSSY.deals</h1>
        <p className="text-gray-500 mt-2">
          {products.length > 0 
            ? `Found ${products.length} active deals.` 
            : 'Find the best prices across the web.'}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-500 border-2 border-dashed rounded-lg">
          <p className="text-xl font-semibold">Database is empty</p>
          <p className="mt-2 text-sm">Run your scraper or use the seeder script to see products here.</p>
        </div>
      )}
    </main>
  );
}