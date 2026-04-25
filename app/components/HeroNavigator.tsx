'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgroundImages = [
  "/Slide/1.jpg",
  "/Slide/2.jpg",
  "/Slide/3.jpg",
  "/Slide/4.jpg",
];

export default function HeroSec() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
<section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

<div className="absolute inset-0 z-0">
  <AnimatePresence>
    <motion.div
      key={currentImageIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
    />
  </AnimatePresence>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40" />
</div>

{/* Content */}
<div className="relative z-10 flex flex-col items-center justify-center px-4 text-center h-full">
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
    className="mb-12"
  >
    <h1 className="mb-2 text-sm tracking-[0.4em] text-white uppercase">
      Welcome to
    </h1>
    <h2 className="text-6xl md:text-8xl font-serif italic text-white">
      Chiang Mai
    </h2>
  </motion.div>
</div>
</section>
  );
}