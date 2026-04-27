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

  const handleSelect = (selectedId) => {
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
      
      {/* --- ส่วนบน: ข้อความ --- */}
      {/* ปรับ px และ text-size ให้พอดีกับจอมือถือมากขึ้น */}
      <div className="w-full pt-16 pb-10 md:pt-20 md:pb-16 px-4 md:px-6 flex flex-col justify-center items-center text-center relative z-10 bg-[#F8F9FA]">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight"
        >
          จุดเช็คอินยอดฮิต เชียงใหม่
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-[90%] md:max-w-3xl leading-relaxed font-light"
        >
          สัมผัสมนต์เสน่ห์แห่งวัฒนธรรมล้านนา ดื่มด่ำธรรมชาติ 
          และวิถีชีวิตที่ผสมผสานความดั้งเดิมและความทันสมัยไว้อย่างลงตัว
        </motion.p>
      </div>

      {/* --- ส่วนล่าง: Slider (กางเต็มจอ) --- */}
      <div className="flex-1 w-full relative z-20">
        <div className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden bg-slate-900">
          
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activePlace.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activePlace.image}
                alt={activePlace.name}
                fill
                priority
                className="object-cover object-[center_60%] md:object-[center_75%]"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* ปรับ Gradient: ในมือถือให้ความมืดดันขึ้นไปสูงกว่าปกติ เพื่อให้ข้อความอ่านง่าย */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 md:via-black/30 to-transparent pointer-events-none" />

          {/* ข้อมูลด้านซ้าย (ชื่อสถานที่ + ปุ่ม Explore) */}
          {/* มือถือ: ดันขึ้นไปอยู่เหนือ Thumbnail (bottom-[230px]), คอม: อยู่ซ้ายล่างปกติ */}
          <div className="absolute bottom-[230px] left-4 right-4 sm:bottom-[280px] sm:left-6 md:bottom-20 md:left-16 flex flex-col text-white z-10 pointer-events-auto">
            <motion.h3 
              key={`title-${activePlace.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] line-clamp-2"
            >
              {activePlace.name}
            </motion.h3>
            
            <div className="flex items-center gap-3 md:gap-4">
              <Link 
                href={activePlace.href} 
                locale={locale}
                className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md text-white border-2 border-white/50 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="transform group-hover:translate-x-1 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[28px] md:h-[28px]">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase drop-shadow-lg text-white">
                Explore Place
              </span>
            </div>
          </div>

          {/* แกลลอรี Thumbnail ด้านขวา */}
          {/* มือถือ: ชิดซ้ายและขวา ทะลุขอบขวาได้ (overflow-x-auto) เลื่อนได้แบบไม่โดนตัด */}
          <div className="absolute bottom-6 left-4 right-0 sm:left-6 md:bottom-20 md:right-16 md:left-auto flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 pr-4 md:pr-0 z-10 pointer-events-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
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
                  // ปรับขนาดการ์ดในมือถือให้เตี้ยลง จะได้ไม่บังเนื้อหา (h-[180px])
                  className="relative snap-start shrink-0 w-[140px] h-[180px] sm:w-[160px] sm:h-[220px] md:w-[200px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.6)] md:shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-2 border-white/40 hover:border-white hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] group bg-slate-800 transition-all duration-300"
                >
                  <Image 
                    src={place.image} 
                    alt={place.name} 
                    fill
                    sizes="(max-width: 768px) 140px, 200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4 md:p-5">
                    <p className="text-white text-sm sm:text-base md:text-xl font-bold truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {place.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* ปุ่ม Next Arrow */}
            <button 
              onClick={handleNext}
              className="snap-start shrink-0 w-[50px] sm:w-[60px] md:w-[70px] h-[180px] sm:h-[220px] md:h-[280px] flex items-center justify-center bg-black/40 hover:bg-white backdrop-blur-md rounded-2xl text-white hover:text-black transition-all duration-300 border-2 border-white/40 hover:border-white group shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform md:w-[32px] md:h-[32px]">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}