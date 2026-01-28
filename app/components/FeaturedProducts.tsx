"use client";

import { useEffect, useState } from "react";
import { products } from "../../src/data/products";
import { motion, Variants } from "framer-motion";
import { useTranslations, useLocale } from 'next-intl';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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

export default function FeaturedProducts() {
  const locale = useLocale();
  const t = useTranslations('Home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [locale]);

  // กรองสินค้าที่มี tag เป็น "star" และแสดงแค่ 3 อันแรก
  const featuredProducts = products.filter(product => product.tag === "star").slice(0, 3);

  return (
    <div className="pb-30 bg-transparent" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && mounted && (
        <section key={locale} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-transparent" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
          {/* Decorative Header */}
          <motion.div
            key={`header-${locale}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative text-center mb-12"
          >
          <motion.span 
            className="inline-block py-2 px-10 rounded-full 
                      bg-white/10 border border-white/20 
                      text-orange-200 text-lg font-semibold tracking-wider 
                      backdrop-blur-md"
            whileHover={{ scale: 1.1 }}
          >
            ★ {t('EXCLUSIVE_COLLECTION')}
          </motion.span>
            
          </motion.div>
          
          <motion.div
            key={`products-${locale}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={`${product.id}-${locale}`}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
        </section>
      )}
    </div>
  );
}
