'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Prompt } from 'next/font/google';
import { EVENTS_DATA, type Locale } from '@/src/data/events/events';

const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function TimelineLayout() {
  const t = useTranslations('Events'); // ดึงจาก namespace 'Events' ในไฟล์ json
  const currentLocale = useLocale() as Locale; 

  return (
    <section className={`bg-white text-black py-12 sm:py-16 px-3 sm:px-4 md:px-8 ${promptFont.className}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-5 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3">
            {t('titlePrefix')}
            <br className="block min-[540px]:hidden" />
            <span className="text-blue-500 text-5xl sm:text-6xl md:text-7xl font-itim"> {t('titleHighlight')}</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Timeline List Section */}
        <div className="flex flex-col">
          <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 my-4 sm:my-6">
            <div className="grow h-2.5 bg-gray-100 rounded-full" />
            <div className="w-full md:w-[280px] shrink-0 hidden md:block" />
          </div>

          {EVENTS_DATA.map((event) => (
            <div key={event.id}>
              <div className="group block">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center py-2">
                  
                  {/* 1. Date Block */}
                  <div className="w-full md:w-20 shrink-0 flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 md:gap-1">
                    <span className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-black leading-none">
                      {event.day}
                    </span>
                    <span className="text-base sm:text-lg md:text-4xl font-bold text-black">
                      {event.shortDate[currentLocale]}
                    </span>
                  </div>

                  {/* 2. Content Block */}
                  <div className="grow w-full md:pr-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 sm:mb-2 group-hover:text-blue-500 transition-colors">
                      {event.titleFull[currentLocale]}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                      {event.desc[currentLocale]}
                    </p>
                  </div>

                  {/* 3. Image Block */}
                  <div className="w-full md:w-[280px] h-[140px] sm:h-[160px] md:h-[180px] shrink-0 relative rounded-lg md:rounded-xl overflow-hidden border border-gray-100">
                    <Image
                      src={event.image}
                      alt={event.titleMain[currentLocale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={event.id === '01'}
                    />
                  </div>
                  
                </div>
              </div>

              <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 my-4 sm:my-6">
                <div className="grow h-2.5 bg-gray-100 rounded-full" />
                <div className="w-full md:w-[280px] shrink-0 hidden md:block" />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}