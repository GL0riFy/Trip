'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Prompt } from 'next/font/google';
import { 
  ArrowRight, 
  Phone, 
  MapPin, 
  MessageSquareText, 
  SignalZero, 
  Timer 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale, PAGE_UI, EMERGENCY_SECTIONS, EmergencyItem } from '@/src/data/essentials';

const promptFont = Prompt({ subsets: ['thai'], weight: ['300', '400', '500', '600', '700'] });

// --- ข้อมูลสำหรับส่วน "สิ่งที่ควรรู้" (ใส่ไว้ตรงนี้เพื่อให้รองรับหลายภาษาและก็อปวางได้ทันที) ---
const TIPS_DATA = {
  sectionTitle: { th: "สิ่งที่ควรรู้", en: "Good to Know", zh: "温馨提示" },
  items: [
    {
      id: 1,
      icon: <MapPin className="w-6 h-6 text-pink-500" />,
      title: { th: "บอกตำแหน่งให้ชัด", en: "Provide Clear Location", zh: "提供准确位置" },
      desc: { th: "ระบุที่อยู่ ตำแหน่ง หรือจุดสังเกตใกล้เคียงก่อนโทร เจ้าหน้าที่จะมาถึงเร็วขึ้น", en: "State your address, location, or nearby landmarks clearly. Help will arrive faster.", zh: "拨打电话前请明确您的地址、位置或附近地标，以便救援人员更快到达。" }
    },
    {
      id: 2,
      icon: <MessageSquareText className="w-6 h-6 text-purple-600" />,
      title: { th: "มีล่ามภาษา", en: "Translators Available", zh: "提供翻译服务" },
      desc: { th: "โทร 1155 มีล่ามภาษาจีน อังกฤษ และอีกหลายภาษา บริการตลอด 24 ชั่วโมง", en: "Call 1155 for English, Chinese, and other language translators available 24/7.", zh: "拨打1155可获得中文、英文等多语种翻译服务，全天24小时在线。" }
    },
    {
      id: 3,
      icon: <SignalZero className="w-6 h-6 text-red-500" />,
      title: { th: "ไม่ต้องมีสัญญาณ", en: "No Signal Needed", zh: "无需信号" },
      desc: { th: "โทรฉุกเฉินได้แม้ไม่มีสัญญาณหรือซิมการ์ด ระบบจะต่อสายให้ข้ามเครือข่ายอัตโนมัติ", en: "Emergency calls can be made without network signal or a SIM card.", zh: "即使没有信号或SIM卡也可拨打紧急电话，系统会自动跨网连接。" }
    },
    {
      id: 4,
      icon: <Timer className="w-6 h-6 text-indigo-600" />,
      title: { th: "เวลาตอบสนอง", en: "Response Time", zh: "响应时间" },
      desc: { th: "เวลาตอบสนองเฉลี่ยในเขตเมือง 8-12 นาที ในชนบทอาจนานกว่านั้น", en: "Average response time is 8-12 mins in the city. May take longer in rural areas.", zh: "市区平均响应时间为8-12分钟，偏远地区可能需要更长时间。" }
    }
  ],
  noteLabel: { th: "หมายเหตุ :", en: "Note :", zh: "注意 :" },
  noteText: { 
    th: "ทุกหมายเลขฉุกเฉินโทรฟรีทุกเครือข่ายในประเทศไทย ไม่ต้องกดรหัสพื้นที่ ยกเว้น ททท. เชียงใหม่ (053 248 604) ซึ่งให้บริการเฉพาะวันทำการ", 
    en: "All emergency numbers are toll-free across all networks in Thailand with no area code needed, except TAT Chiang Mai (053 248 604) which operates on business days.", 
    zh: "泰国境内所有紧急号码均可免费跨网拨打，无需加拨区号。清迈旅游局 (053 248 604) 除外，仅在工作日提供服务。" 
  }
};

