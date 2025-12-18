"use client";

import Image from "next/image";
import { Product } from "@prisma/client";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group">
      
      {/* Wishlist icon */}
      <div className="flex justify-center mb-6 text-sm text-black">
        ♡
      </div>

      {/* Image */}
      <div className="flex justify-center">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={180}
            height={180}
            className="object-contain"
          />
        ) : (
          <div className="w-[180px] h-[180px] bg-gray-100" />
        )}
      </div>

      {/* Info */}
      <div className="mt-8 text-sm text-black font-satoshi">
        <p className="mb-1 text-black">New</p>

        <p className="font-500 leading-snug text-black">
          {product.name.replace('FLASH SALE', '').split('INR')[0].trim()}
        </p>

        {product.price && (
          <p className="mt-1 text-black font-500">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        )}
      </div>
    </div>
  );
}