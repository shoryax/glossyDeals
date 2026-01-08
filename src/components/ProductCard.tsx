"use client";
import '../app/globals.css';
import Image from "next/image";
import { ExternalLink, Tag } from 'lucide-react';
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative hover-lift">
      {/* Card Container */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden h-full flex flex-col smooth-transition group-hover:border-fuchsia-300 group-hover:shadow-xl">
        {/* Image Container */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 flex items-center justify-center min-h-[200px] sm:min-h-[240px]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain w-full h-full smooth-transition group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* New Badge */}
          <div className="absolute top-3 left-3">
            <span className="glass-morphism px-3 py-1 rounded-full text-xs font-semibold text-fuchsia-700 border border-fuchsia-200">
              New
            </span>
          </div>
          
          {/* Store Badge */}
          {product.store && (
            <div className="absolute top-3 right-3">
              <span className="glass-morphism px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                {product.store}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <p className="text-sm sm:text-base font-medium leading-snug text-gray-900 line-clamp-2 mb-3 flex-1">
            {product.name.replace('FLASH SALE', '').split('INR')[0].trim()}
          </p>

          {/* Price */}
          {product.price && (
            <div className="mb-3">
              <p className="text-xl sm:text-2xl font-bold gradient-text">
                {product.store?.toLowerCase() === "chicor" ? "₩" : "₹"}
                {product.price.toLocaleString(product.store?.toLowerCase() === "chicor" ? "ko-KR" : "en-IN")}
              </p>
            </div>
          )}

          {/* CTA Button */}
          {product.link && (
            <a 
              href={`${product.link}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-fuchsia-700 hover:to-purple-700 smooth-transition group-hover:shadow-lg"
            >
              Get the Deal
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}