'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Prompt } from 'next/font/google';

// 1. ประกาศ Font (แก้ Error: Cannot find name 'promptFont')
const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export type Locale = 'th' | 'en' | 'zh';

type LocalizedString = Record<Locale, string>;

export interface SeasonData {
  id: string;
  image: string;
  href: string;
  title: LocalizedString;
  desc: LocalizedString;
}

// 2. ประกาศข้อมูล Data (แก้ Error: Cannot find name 'SEASONS_DATA')
export const SEASONS_DATA: SeasonData[] = [
  {
    id: 'summer',
    image: '/Season/summer.jpg', 
    href: 'https://travel.kapook.com/view116809.html',
    title: { th: 'หน้าร้อนคลายร้อนที่ไหนดี', en: 'Where to cool off in Summer', zh: '夏天去哪里避暑' },
    desc: { th: 'รวมสถานที่คลายร้อนยอดฮิต ล่องแพ เล่นน้ำตก ชุ่มฉ่ำรับซัมเมอร์', en: 'Popular spots to cool down: rafting, waterfalls, and summer fun.', zh: '热门避暑胜地：漂流、瀑布，享受夏日乐趣。' }
  },
  {
    id: 'winter',
    image: '/Season/winter.webp',
    href: 'https://aroundbkk.com/travel-chiang-mai/',
    title: { th: 'อยากหนาวให้สุดไปไหนดี', en: 'Ultimate Winter Destinations', zh: '极致避寒胜地去哪里' },
    desc: { th: 'ชี้เป้าจุดชมวิวทะเลหมอกยอดดอย และทุ่งดอกพญาเสือโคร่งสุดโรแมนติก', en: 'Discover the best mountain peaks for sea of mist and cherry blossoms.', zh: '探索观赏云海和樱花的最美山峰。' }
  },
  {
    id: 'rainy',
    image: '/Season/rainy.jpg',
    href: 'https://www.paiduaykan.com/chiangmai-rainyseason/',
    title: { th: '7 ที่เที่ยว รักป่า รักไม้ รักฝน', en: '7 Spots for Nature & Rain Lovers', zh: '7个热爱自然与雨季的景点' },
    desc: { th: 'สัมผัสความเขียวขจีของนาขั้นบันได และกลิ่นไอดินหลังฝนตก', en: 'Experience the lush green rice terraces and the scent of earth after rain.', zh: '体验郁郁葱葱的梯田和雨后泥土的芬芳。' }
  }
];

export default function SeasonLayout() {
  const currentLocale = useLocale() as Locale;
  const t = useTranslations('Seasons');

  return (
    <section className={`bg-[#0F172A] text-white py-16 px-4 md:px-8 xl:px-12 ${promptFont.className}`}>
      <div className="w-full mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-[40px] font-bold mb-4 text-white">
            {t('title')}
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Cards Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {/* 3. ระบุ Type ให้ season (แก้ Error: Parameter 'season' implicitly has an 'any' type) */}
          {SEASONS_DATA.map((season: SeasonData) => (
            <Link href={season.href} key={season.id} className="group flex flex-col h-full w-full">
              
              <div className="bg-[#1E293B] rounded-[20px] overflow-hidden flex flex-col h-full w-full hover:-translate-y-1 transition-transform duration-300">
                
                {/* Image Area */}
                <div className="relative w-full aspect-video md:aspect-4/3 xl:aspect-video bg-slate-800 shrink-0">
                  <Image
                    src={season.image}
                    alt={season.title[currentLocale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex flex-col grow">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {season.title[currentLocale]}
                  </h3>
                  
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                    {season.desc[currentLocale]}
                  </p>

                  <div className="mt-auto text-right w-full">
                    <span className="text-sm md:text-base font-medium text-slate-300 group-hover:text-white transition-colors">
                      {t('more')}
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}