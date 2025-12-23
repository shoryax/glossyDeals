"use client";
import '../app/globals.css';
import Image from "next/image";
import { Product } from "@prisma/client";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group">
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

      <div className="mt-8 text-sm text-black">
        <p className="mb-1 text-black">New</p>
        {product.link && (
          <a 
            href={`${product.link}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            get the deal
          </a>
        )}
        

        <p className="font-500 leading-snug border-black text-black line-clamp-2">
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