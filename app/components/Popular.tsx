'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Prompt } from 'next/font/google';
import { useLocale } from 'next-intl';

const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// --- รวมข้อความแปลภาษาไว้ที่นี่ ---
const content: any = {
  th: {
    more: 'เพิ่มเติม',
    featured: {
      title: 'สินค้า OTOP ของแต่ละชุมชน',
      desc: 'สินค้าภูมิปัญญาท้องถิ่น ของฝากคุณภาพดีจากชุมชน',
    },
    categories: [
      { title: 'ร้านอาหารยอดฮิต', desc: 'รวมร้านอาหารขึ้นชื่อ รสชาติต้นตำรับที่ห้ามพลาด' },
      { title: 'ที่พักที่เป็นที่นิยม', desc: 'ที่พักบรรยากาศดี ดีไซน์สวย เดินทางสะดวก' },
      { title: 'สถานที่ท่องเที่ยวยอดฮิต', desc: 'สถานที่ท่องเที่ยว ในภาคเหนือ ที่มีผู้คนไปอย่างไม่ขาดสาย สายธรรมชาติและวัฒนธรรมต้องไม่พลาด' },

    ]
  },
  en: {
    more: 'Read More',
    featured: {
      title: 'Local OTOP Products',
      desc: 'High-quality community products and unique local souvenirs.',
    },
    categories: [
      { title: 'Popular Restaurants', desc: 'Top-rated local eateries with authentic flavors you must try.' },
      { title: 'Recommended Stays', desc: 'Beautifully designed accommodations with great ambiance.' },
      { title: 'Popular Destinations', desc: 'Must-visit attractions in Northern Thailand where nature and culture meet.' },

    ]
  },
  zh: {
    more: '了解更多',
    featured: {
      title: '社区特色商品',
      desc: '精选当地特色手工艺品和高品质社区特产。',
    },
    categories: [
      { title: '人气餐厅', desc: '汇集了不可错过的在地美食和正宗口味。' },
      { title: '热门住宿', desc: '环境优美、设计精美且交通便利的下榻点。' },
      { title: '热门旅游景点', desc: '泰国北部深受游客喜爱的旅游胜地，自然风光与文化魅力不容错过。' },
    ]
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] as const } }
};

export default function Popular() {
  const locale = useLocale();
  // เลือกใช้ภาษาตาม locale ปัจจุบัน ถ้าไม่มีให้กลับไปใช้ภาษาไทย (th)
  const lang = content[locale] || content.th;

  const featuredPlace = {
    ...lang.featured,
    image: '/Popular/1.svg',
    link: `/products`
  };

  const categoryImages = [
    '/Popular/3.svg',
    '/Popular/2.svg',
    '/Popular/4.svg'
  ];

  const categoryLinks = [
    '/restaurants',
    '/hotels',
    '/tourist'
  ];

  return (
    <section
      className={`w-full relative z-30 -mt-16 md:-mt-24 bg-white overflow-visible pb-10 ${promptFont.className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch -mt-10 md:-mt-16">

          {/* ===== ซ้าย: Featured Card ===== */}
          <Link
            href={featuredPlace.link}
            className="flex-1 flex"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="w-full bg-gray-200 rounded-4xl p-4 md:p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.10)] border border-gray-100 flex flex-col group hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.14)] transition-shadow duration-300"
            >
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
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 tracking-tight">
                  {featuredPlace.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2">
                  {featuredPlace.desc}
                </p>
              </div>
            </motion.div>
          </Link>

          {/* ===== ขวา: 3 การ์ด ===== */}
          <div className="lg:w-5/12 flex flex-col gap-3 md:gap-4">
            {lang.categories.map((item: any, index: number) => (
              // เพิ่ม Link หุ้มตรงนี้
              <Link
                key={index}
                href={`/${locale}${categoryLinks[index]}`}
                className="flex-1 flex"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.15 } }
                  }}
                  className="group w-full flex items-center gap-4 bg-gray-100 rounded-3xl p-3 sm:p-4 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-square w-[160px] sm:w-[200px] shrink-0 rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                      src={categoryImages[index]}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                      sizes="(max-width: 640px) 160px, 200px"
                    />
                  </div>
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
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}