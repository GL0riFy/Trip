'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function ChiangMaiHero() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Home');


  const setLanguage = (lang: 'en' | 'zh' | 'th') => {
    router.push(`/${lang}/maps`);
  };
  return (
    <section className="relative pb-30 w-full overflow-hidden">

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-20">
        
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-2 text-sm tracking-[0.4em] text-white drop-shadow-lg uppercase">Welcome to</h1>
          <h2 className="text-6xl md:text-8xl font-serif italic text-white drop-shadow-2xl">Chiang Mai</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-8 w-full max-w-4xl"
        >
          {/* Language Selection */}
          <div className="flex flex-col md:flex-row gap-6">
            {[
              { id: 'zh', label: '中文', flag: 'CN', sub: 'CHINESE' },
              { id: 'en', label: 'English', flag: 'GB', sub: 'ENGLISH' },
              { id: 'th', label: 'ไทย', flag: 'TH', sub: 'THAI' }
            ].map((lang) => (
              <motion.button
                key={lang.id}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage(lang.id as 'en' | 'zh' | 'th')}
                className="group relative flex w-72 items-center justify-between rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 shadow-2xl"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-2xl font-medium text-white">{lang.label}</span>
                  <span className="text-[10px] tracking-widest text-white/60">{lang.sub}</span>
                </div>
                <span className="text-3xl font-bold text-white/80 group-hover:text-white transition-colors">
                  {lang.flag}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Divider เส้นคั่นบางๆ */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.5 }}
             transition={{ delay: 1 }}
             className="h-px w-32 bg-white/30 my-2"
          />

          {/* 🟢 NEW: ปุ่มไปยังหน้าเครื่องมือ (Essentials) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="w-full flex justify-center"
          >
            <Link href={`/${locale}/essentials`} className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="
                  flex items-center justify-center gap-3
                  w-full md:w-[600px] 
                  py-4 px-8
                  rounded-xl
                  border border-white/40 bg-white/15 
                  backdrop-blur-md shadow-lg
                  text-white transition-all
                "
              >
                <span className="text-2xl">🧰</span>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-semibold tracking-wide">{t('ESSENTIAL')}</span>
                  <span className="text-xs text-white/70">{t('ESSENTIAL_TOOLS')}
                  
                  
                  </span>
                </div>
                <span className="ml-auto text-white/50">➔</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Hint Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.5 }}
            className="text-[11px] tracking-[0.3em] text-white font-light uppercase drop-shadow-md mt-4"
          >
            Please choose your experience
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}