export default function EmergencyLayout() {
  const locale = useLocale() as Locale;
  const [selectedItem, setSelectedItem] = useState<EmergencyItem | null>(null);

  const openModal = (item: EmergencyItem) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  useEffect(() => {
    if (selectedItem) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <section className={`bg-slate-50 min-h-screen py-12 px-6 md:px-12 text-slate-800 ${promptFont.className}`}>
      <div className="max-w-3xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-slate-400 text-sm mb-1">{PAGE_UI.subtitle[locale]}</p>
            <h1 className="text-6xl font-bold leading-tight tracking-tight">
              {PAGE_UI.titleMain[locale]} <br /> {PAGE_UI.titleSub[locale]}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-red-500 text-xs font-bold">{PAGE_UI.statusBadge[locale]}</span>
          </div>
        </div>

        {/* --- Hero Card: 191 --- */}
        <a href="tel:191" className="group block mb-12">
          <div className="relative overflow-hidden bg-linear-to-r from-red-600 to-red-800 rounded-[30px] p-8 text-white flex items-center justify-between shadow-xl shadow-red-200/50 transition-transform active:scale-95">
            <div className="flex items-center gap-6">
              <span className="text-7xl font-black">191</span>
              <div className="border-l border-white/20 pl-6">
                <h2 className="text-xl font-bold mb-1">{PAGE_UI.policeHeroTitle[locale]}</h2>
                <p className="text-white/70 text-xs">{PAGE_UI.policeHeroDesc[locale]}</p>
              </div>
            </div>
            <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform opacity-80" />
          </div>
        </a>

        {/* --- Render Sections --- */}
        <div className="bg-white rounded-[32px] p-4 sm:p-8 shadow-sm border border-slate-100">
          {EMERGENCY_SECTIONS.map((section, idx) => (
            <div key={idx} className={idx !== EMERGENCY_SECTIONS.length - 1 ? "mb-10" : ""}>
              
              {/* Divider Line */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px grow bg-slate-100"></div>
                <span className="text-slate-400 text-sm font-medium whitespace-nowrap">
                  {section.categoryTitle[locale]}
                </span>
                <div className="h-px grow bg-slate-100"></div>
              </div>

              {/* List Items */}
              <div className="space-y-2">
                {section.items.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => openModal(item)}
                    className="w-full flex items-center justify-between group p-4 rounded-2xl hover:bg-slate-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all">
                        {item.icon || <Phone className="w-6 h-6 text-slate-300" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {item.title[locale]}
                        </h3>
                        <p className="text-slate-400 text-xs mt-0.5">{item.desc[locale]}</p>
                      </div>
                    </div>
                    <span className={`text-4xl font-bold tracking-tighter ${item.color}`}>
                      {item.number}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* ========================================= */}
          {/* NEW SECTION: สิ่งที่ควรรู้ (Things to Know) */}
          {/* ========================================= */}
          <div className="mt-16">
            {/* Divider Line */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px grow bg-slate-100"></div>
              <span className="text-slate-400 text-sm font-medium whitespace-nowrap">
                {TIPS_DATA.sectionTitle[locale]}
              </span>
              <div className="h-px grow bg-slate-100"></div>
            </div>

            {/* Grid 4 ช่อง */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TIPS_DATA.items.map((item) => (
                <div key={item.id} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="mb-3">{item.icon}</div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{item.title[locale]}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc[locale]}</p>
                </div>
              ))}
            </div>

            {/* กล่องหมายเหตุ */}
            <div className="mt-8 bg-amber-50/80 border-l-4 border-amber-400 p-5 rounded-r-2xl">
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong className="font-bold text-amber-700">{TIPS_DATA.noteLabel[locale]} </strong> 
                {TIPS_DATA.noteText[locale]}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* MODAL (Framer Motion) */}
      {/* ========================================= */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4"
            onClick={closeModal} 
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-8 pb-10 sm:pb-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* ขีดลากด้านบน (UI มือถือ) */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 sm:hidden"></div>

              {/* ส่วนหัว */}
              <div className="mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl mb-4">
                  {selectedItem.icon || <Phone className="w-6 h-6 text-emerald-600" />}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedItem.title[locale]}</h2>
                <p className="text-slate-500 text-sm mt-1">{selectedItem.desc[locale]}</p>
              </div>

              <hr className="border-slate-100 mb-6" />

              {/* หมายเลขขนาดใหญ่ */}
              <div className="mb-8">
                <h3 className="text-[3.5rem] leading-none font-bold text-teal-700 tracking-tight">
                  {selectedItem.number}
                </h3>
                <p className="text-slate-400 text-xs mt-2">{PAGE_UI.modalHint[locale]}</p>
              </div>

              {/* ตารางข้อมูล */}
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{PAGE_UI.modalHours[locale]}</span>
                  <span className="font-medium text-slate-800">{selectedItem.serviceHours?.[locale] || 'ตลอด 24 ชั่วโมง'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{PAGE_UI.modalDays[locale]}</span>
                  <span className="font-medium text-slate-800">{selectedItem.serviceDays?.[locale] || 'ทุกวัน'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{PAGE_UI.modalFee[locale]}</span>
                  <span className="font-medium text-slate-800">{selectedItem.fee?.[locale] || 'ฟรี'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{PAGE_UI.modalNumber[locale]}</span>
                  <span className="font-medium text-slate-800">{selectedItem.number}</span>
                </div>
              </div>

              {/* ปุ่มกด Action */}
              <div className="space-y-3 mt-auto">
                <a 
                  href={`tel:${selectedItem.number.replace(/\s/g, '')}`} 
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 py-4 font-bold text-white transition hover:bg-teal-800 active:scale-95 shadow-lg shadow-teal-700/20"
                >
                  <Phone className="h-5 w-5 fill-current" />
                  {PAGE_UI.btnCall[locale]}
                </a>
                <button 
                  onClick={closeModal} 
                  className="flex w-full items-center justify-center rounded-2xl border-2 border-slate-100 py-4 font-bold text-slate-600 transition hover:bg-slate-50 active:scale-95"
                >
                  {PAGE_UI.btnClose[locale]}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}