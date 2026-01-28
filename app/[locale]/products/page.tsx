"use client";
import { motion, Variants } from "framer-motion";
import { products } from "@/src/data/products";
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Home() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [locale]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,   // เรียงทีละใบ
      },
    },
  };  
  
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };  

  if (!mounted) return null;

  return (
      <div className="min-h-screen">

      {/* Products Grid */}
      <main key={locale} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          key={`products-grid-${locale}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={`${product.id}-${locale}`}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Product Image Only */}
              <div className="relative h-64 w-full overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={locale === "en" ? product.name : product.nameCN}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
