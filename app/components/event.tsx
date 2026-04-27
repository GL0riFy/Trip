'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const events = [
  {
    id: '01',
    titleMain: 'ใส่ขันดอก',
    titleSub: 'อินทขิล',
    titleFull: 'ใส่ขันดอกอินทขิล',
    subtitle: 'ประเพณีล้านนา - เชียงใหม่',
    desc: 'พิธีสักการะบูชาเสาหลักเมืองเชียงใหม่ ชาวเชียงใหม่จะนำดอกไม้ ข้าวตอก และธูปเทียนใส่ในขันดอกไม้เพื่อความเป็นสิริมงคล',
    fullDate: 'เดือนพฤษภาคม - มิถุนายน ของทุกปี',
    shortDate: 'พ.ค. - มิ.ย.',
    image: '/Event/saointhakhin.jpg'
  },
  {
    id: '02',
    titleMain: 'เทศกาล',
    titleSub: 'ร่มบ่อสร้าง',
    titleFull: 'เทศกาลร่มบ่อสร้าง',
    subtitle: 'ประเพณีล้านนา - เชียงใหม่',
    desc: 'ประเพณีเฉลิมฉลองของหมู่บ้านทำร่มที่สืบทอดกันมานับร้อยปี ชมความงามของร่มกระดาษสาที่เพ้นท์ลวดลายวิจิตรตระการตา',
    fullDate: 'สัปดาห์ที่ 3 ของเดือนมกราคม',
    shortDate: 'ม.ค.',
    image: '/Event/umbrella-borsang.jpg'
  },
  {
    id: '03',
    titleMain: 'มหกรรม',
    titleSub: 'ไม้ดอกไม้ประดับ',
    titleFull: 'มหกรรมไม้ดอก',
    subtitle: 'เทศกาลประจำปี - เชียงใหม่',
    desc: 'เทศกาลที่เนรมิตทั้งเมืองเชียงใหม่ให้กลายเป็นสวนดอกไม้ ไฮไลท์คือขบวนรถบุปผชาติที่ตกแต่งด้วยดอกไม้สดนับแสนดอก',
    fullDate: 'สัปดาห์แรกของเดือนกุมภาพันธ์',
    shortDate: 'ก.พ.',
    image: '/Event/woodflower.jpg'
  },
  {
    id: '04',
    titleMain: 'ยี่เป็ง',
    titleSub: 'ล้านนา',
    titleFull: 'ยี่เป็งล้านนา',
    subtitle: 'ประเพณีล้านนา - เชียงใหม่',
    desc: 'โดดเด่นด้วยการประดับโคมล้านนาทั่วเมือง การตั้งธรรมหลวง และการปล่อยโคมลอยขึ้นสู่ท้องฟ้าเพื่อบูชาพระเกศแก้วจุฬามณี',
    fullDate: 'วันเพ็ญเดือน 12 - ประมาณเดือนพฤศจิกายน',
    shortDate: 'พ.ย.',
    image: '/Event/yipeung.jpg'
  }
];

export default function DarkTimelineLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = events[activeIndex];

  return (
    // เปลี่ยนจาก min-h-screen เป็น h-[100dvh] เพื่อแก้ปัญหาแถบ URL บังในมือถือ
    <div className="relative h-[100dvh] w-full flex flex-col lg:flex-row overflow-hidden font-sans text-white bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeEvent.id}
            src={activeEvent.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={activeEvent.titleFull}
          />
        </AnimatePresence>
        
        {/* Dark Overlay: 
            - มือถือ: ไล่ระดับ บน(มืด) -> กลาง(โปร่ง) -> ล่าง(มืด) เพื่อให้อ่านตัวหนังสือและเมนูด้านล่างชัด
            - เดสก์ท็อป: ไล่ระดับ ซ้าย(มืด) -> ขวา(โปร่ง) 
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent" />
      </div>

      {/* --- Left Panel (Hero Content) --- */}
      {/* เพิ่ม overflow-y-auto เผื่อหน้าจอมือถือเล็กมากแล้วข้อความยาว */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-32 py-10 lg:py-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-xl my-auto lg:my-0"
          >
            {/* Subtitle */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
              <div className="w-8 sm:w-12 h-[1px] bg-gray-500"></div>
              <p className="text-[10px] sm:text-xs md:text-sm font-medium tracking-widest text-gray-400">
                {activeEvent.subtitle}
              </p>
            </div>

            {/* Title - ปรับลดขนาดลงในมือถือ (text-5xl) */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-1 sm:mb-2 text-white">
              {activeEvent.titleMain}
            </h1>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif italic tracking-wide text-[#cda434] mb-6 sm:mb-10 drop-shadow-lg">
              {activeEvent.titleSub}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed mb-8 sm:mb-14 min-h-[60px] lg:min-h-[80px]">
              {activeEvent.desc}
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-6 lg:pb-0">
              <button className="px-6 py-2 sm:px-8 sm:py-3 border border-[#cda434] text-[#cda434] text-xs sm:text-sm tracking-widest hover:bg-[#cda434] hover:text-black transition-colors duration-300">
                ช่วงเวลา
              </button>
              
              <span className="text-xs sm:text-sm font-light text-gray-300 tracking-wide">
                {activeEvent.fullDate}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Right Panel (Timeline List) --- */}
      {/* มือถือ: วางชิดขอบล่าง (flex-row) และเปิดใช้งาน Horizontal Scroll 
          เดสก์ท็อป: วางชิดขวา (flex-col) 
      */}
      <div className="relative z-10 w-full lg:w-[400px] xl:w-[480px] flex bg-black/70 lg:bg-black/40 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10">
        
        {/* คอนเทนเนอร์สำหรับเลื่อน */}
        <div className="flex flex-row lg:flex-col w-full overflow-x-auto lg:overflow-x-visible overflow-y-hidden snap-x snap-mandatory lg:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {events.map((event, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={event.id}
                onClick={() => setActiveIndex(index)}
                // มือถือ: การ์ดกว้าง 85vw และตัดเส้นขอบขวาแทนเส้นขอบล่าง
                className={`group relative flex-none w-[85vw] sm:w-[320px] lg:w-full flex flex-col py-5 px-6 lg:py-8 lg:px-10 border-r lg:border-r-0 lg:border-b border-white/5 cursor-pointer snap-start transition-all duration-300 ${
                  isActive ? 'bg-[#0f0f0f]/90' : 'hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Line 
                    มือถือ: เส้นสีทองอยู่ด้านบน (top-0 left-0 right-0)
                    เดสก์ท็อป: เส้นสีทองอยู่ด้านซ้าย (left-0 top-0 bottom-0)
                */}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute top-0 left-0 right-0 h-[3px] lg:h-auto lg:bottom-0 lg:w-[3px] lg:right-auto bg-[#cda434] shadow-[0_0_10px_rgba(205,164,52,0.5)] z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Content Container */}
                <div className="flex flex-col gap-1 lg:gap-2 pt-2 lg:pt-0">
                  {/* Number */}
                  <span className={`text-xs lg:text-sm font-mono tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-[#cda434]' : 'text-gray-600 group-hover:text-gray-400'
                  }`}>
                    {event.id}
                  </span>
                  
                  {/* Title */}
                  <span className={`text-base lg:text-lg font-bold tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                    {event.titleFull}
                  </span>

                  {/* Short Date */}
                  <span className={`text-[10px] lg:text-xs font-medium tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-[#cda434]' : 'text-gray-600 group-hover:text-gray-500'
                  }`}>
                    {event.shortDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}