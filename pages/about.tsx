import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[80vh] md:h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1920&q=80"
            alt="Curated skincare collection"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-foreground/50" />
        </motion.div>

        <div className="relative container-full h-full flex flex-col justify-end pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/60 mb-5">
              Our Story
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[0.9]">
              Curating Glow
              <br />
              <span className="italic font-normal">for Less</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              We track prices across the global K-beauty market so you never pay full retail for your routine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 md:py-40">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.25] tracking-tight">
              We believe everyone deserves access to{" "}
              <span className="italic">effective, beautiful skincare</span> without the markup. Clean curation, transparent pricing, and real deals.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Story — Large Image + Text */}
      <section className="pb-20 md:pb-32">
        <div className="container-full">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 md:mb-36">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                The Beginning
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                A Personal Quest
                <br />
                <span className="italic">for Better Prices</span>
              </h3>
              <p className="text-muted-foreground leading-[1.8] mb-5">
                Cloud Milk began as a simple frustration: watching the same K-beauty products fluctuate wildly in price across retailers. What started as a personal spreadsheet grew into a real-time aggregator that scans global stores every few minutes.
              </p>
              <p className="text-muted-foreground leading-[1.8]">
                Today, we help thousands of shoppers find verified lowest prices on the products they already love—no coupons, no tricks, just data.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="md:col-span-7 relative"
            >
              <div className="aspect-[4/5] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80"
                  alt="Skincare routine flatlay"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          {/* Full-width banner image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-24 md:mb-36"
          >
            <div className="relative h-[50vh] md:h-[70vh] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1920&q=80"
                alt="Minimal skincare shelf"
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-serif text-3xl md:text-5xl lg:text-6xl text-white text-center max-w-3xl px-6 leading-tight"
                >
                  "The best routine is the one
                  <br />
                  <span className="italic">you can sustain</span>
                  <br />
                  without overpaying"
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Second story block — reversed */}
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="md:col-span-7 md:order-first"
            >
              <div className="aspect-[4/5] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1598440947619-2c0fc1a64a91?w=1200&q=80"
                  alt="Skincare application"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="md:col-span-5"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                Our Approach
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                From Retailer
                <br />
                <span className="italic">to Routine</span>
              </h3>
              <p className="text-muted-foreground leading-[1.8] mb-5">
                We monitor prices across Olive Young, YesStyle, StyleKorean, Jolse, and other trusted retailers. When a product hits its lowest tracked price, we surface it immediately.
              </p>
              <p className="text-muted-foreground leading-[1.8]">
                No fake discounts. No inflated original prices. Just a clean comparison of where to buy right now, updated continuously.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-36 bg-secondary">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3">
              What Guides Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-12 lg:gap-20">
            {[
              {
                title: "Transparency",
                number: "01",
                description:
                  "We show real retailer prices, original MSRP, and discount percentages. No hidden fees, no inflated comparisons—just honest data.",
              },
              {
                title: "Curation",
                number: "02",
                description:
                  "Every product we track is chosen for its reputation, ingredients, and value. We focus on the K-beauty staples worth your money.",
              },
              {
                title: "Accessibility",
                number: "03",
                description:
                  "Great skincare shouldn't require endless deal-hunting. We do the work so you can build a routine that fits your budget.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="text-center"
              >
                <span className="text-[11px] font-semibold tracking-[0.3em] text-muted-foreground/50 mb-4 block">
                  {value.number}
                </span>
                <h3 className="font-serif text-2xl text-foreground mb-5">
                  {value.title}
                </h3>
                <div className="w-8 h-px bg-foreground/30 mx-auto mb-5" />
                <p className="text-muted-foreground leading-[1.8]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-image strip */}
      <section className="py-4 md:py-6">
        <div className="grid grid-cols-3 gap-2 md:gap-4 h-[35vh] md:h-[50vh]">
          {[
            {
              src: "https://images.unsplash.com/photo-1556228720-195a1e23f0a4?w=800&q=80",
              alt: "Cleanser bottle",
            },
            {
              src: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
              alt: "Toner layering",
            },
            {
              src: "https://images.unsplash.com/photo-1596755389378-c31d21fd0b82?w=800&q=80",
              alt: "Sunscreen application",
            },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="overflow-hidden group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>

        <div className="relative container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/50 mb-5">
              Start Saving
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Find Your Next Holy Grail
            </h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
              Browse live deals across the best Korean skincare retailers, all in one place.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-none px-12 py-6 text-sm tracking-[0.15em] uppercase bg-white text-foreground hover:bg-white/90"
            >
              <Link href="/products">
                Browse Deals
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
