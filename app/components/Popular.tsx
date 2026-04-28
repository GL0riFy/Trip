'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Prompt } from 'next/font/google';

const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const featuredPlace = {
  id: 'featured',
  date: 'วันที่ 26 / 4 / 2569',
  title: 'สถานที่ท่องเที่ยวยอดฮิต',
  desc: 'สถานที่ท่องเที่ยว ในภาคเหนือ ที่มีผู้คนไปอย่างไม่ขาดสาย สายธรรมชาติและวัฒนธรรมต้องไม่พลาด',
  image: '/Popular/doi-suthep1.jpg',
  link: '/popular/featured'
};

const popularCategories = [
  {
    id: 1,
    title: 'ร้านอาหารยอดฮิต',
    desc: 'สถานที่ท่องเที่ยว ในภาคเหนือ ที่มีผู้คนไปอย่างไม่ขาดสาย สาย...',
    image: '/Popular/food.jpg',
    link: '/popular/food'
  },
  {
    id: 2,
    title: 'ที่พักที่เป็นที่นิยม',
    desc: 'สถานที่ท่องเที่ยว ในภาคเหนือ ที่มีผู้คนไปอย่างไม่ขาดสาย สาย...',
    image: '/Popular/hotel.webp',
    link: '/popular/hotel'
  },
  {
    id: 3,
    title: 'สินค้า OTOP ของแต่ละชุมชน',
    desc: 'สถานที่ท่องเที่ยว ในภาคเหนือ ที่มีผู้คนไปอย่างไม่ขาดสาย สาย...',
    image: '/Popular/otop.jpg',
    link: '/popular/otop'
  }
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] as const } }
};

export default function Popular() {
  return (
    <section
      className={`w-full relative z-30 -mt-16 md:-mt-24 bg-white overflow-visible pb-10 ${promptFont.className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch -mt-10 md:-mt-16">

          {/* ===== ซ้าย: Featured Card ===== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="lg:w-7/12 bg-gray-200 rounded-4xl p-4 md:p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.10)] border border-gray-100 flex flex-col group hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.14)] transition-shadow duration-300"
          >
            {/* รูปใหญ่ — min-h-[500px] ตามที่กำหนด ไม่แตะ */}
            <div className="relative w-full flex-1 min-h-[500px] rounded-3xl overflow-hidden mb-5">
              <Image
                src={featuredPlace.image}
                alt={featuredPlace.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="shrink-0 px-2 pb-2">
              <span className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide mb-2 block">
                {featuredPlace.date}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 tracking-tight">
                {featuredPlace.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2">
                {featuredPlace.desc}
              </p>
              <Link
                href={featuredPlace.link}
                className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] font-semibold text-sm sm:text-base transition-colors group/link"
              >
                เพิ่มเติม
                <svg
                  className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* ===== ขวา: 3 การ์ด ===== */}
          <div className="lg:w-5/12 flex flex-col gap-3 md:gap-4">
            {popularCategories.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.15 } }
                }}
                className="group flex-1 flex items-center gap-4 bg-gray-100 rounded-3xl p-3 sm:p-4 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail สี่เหลี่ยมจัตุรัส — แก้แค่นี้จุดเดียว */}
                <div className="relative aspect-square w-[160px] sm:w-[200px] shrink-0 rounded-2xl overflow-hidden bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                    sizes="(max-width: 640px) 160px, 200px"
                  />
                </div>

                {/* ข้อมูล */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed mb-2">
                    {item.desc}
                  </p>
                  <div className="w-10 h-[2px] bg-gray-200 group-hover:bg-blue-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}