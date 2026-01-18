"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/Slide/1.jpg",
  "/Slide/2.jpg",
  "/Slide/3.jpg",
  "/Slide/4.jpg",
];

const extendedImages = [
  images[images.length - 1],
  ...images,
  images[0],
];

export default function ImageSlider() {
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [imageWidth, setImageWidth] = useState(600);
  const [gap, setGap] = useState(40);

  // 📱 responsive size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w < 640) {
        // mobile
        setImageWidth(w * 0.8); // เห็นข้าง ๆ นิดเดียว
        setGap(16);
      } else if (w < 1024) {
        // tablet
        setImageWidth(480);
        setGap(24);
      } else {
        // desktop
        setImageWidth(600);
        setGap(40);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const STEP = imageWidth + gap;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index === extendedImages.length - 1) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(1);
      }, 800);
    }
  }, [index]);

  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  return (
    <div className="w-full py-20 flex justify-center overflow-hidden">
      {/* container คุมกึ่งกลาง */}
      <div
        className="relative"
        style={{ width: imageWidth }}
      >
        <motion.div
          className="flex items-center"
          animate={{ x: `-${index * STEP}px` }}
          transition={
            animate
              ? { duration: 1, ease: "easeInOut" }
              : { duration: 0 }
          }
          style={{ gap }}
        >
          {extendedImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              style={{
                width: imageWidth,
                height: imageWidth * 0.6, // ratio สวยบนมือถือ
              }}
              className="object-cover rounded-3xl shadow-xl"
              animate={{
                scale: i === index ? 1 : 0.88,
                opacity: i === index ? 1 : 0.4,
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
