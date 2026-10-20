import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CollectionCard } from "@/components/CollectionCart";
import { collections, getNewProducts, products } from "@/data/products";
import { Button } from "@/components/ui/button";

const Index = () => {
  const newProducts = getNewProducts();
  const trendingProducts = products.filter((p) => p.featured).slice(0, 3);
  const displayedCollections = collections.slice(0, 6);

  const instagramImages = [
    "https://images.unsplash.com/photo-1556228720-195a1e23f0a4?w=400&q=80",
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd0b82?w=400&q=80",
    "https://images.unsplash.com/photo-1598440947619-2c0fc1a64a91?w=400&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=400&q=80",
  ];

  return (
    <Layout>
      {/* Hero Grid Section */}
      <section className="px-6 py-12 lg:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="md:col-span-8 relative group overflow-hidden bg-white"
          >
            <img
              src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1200&q=80"
              alt="Minimalist Korean skincare products in soft morning light"
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute bottom-10 left-10 text-white">
              <h1 className="font-serif text-5xl md:text-7xl mb-4 leading-none">
                The Glow Report
              </h1>
              <p className="font-sans text-sm uppercase tracking-widest">
                Curated skincare deals tracked daily
              </p>
            </div>
          </motion.div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="flex-1 relative overflow-hidden group bg-white"
            >
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80"
                alt="Face cream texture on a neutral surface"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                <span className="font-serif text-3xl italic text-foreground">New Drops</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="flex-1 bg-secondary p-8 flex flex-col justify-end"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Featured Deal
              </p>
              <h2 className="font-serif text-2xl">Up to 45% off COSRX</h2>
              <Link
                href="/products?collection=bestsellers"
                className="font-sans text-[10px] uppercase mt-4 tracking-widest border-b border-foreground w-fit hover:opacity-60 transition-opacity"
              >
                Explore Sale
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="px-6 py-20 lg:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-border pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl">Trending Deals</h2>
            <p className="font-sans text-sm text-muted-foreground mt-2">
              Verified lowest prices across international retailers
            </p>
          </motion.div>
          <Link
            href="/products"
            className="font-sans text-[10px] tracking-widest uppercase underline underline-offset-4 mt-4 md:mt-0 hover:opacity-60 transition-opacity"
          >
            View all deals
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {trendingProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="px-6 lg:px-12 max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Just Arrived
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                New Arrivals
              </h2>
            </motion.div>
            <Link
              href="/products?collection=new-arrivals"
              className="hidden md:flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-14 text-center md:hidden">
            <Button
              asChild
              variant="outline"
              className="rounded-none px-8 py-5 text-sm tracking-[0.15em] uppercase"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-24 md:py-32">
        <div className="px-6 lg:px-12 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Browse By
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Collections
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-7">
              <CollectionCard collection={displayedCollections[0]} index={0} variant="wide" />
            </div>
            <div className="md:col-span-5">
              <CollectionCard collection={displayedCollections[1]} index={1} />
            </div>

            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[2]} index={2} />
            </div>
            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[3]} index={3} />
            </div>
            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[4]} index={4} />
            </div>

            <div className="md:col-span-12">
              <CollectionCard collection={displayedCollections[5]} index={5} variant="wide" />
            </div>
          </div>
        </div>
      </section>

      {/* Curated Edits */}
      <section className="bg-secondary py-24">
        <div className="px-6 lg:px-12 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl italic">Curated Edits</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Glass Skin Edit",
                description: "Hydrating steps for that lit-from-within glow.",
                link: "/products?collection=serums",
              },
              {
                title: "The Barrier Fix",
                description: "Ceramides and repair for sensitive complexions.",
                link: "/products?collection=moisturizers",
              },
              {
                title: "Sun Defense",
                description: "The best Korean SPFs tracked at best prices.",
                link: "/products?collection=sunscreens",
              },
            ].map((edit, i) => (
              <motion.div
                key={edit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="bg-card p-12 text-center group cursor-pointer border border-transparent hover:border-border transition-all duration-500"
              >
                <h3 className="font-serif text-2xl mb-4">{edit.title}</h3>
                <p className="font-sans text-sm text-muted-foreground mb-6 leading-relaxed">
                  {edit.description}
                </p>
                <Link
                  href={edit.link}
                  className="text-[10px] uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
                >
                  Shop Selection
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Philosophy */}
      <section className="px-6 py-32 lg:px-12 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-50 mb-8">
            Our Philosophy
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-snug text-foreground">
            We track prices across{" "}
            <span className="italic">every reputable retailer</span> so you never
            pay premium for your glow. Just clean curation and pure price
            transparency.
          </h2>
        </motion.div>
      </section>

      {/* Follow Us / Instagram */}
      <section className="pb-20">
        <div className="px-6 lg:px-12 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Follow Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              @cloudmilkkbeauty
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Join our community for daily drops, routine tips, and behind-the-scenes deals.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {instagramImages.map((image, index) => (
              <motion.a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden group cursor-pointer bg-card"
              >
                <img
                  src={image}
                  alt="Instagram post"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
