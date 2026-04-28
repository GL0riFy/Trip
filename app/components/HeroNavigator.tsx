'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const backgroundImages = [
  "/Slide/1.jpg",
  "/Slide/2.jpg",
  "/Slide/3.jpg",
  "/Slide/4.jpg",
];

export default function HeroSec() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // เรียกใช้คำแปลภาษาจาก namespace 'Hero'
  const t = useTranslations('Hero');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto items-start">
        
        {/* ปรับ max-w-2xl เพื่อให้ข้อความยาวๆ มีพื้นที่เพียงพอ ไม่โดนบีบตัดบรรทัดผิดธรรมชาติ */}
        <div className="flex flex-col items-start gap-4 max-w-2xl mb-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-0"
          >
            <Image
              src="/logo/Ching-Mai-white.png"
              alt={t('logoAlt')}
              width={220}
              height={220}
              className="w-auto"
              style={{ maxWidth: '300px', height: 'auto' }}
              priority
            />
          </motion.div>

          {/* Subtitle — ขนาด 4xl และใช้ block เพื่อบังคับขึ้นบรรทัดใหม่เป็น 2 บรรทัดพอดี */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-white text-3xl md:text-4xl font-semibold leading-snug w-full"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
          >
            <span className="block">{t('titleLine1')}</span>
            <span className="block">{t('titleLine2')}</span>
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.7, ease: "easeOut" }}
          className="mt-0"
        >
          <button
            className="px-6 py-2.5 border border-white text-white text-sm font-medium rounded-full
                       hover:bg-white hover:text-gray-800 transition-all duration-300
                       backdrop-blur-sm bg-white/10"
          >
            {t('exploreBtn')}
          </button>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {backgroundImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentImageIndex
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}