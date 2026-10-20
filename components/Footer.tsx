import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "../data/products";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Top bar */}
      <div className="border-b border-background/10">
        <div className="container-full py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Link
                href="/"
                className="font-serif text-3xl md:text-4xl tracking-tight text-background"
              >
                Cloud Milk
              </Link>
              <p className="mt-3 text-sm text-background/50 leading-relaxed max-w-xs">
                A premium curator of Korean skincare pricing data. We do the searching, you do the glowing.
              </p>
            </div>

            {/* Newsletter in footer */}
            <div className="max-w-sm w-full">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-background/40 mb-3">
                Stay Connected
              </p>
              <form className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-12 px-4 text-sm bg-background/5 border border-background/15 text-background placeholder:text-background/30 focus:outline-none focus:border-background/40 transition-colors"
                />
                <button
                  type="submit"
                  className="h-12 px-5 text-sm font-medium bg-background text-foreground hover:bg-background/90 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-full py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Collections */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Collections
            </h4>
            <ul className="space-y-3">
              {collections.slice(0, 6).map((collection) => (
                <li key={collection.id}>
                  <Link
                    href={`/products?collection=${collection.slug}`}
                    className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                >
                  All Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                >
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                >
                  Retailer Partners
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="mailto:hello@cloudmilk.com"
                  className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                >
                  hello@cloudmilk.com
                </Link>
              </li>
              <li>
                <p className="text-sm text-background/40 leading-relaxed">
                  Mon–Fri, 9am–6pm KST
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container-full py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Cloud Milk. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-xs text-background/30 hover:text-background/60 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-background/30 hover:text-background/60 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-background/30 hover:text-background/60 transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
