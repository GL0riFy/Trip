'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Prompt } from 'next/font/google';

// ใช้ฟอนต์ Prompt เพื่อความเรียบหรูและอ่านง่าย
const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

// Animation Variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Map() {
  return (
    <section className={`relative w-full min-h-screen bg-[#FAFAFA] text-slate-900 flex items-center pt-24 pb-16 overflow-hidden ${promptFont.className}`}>
      
      {/* Decorative Background Blob (Optional: เพิ่มมิติให้พื้นหลังสีขาว) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-50/50 blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-slate-100/80 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- Left Column: Content Section --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-2xl"
        >
          <motion.div variants={fadeUpVariants} className="mb-2 -ml-3 md:-ml-5">
            <Image 
              src="/logo/ChingMai(1).png" 
              alt="แอ่วเจียงใหม่ ม่วนอ๊ก ม่วนใจ๋" 
              width={500} 
              height={500}
              priority
              className="object-contain w-[240px] md:w-[300px] lg:w-[340px] h-auto drop-shadow-sm"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-semibold text-slate-900 mb-6 tracking-tight"
          >
            ปล่อยใจไปกับ <span className="text-blue-600">เชียงใหม่</span><br />
            เมืองที่ธรรมชาติและวิถีชีวิตเดินเคียงกัน
          </motion.h1>

          {/* Paragraph */}
          <motion.p 
            variants={fadeUpVariants}
            className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-lg"
          >
            หลีกหนีความวุ่นวาย แล้วมาค้นพบเสน่ห์ที่ซ่อนอยู่ เดินทอดน่องชมวัดเก่าแก่กลางเวียง 
            แวะจิบกาแฟคราฟต์ย่านนิมมานเหมินท์ ก่อนขึ้นไปสูดอากาศบริสุทธิ์บนดอยสุเทพ 
            สัมผัสความสงบและบรรยากาศสโลว์ไลฟ์ที่พร้อมต้อนรับคุณในทุกฤดูกาล
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeUpVariants}>
            <Link 
              href="/map"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              สำรวจแผนที่ท่องเที่ยว
              <svg 
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* --- Right Column: Image Gallery Section --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="flex flex-col gap-4 md:gap-6 w-full"
        >
          {/* Top Featured Image (ใหญ่ 1 รูป) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer"
          >
            <Image
              src="/Gallery/view.jpg" 
              alt="วิวขุนเขาเชียงใหม่"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </motion.div>

          {/* Bottom Images (ย่อย 2 รูป เรียงแนวนอน ความกว้างรวมเท่ารูปบนพอดี) */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative w-full aspect-square md:aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src="/Gallery/cafe.jpg" 
                alt="คาเฟ่เชียงใหม่"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="relative w-full aspect-square md:aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src="/Gallery/temple.jpg" 
                alt="วัดเก่าเมืองเชียงใหม่"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </motion.div>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}