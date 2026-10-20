import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const shipping = subtotal > 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
            <h1 className="font-serif text-4xl mb-4">Your Bag is Empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Discover our curated Korean skincare deals and find products that fit your routine.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
            >
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container-full py-6 border-b border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/products" className="hover:text-foreground transition-colors">
            Deals
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">Your Bag</span>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl mb-12"
          >
            Your Bag
          </motion.h1>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <div className="space-y-0">
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-6 py-8 border-b border-border"
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="w-28 h-32 md:w-36 md:h-44 flex-shrink-0 overflow-hidden bg-muted/30 group"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-serif text-lg md:text-xl hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {item.product.description}
                        </p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <p className="font-serif text-lg">
                            ${item.product.price.toFixed(2)}
                          </p>
                          {item.product.originalPrice && (
                            <p className="text-sm text-muted-foreground/50 line-through">
                              ${item.product.originalPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <QuantitySelector
                          quantity={item.quantity}
                          onQuantityChange={(qty) =>
                            updateQuantity(item.product.id, qty)
                          }
                        />
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 mt-8 text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-secondary p-8 lg:sticky lg:top-28">
                <h2 className="font-serif text-2xl mb-8">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 75 && (
                    <p className="text-xs text-muted-foreground">
                      Free shipping on orders over $75
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-8">
                  <div className="flex justify-between font-serif text-xl">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-none py-6 text-sm tracking-[0.15em] uppercase btn-premium"
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </Link>
                </Button>

                <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/60 mb-1">
                      Shipping
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Worldwide delivery
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/60 mb-1">
                      Authenticity
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Verified retailers only
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
