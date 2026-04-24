'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Prompt } from 'next/font/google';

const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const MOCK_PLACES = [
  {
    id: 1,
    name: "ดอยสุเทพ",
    image: "/Popular/doi-suthep.jpg",
    href: "/popular/doi-suthep",
  },
  {
    id: 2,
    name: "ประตูท่าแพ",
    image: "/Popular/tha-phae.jpg",
    href: "/popular/tha-phae",
  },
  {
    id: 3,
    name: "ม่อนแจ่ม",
    image: "/Popular/mon-jam.jpg",
    href: "/popular/mon-jam",
  },
  {
    id: 4,
    name: "ดอยอินทนนท์",
    image: "/Popular/doi-inthanon.jpg",
    href: "/popular/doi-inthanon",
  },
];

export default function Popular() {
  const locale = useLocale();
  
  const [items, setItems] = useState(MOCK_PLACES);

  const handleNext = () => {
    setItems((prev) => {
      const newArray = [...prev];
      const firstItem = newArray.shift();
      if (firstItem) newArray.push(firstItem);
      return newArray;
    });
  };

  const handleSelect = (selectedId: number) => {
    setItems((prev) => {
      const selectedIndex = prev.findIndex((item) => item.id === selectedId);
      const before = prev.slice(0, selectedIndex);
      const after = prev.slice(selectedIndex);
      return [...after, ...before];
    });
  };

  const activePlace = items[0];
  const thumbnailPlaces = items.slice(1);

  return (
    <section className={`w-full min-h-screen flex flex-col ${promptFont.className}`}>
      
      {/* --- ส่วนบน: ข้อความ (เอาป้าย Trending ออกแล้ว) --- */}
      <div className="w-full pt-20 pb-12 md:pb-16 px-6 flex flex-col justify-center items-center text-center relative z-10 bg-[#F8F9FA]">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
        >
          จุดเช็คอินยอดฮิต เชียงใหม่
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed font-light"
        >
          สัมผัสมนต์เสน่ห์แห่งวัฒนธรรมล้านนา ดื่มด่ำธรรมชาติ 
          และวิถีชีวิตที่ผสมผสานความดั้งเดิมและความทันสมัยไว้อย่างลงตัว
        </motion.p>
      </div>

      {/* --- ส่วนล่าง: Slider (กางเต็มจอ) --- */}
      <div className="flex-1 w-full relative z-20">
        <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-slate-900">
          
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activePlace.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activePlace.image}
                alt={activePlace.name}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* ปรับ Gradient ให้เข้มขึ้นนิดนึง เพื่อดันให้การ์ดสว่างทะลุขึ้นมา */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* ข้อมูลด้านซ้าย */}
          <div className="absolute bottom-12 left-6 md:bottom-20 md:left-16 flex flex-col text-white">
            <motion.h3 
              key={`title-${activePlace.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
            >
              {activePlace.name}
            </motion.h3>
            
            <div className="flex items-center gap-4">
              <Link 
                href={activePlace.href} 
                locale={locale}
                className="group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md text-white border-2 border-white/50 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="transform group-hover:translate-x-1 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
              <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase drop-shadow-lg text-white">
                Explore Place
              </span>
            </div>
          </div>

          {/* แกลลอรี Thumbnail ด้านขวา (ปรับขอบและเงาให้โคตรเด่น) */}
          <div className="absolute bottom-12 right-6 md:bottom-20 md:right-16 flex gap-4 overflow-visible">
            <AnimatePresence mode="popLayout">
              {thumbnailPlaces.map((place) => (
                <motion.div
                  key={place.id}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => handleSelect(place.id)}
                  // เพิ่ม border-2 border-white/40 และ hover:border-white พร้อมเงาเข้มๆ
                  className="relative min-w-[150px] h-[220px] md:min-w-[200px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-2 border-white/40 hover:border-white hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] group bg-slate-800 transition-all duration-300"
                >
                  <Image 
                    src={place.image} 
                    alt={place.name} 
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5">
                    <p className="text-white text-base md:text-xl font-bold truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {place.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* ปุ่ม Next Arrow (ให้เด่นขึ้นด้วย Hover เป็นสีขาวทึบ) */}
            <button 
              onClick={handleNext}
              className="min-w-[60px] md:min-w-[70px] h-[220px] md:h-[280px] flex items-center justify-center bg-black/40 hover:bg-white backdrop-blur-md rounded-2xl text-white hover:text-black transition-all duration-300 border-2 border-white/40 hover:border-white group shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}