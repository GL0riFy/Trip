"use client";

import { useEffect, useState } from "react";
import { products } from "../../src/data/products";
import { motion, Variants } from "framer-motion";
import { useTranslations, useLocale } from 'next-intl';

// Animation สำหรับการปรากฏของ Container หลัก
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation สำหรับการปรากฏของ Card แต่ละใบ
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// New! Animation สำหรับทำให้ภาพสั่น/ลอยเล็กน้อยตลอดเวลา
const jiggleVariants: Variants = {
  shaking: (i) => ({
    x: [0, -1, 1, -0.5, 0.5, 0], // ขยับซ้ายขวานิดเดียว
    rotate: [0, -0.3, 0.3, -0.1, 0.1, 0], // หมุนนิดเดียว
    transition: {
      delay: i * 0.3, // เริ่มต้นไม่พร้อมกัน
      duration: 5 + Math.random(), // ระยะเวลานานเพื่อให้ดูนุ่มนวล (สุ่มนิดหน่อย)
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }),
};

export default function FeaturedProducts() {
  const locale = useLocale();
  const t = useTranslations('Home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [locale]);

  const featuredProducts = products.filter(product => product.tag === "star").slice(0, 3);

  return (
    <div className="pb-30 bg-transparent">
      {featuredProducts.length > 0 && mounted && (
        // เพิ่ม padding-y ให้มากขึ้น (py-24) เพื่อรองรับการขยับขึ้นของรูปตรงกลาง
        <section key={locale} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-transparent">
          {/* Decorative Header */}
          <motion.div
            key={`header-${locale}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative text-center mb-16" // เพิ่ม margin-bottom
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center"
          >
            {featuredProducts.map((product, index) => {
              // เช็คว่าเป็นตัวตรงกลางหรือไม่ (index ที่ 1)
              const isCenter = index === 1;

              return (
                <motion.div
                  key={`${product.id}-${locale}`}
                  variants={cardVariants}
                  // Requirement 2: ถ้าเป็นตัวกลาง ให้ขยับขึ้นบนจอใหญ่ (lg:-translate-y-12) และอยู่ชั้นบนสุด (z-10)
                  className={`relative ${isCenter ? 'lg:-translate-y-12 z-10' : 'z-0'}`}
                >
                  {/* Container ของรูปภาพ: ปรับให้ใหญ่ขึ้นและใส่ Animation สั่น */}
                  <motion.div
                    variants={jiggleVariants}
                    animate="shaking"
                    custom={index} // ส่ง index ไปให้ variant เพื่อทำ delay
                    // Requirement 1: เปลี่ยน h-64 เป็น aspect-[3/4] เพื่อให้รูปใหญ่และเป็นแนวตั้ง
                    // เพิ่ม rounded-2xl และ shadow เพื่อความสวยงาม
                    className="relative w-full aspect-3/4"
                  >
                    <motion.img
                      src={product.image}
                      alt={locale === "en" ? product.name : product.nameCN}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }} // เพิ่ม scale ตอน hover ให้ชัดขึ้นอีกนิด
                      transition={{ duration: 0.5 }}
                    />
                    {/* Optional: เงาบางๆ ทับรูปเพื่อให้ดูไม่ลอยจากพื้นหลังเกินไป */}
                    <div className="absolute inset-0 pointer-events-none" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      )}
    </div>
  );
}