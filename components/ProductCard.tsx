import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useWishlist } from "@/hooks/useWishList";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "large";
}

export const ProductCard = ({ product, index = 0, variant = "default" }: ProductCardProps) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const hasSecondImage = product.images.length > 1;
  const isIndianRupeeProduct =
    product.retailer === "YesStyle" || product.retailer === "Chicor";
  const formatPrice = (price: number) =>
    new Intl.NumberFormat(isIndianRupeeProduct ? "en-IN" : "en-US", {
      style: "currency",
      currency: isIndianRupeeProduct ? "INR" : "USD",
      maximumFractionDigits: 2,
    }).format(price);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden bg-card mb-5",
            variant === "large" ? "aspect-3/4" : "aspect-4/5"
          )}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "w-full h-full object-cover transition-all duration-1000 ease-out",
              hasSecondImage
                ? "group-hover:opacity-0 group-hover:scale-105"
                : "group-hover:scale-105"
            )}
          />

          {hasSecondImage && (
            <Image
              src={product.images[1]}
              alt={`${product.name} - alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-1000 ease-out group-hover:opacity-100 group-hover:scale-100"
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-foreground/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "absolute top-5 right-5 p-2.5 rounded-full transition-all duration-500",
              "bg-background/90 backdrop-blur-md hover:bg-background shadow-sm",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
              inWishlist && "opacity-100 translate-y-0"
            )}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-all duration-300",
                inWishlist ? "fill-primary text-primary scale-110" : "text-foreground"
              )}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-5 left-5 flex flex-col gap-2">
            {product.discount && product.discount > 0 && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-background/90 backdrop-blur-md text-foreground"
              >
                -{product.discount}%
              </motion.span>
            )}
            {product.new && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-foreground text-background"
              >
                New
              </motion.span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {product.brand && (
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground">
              {product.brand}
            </p>
          )}

          <h3 className="font-serif text-xl text-foreground transition-colors duration-300 group-hover:text-primary leading-snug">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-1 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-baseline gap-3 pt-1">
            <p className="text-base font-medium text-foreground tracking-wide">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground/50 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          {product.retailer && (
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 pt-1">
              Found at: {product.retailer}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
};
