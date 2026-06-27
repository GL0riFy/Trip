"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const locale = (params?.locale as "th" | "en" | "zh") || "th";

  const uiMap = {
    th: {
      title: "ท่องเที่ยวเชียงใหม่",
      subtitle: "ดื่มด่ำกับซอฟต์พาวเวอร์อันล้ำค่า",
      clickHere: "คลิก Here",
      footerDesc: "พวงกุญแจนี้จะนำพาให้คุณได้สัมผัสกับประสบการณ์วัฒนธรรมล้านนาไปกับเรา",
    },
    en: {
      title: "Travel to Chiang Mai",
      subtitle: "Immerse yourself in precious soft power",
      clickHere: "Click Here",
      footerDesc: "This keychain will lead you to experience the Lanna culture with us.",
    },
    zh: {
      title: "畅游清迈",
      subtitle: "沉浸在珍贵的软实力中",
      clickHere: "点击这里",
      footerDesc: "这款钥匙扣将带您与我们一起体验兰纳文化。",
    }
  };

  const ui = uiMap[locale] || uiMap.th;

  // ---------------------------------
  // 1. Logic สำหรับแสดง Popup และ นับจำนวนผู้เข้าชม
  // ---------------------------------
  useEffect(() => {
    // เช็คว่าเคยเห็น Popup ใน Session นี้หรือยัง
    const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");
    
    if (!hasSeenPopup) {
      setIsOpen(true);
      
      // 🔹 เริ่มกระบวนการนับ Visitor (นับเฉพาะครั้งแรกที่เจอ Popup)
      const hasVisited = sessionStorage.getItem('has_visited_chiangmai');
      
      if (!hasVisited) {
        // 💡 ล็อกเอาไว้ตรงนี้ทันที! รอบที่สองเข้ามาจะได้ไม่หลุดคิวเข้า fetch
        sessionStorage.setItem('has_visited_chiangmai', 'true');

        fetch('/api/visitors', { method: 'POST' })
          .then(res => res.json())
          .then(data => {
            console.log('✅ Visitor counted via Popup:', data.count);
          })
          .catch(err => {
            console.error('❌ Error counting visitor:', err);
            // 💡 เผื่อเกิดข้อผิดพลาดในการเน็ตหลุด ค่อยลบออกเพื่อให้ระบบลองนับใหม่รอบหน้าได้
            sessionStorage.removeItem('has_visited_chiangmai');
          });
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenWelcomePopup", "true");
  };

  // ---------------------------------
  // Framer Motion Variants
  // ---------------------------------
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const popupVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delayChildren: 0.15,
        staggerChildren: 0.15
      }
    },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const floatingTextVariants: Variants = {
    animate: {
      y: [0, -5, 0],
      rotate: [-12, -15, -12],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >
          <motion.div
            variants={popupVariants}
            className="bg-white rounded-[2rem] p-8 md:p-12 max-w-4xl w-full shadow-2xl relative text-center border border-white/20 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all z-20"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Title & Subtitle */}
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2 tracking-tight">
                {ui.title}
              </h2>
              <p className="text-lg md:text-xl font-medium text-gray-600">
                {ui.subtitle}
              </p>
            </motion.div>

            {/* 3 Images Grid */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 mb-10">
              {[1, 2, 3].map((num) => (
                <Link key={num} href={`/${locale}/products`} onClick={handleClose} className="relative group cursor-pointer block w-full max-w-[200px]">
                  <motion.div
                    variants={floatingTextVariants}
                    animate="animate"
                    className="absolute -top-6 -left-4 md:-left-8 z-10 text-gray-800 font-black text-xl md:text-2xl drop-shadow-md"
                  >
                    {ui.clickHere}
                  </motion.div>
                  <div className="w-full aspect-square relative overflow-hidden rounded-[2rem] drop-shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={num === 1 ? "/Products/11.png" : `/Products/${num}.png`}
                      alt={`Product ${num}`}
                      fill
                      sizes="200px"
                      priority
                      className="object-cover"
                    />
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* Footer Description */}
            <motion.div variants={itemVariants} className="px-4">
              <p className="text-gray-500 font-bold text-base md:text-lg leading-relaxed">
                {ui.footerDesc}
              </p>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}