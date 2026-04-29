'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl'; // เพิ่ม useTranslations
import { MapPin, Phone, Mail, Facebook, MessageCircle, BarChart2 } from 'lucide-react';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const locale = useLocale();
  const t = useTranslations('Footer'); // เรียกใช้ namespace 'Footer'

  useEffect(() => {
    fetch('/api/redis')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setVisitorCount(data.count);
        }
      })
      .catch((err) => console.error("Error updating visitors:", err));
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-auto w-full bg-slate-950 border-t border-slate-800 text-slate-300 transition-colors font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        
        {/* คอลัมน์ 1: โลโก้และคำอธิบาย */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <motion.div whileHover={{ scale: 1.02 }} className="w-fit">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <Image
                src="/Logo/Logo.png"
                alt="Trip Chin Logo"
                width={140}
                height={50}
                className="object-contain"
              />
            </Link>
          </motion.div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            {t('description')}
          </p>
        </div>

        {/* คอลัมน์ 2: เมนูลัด */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">{t('menuTitle')}</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
            <li><Link href={`/${locale}/places`} className="hover:text-white transition-colors">{t('menuPlaces')}</Link></li>
            <li><Link href={`/${locale}/events`} className="hover:text-white transition-colors">{t('menuEvents')}</Link></li>
            <li><Link href={`/${locale}/maps`} className="hover:text-white transition-colors">{t('menuMaps')}</Link></li>
          </ul>
        </div>

        {/* คอลัมน์ 3: ข้อมูลติดต่อ */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">{t('contactTitle')}</h3>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Tourism Office, Chiang Mai City Hall, Thailand</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 shrink-0" />
              <span>053-248-604</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <a href="mailto:admin@chiangmaipao.go.th" className="hover:text-white transition-colors">
                admin@chiangmaipao.go.th
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {t('copyright')}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            
            {/* Visitor Counter */}
            <motion.div
              key={visitorCount}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-slate-400 text-sm bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800"
            >
              <BarChart2 className="w-4 h-4 text-blue-400" />
              <span>{t('visits')}</span>
              <span className="font-mono font-medium text-slate-200">
                {visitorCount !== null ? visitorCount.toLocaleString() : "..."}
              </span>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </motion.div>

            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-full text-slate-300 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-full transition-all">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t('chat')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;