'use client';

import React, { useState, useEffect } from 'react';
import { Prompt } from 'next/font/google';
import { useParams } from 'next/navigation';
import { ArrowLeftRight, Loader2, Trophy, Landmark, CreditCard, AlertTriangle, Smartphone, Info, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { t, BASE_CURRENCY_LIST, type Locale, type Currency } from '@/src/data/essentials';

const promptFont = Prompt({ subsets: ['latin', 'thai'], weight: ['300', '400', '500', '600', '700'] });

// ไอคอนสำหรับ Card คำแนะนำ
const tipIcons = [
  <Trophy key="icon1" className="w-6 h-6 text-yellow-500" />,
  <CreditCard key="icon2" className="w-6 h-6 text-blue-500" />,
  <Smartphone key="icon3" className="w-6 h-6 text-indigo-500" />,
  <AlertTriangle key="icon4" className="w-6 h-6 text-orange-500" />
];

// --- ข้อมูลผู้ให้บริการแลกเงิน (อัปเดตลิงก์ Google Maps ของจริง) ---
const PROVIDERS_DATA = [
  {
    id: 'sr_changklan',
    name: { th: 'SuperRich Chiang Mai', en: 'SuperRich Chiang Mai', zh: '清迈超级富豪 (SuperRich)' },
    location: { th: 'ถนนลอยเคราะห์ - ย่านไนท์บาซาร์', en: 'Loi Kroh Rd - Near Night Bazaar', zh: 'Loi Kroh路 - 近长康夜市' },
    tag: { th: 'เรทดีที่สุด', en: 'Best Rate', zh: '最优汇率' },
    tagColor: 'bg-yellow-100 text-yellow-700',
    color: '#10B981',
    rateDiff: +0.02,
    hours: '08:30 - 17:30',
    days: { th: 'จันทร์ - เสาร์', en: 'Mon - Sat', zh: '周一至周六' },
    note: { th: 'ต้องใช้พาสปอร์ตตัวจริง', en: 'Original passport required', zh: '需要原件护照' },
    // ใช้ Search API ของ Google Maps เพื่อความชัวร์ ไม่พังแน่นอน
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Super+Rich+Chiang+mai+(Loi+Kroh)' 
  },
  {
    id: 'sr_green',
    name: { th: 'SuperRich (สีเขียว)', en: 'SuperRich (Green)', zh: 'SuperRich (绿色)' },
    location: { th: 'เซ็นทรัลเฟสติวัล ชั้น 4', en: 'Central Festival 4th Floor', zh: '尚泰清迈购物中心 4楼' },
    tag: { th: 'เรทดีที่สุด', en: 'Best Rate', zh: '最优汇率' },
    tagColor: 'bg-blue-100 text-blue-700',
    color: '#3B82F6',
    rateDiff: -0.01,
    hours: '11:00 - 20:00',
    days: { th: 'ทุกวัน', en: 'Everyday', zh: '每天' },
    note: { th: 'ต้องใช้พาสปอร์ตตัวจริง', en: 'Original passport required', zh: '需要原件护照' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SuperRich+Central+Festival+Chiang+Mai'
  },
  {
    id: 'thaphae',
    name: { th: 'ย่านประตูท่าแพ', en: 'Tha Phae Area', zh: '塔佩门区域' },
    location: { th: 'มีร้านแลกเงินหลายร้านเรียงติดกัน', en: 'Multiple exchange booths available', zh: '附近有多个兑换亭' },
    tag: { th: 'สะดวก', en: 'Convenient', zh: '方便' },
    tagColor: 'bg-orange-100 text-orange-700',
    color: '#F59E0B',
    rateDiff: -0.40,
    hours: '09:00 - 21:00',
    days: { th: 'ทุกวัน', en: 'Everyday', zh: '每天' },
    note: { th: 'เรทอาจไม่ดีเท่า SuperRich แต่หาง่าย', en: 'Rates lower than SuperRich but easy to find', zh: '汇率不如SuperRich，但很容易找到' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Currency+Exchange+Tha+Phae+Gate'
  },
  {
    id: 'banks',
    name: { th: 'ธนาคารทั่วไป', en: 'General Banks', zh: '各大银行' },
    location: { th: 'สาขาทั่วเชียงใหม่ และในสนามบิน', en: 'Branches across Chiang Mai & Airport', zh: '清迈各地分行及机场' },
    tag: { th: 'ธนาคาร', en: 'Bank', zh: '银行' },
    tagColor: 'bg-emerald-100 text-emerald-700',
    color: '#059669',
    rateDiff: -0.90,
    hours: '11:00 - 19:00 (ในห้าง)',
    days: { th: 'ทุกวัน (สาขาในห้าง)', en: 'Everyday (Mall branches)', zh: '每天 (商场分行)' },
    note: { th: 'เรทซื้อ-ขายต่างกันมาก (Spread กว้าง)', en: 'High spread between buy & sell rates', zh: '买卖汇率差价较大' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bank+Chiang+Mai'
  },
  {
    id: 'maya',
    name: { th: 'ย่าน MAYA & นิมมาน', en: 'MAYA & Nimman', zh: '玛雅购物中心 & 宁曼路' },
    location: { th: 'MAYA ชั้น B1 หรือริมถนนนิมมาน', en: 'MAYA B1 Floor or Nimman Rd', zh: '玛雅 B1层 或 宁曼路' },
    tag: { th: 'สะดวก', en: 'Convenient', zh: '方便' },
    tagColor: 'bg-orange-100 text-orange-700',
    color: '#F59E0B',
    rateDiff: -0.60,
    hours: '11:00 - 20:00',
    days: { th: 'ทุกวัน', en: 'Everyday', zh: '每天' },
    note: { th: 'สะดวกสำหรับผู้ที่พักย่านนิมมาน', en: 'Very convenient if staying in Nimman', zh: '住宁曼路附近非常方便' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Currency+Exchange+MAYA+Chiang+Mai'
  },
  {
    id: 'wise',
    name: { th: 'Wise / Revolut', en: 'Wise / Revolut', zh: 'Wise / Revolut' },
    location: { th: 'โอนเงินออนไลน์ / บัตรเดบิต', en: 'Online Transfer / Debit Card', zh: '在线转账 / 借记卡' },
    tag: { th: 'ออนไลน์', en: 'Online', zh: '线上' },
    tagColor: 'bg-cyan-100 text-cyan-700',
    color: '#0891B2',
    rateDiff: -0.20,
    hours: '24 ชั่วโมง',
    days: { th: 'ทุกวัน', en: 'Everyday', zh: '每天' },
    note: { th: 'กด ATM ไทยมีค่าธรรมเนียม 220 บาท/ครั้ง', en: 'Thai ATMs charge 220 THB fee per withdrawal', zh: '泰国ATM机每次取款收取220泰铢手续费' },
    mapUrl: '' // ไม่มีแผนที่สำหรับ Online
  }
];

export default function CurrencyExchangePage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'th';
  
  const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<number | string>(100);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>(BASE_CURRENCY_LIST[0].code);
  
  // State สำหรับควบคุม Modal ผู้ให้บริการ
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/THB');
        const data = await res.json();
        if (data.result === "success") {
          setExchangeRates(data.rates);
        }
      } catch (error) {
        console.error("Error fetching currency:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  // ป้องกันการ Scroll หลังฉากเมื่อเปิด Modal
  useEffect(() => {
    if (selectedProvider) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProvider]);

  const displayList: Currency[] = BASE_CURRENCY_LIST.map(base => {
    const rate = exchangeRates ? exchangeRates[base.code] : null;
    const exchangeRate = rate ? 1 / rate : undefined;
    return {
      ...base,
      name: t.currencies[base.code as keyof typeof t.currencies].name[locale],
      sub: t.currencies[base.code as keyof typeof t.currencies].sub[locale],
      buy: exchangeRate ? exchangeRate * 0.98 : undefined,
      sell: exchangeRate,
      rate: exchangeRate
    };
  });

  const selectedCurrency = displayList.find(c => c.code === selectedCurrencyCode) || displayList[0];

  const calculateReceive = () => {
    if (!amount || isNaN(Number(amount)) || !selectedCurrency.rate) return "0.00";
    const result = Number(amount) * selectedCurrency.rate;
    return result.toLocaleString(locale === 'th' ? 'th-TH' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A2540]" />
        <p className="animate-pulse">{t.loading[locale]}</p>
      </div>
    );
  }

  return (
    <section className={`bg-white min-h-screen pt-32 pb-12 px-6 md:px-12 text-slate-800 ${promptFont.className}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-8">
          <p className="text-slate-500 text-sm mb-2">{t.tagLocation[locale]}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A2540] leading-tight tracking-tight mb-2">
            {t.title[locale]} <br />
            {t.title2[locale]}
          </h1>
        </div>

        <hr className="border-slate-100 border-2 mb-8 rounded-full" />

        {/* --- Calculator --- */}
        <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-8 mb-10 border border-[#F0EBE1] shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            {t.calcTitle[locale]} {selectedCurrency.code}
            <img 
              src={`https://flagcdn.com/w40/${selectedCurrency.iso}.png`} 
              alt={selectedCurrency.code}
              className="w-6 h-4 rounded-sm object-cover shadow-sm border border-black/10"
            />
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-full flex-1">
              <label className="block text-slate-400 text-xs font-medium mb-2">{t.amountLabel[locale]}</label>
              <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#0A2540]/20 transition-all">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 text-slate-800 font-medium outline-none bg-transparent"
                />
                <div className="bg-slate-50 px-4 py-3 border-l border-slate-200 text-slate-600 font-bold flex items-center">
                  {selectedCurrency.code} <span className="ml-2 text-[10px]">▼</span>
                </div>
              </div>
            </div>

            <div className="mt-6 hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-400">
              <ArrowLeftRight className="w-5 h-5" />
            </div>

            <div className="w-full flex-1">
              <label className="block text-slate-400 text-xs font-medium mb-2">{t.receiveLabel[locale]}</label>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm px-4 py-3 text-slate-800 font-medium">
                {calculateReceive()}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-[#F3EFE6] -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-3 rounded-b-2xl text-xs">
            <span className="font-bold text-slate-700">
              1 {selectedCurrency.code} = {selectedCurrency.rate?.toFixed(2)} {t.unitRate[locale]}
            </span>
            <span className="text-slate-400">{t.estRateLabel[locale]}</span>
          </div>
        </div>

        {/* --- Rate Table --- */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-slate-500 text-sm font-bold whitespace-nowrap">{t.tableTitle[locale]}</span>
            <div className="h-px grow bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-12 gap-4 px-2 py-3 text-slate-400 text-xs font-medium mb-2 border-b border-slate-100">
            <div className="col-span-6 md:col-span-5">{t.thCurrency[locale]}</div>
            <div className="col-span-3 text-center">{t.thBuy[locale]}</div>
            <div className="col-span-3 text-center md:text-left">{t.thSell[locale]}</div>
          </div>

          <div className="space-y-1">
            {displayList.map((currency, index) => (
              <div 
                key={index} 
                className="grid grid-cols-12 gap-4 items-center px-2 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w40/${currency.iso}.png`}
                    alt={currency.code}
                    className="rounded-[6px] object-cover w-[36px] h-[24px] shrink-0 border border-black/10 shadow-sm"
                  />
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="font-bold text-lg text-slate-800 w-10">{currency.code}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{currency.name}</span>
                      <span className="text-[10px] text-slate-400">{currency.sub}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-3 text-center text-base md:text-lg font-bold text-slate-800">
                  {currency.buy?.toFixed(2)}
                </div>

                <div className="col-span-3 flex items-center justify-between">
                  <span className="text-base md:text-lg font-bold text-slate-800">
                    {currency.sell?.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => setSelectedCurrencyCode(currency.code)}
                    className={`hidden md:block px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedCurrency.code === currency.code 
                      ? 'bg-slate-800 text-white shadow-md' 
                      : 'border border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {t.btnUse[locale]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* --- Exchange Providers Comparison --- */}
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-slate-500 text-sm font-bold whitespace-nowrap">{t.compareTitle[locale]}</span>
            <div className="h-px grow bg-slate-200"></div>
          </div>

          <div className="space-y-3">
            {PROVIDERS_DATA.map((provider) => (
              <div 
                key={provider.id} 
                onClick={() => setSelectedProvider(provider)}
                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: provider.color }}></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                      {provider.name[locale]}
                    </h4>
                    <p className="text-slate-400 text-[10px] md:text-xs">{provider.location[locale]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`hidden md:block px-3 py-1 rounded-full text-[10px] font-bold ${provider.tagColor}`}>
                    {provider.tag[locale]}
                  </span>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 text-lg">
                      {(Number(selectedCurrency.rate || 0) + provider.rateDiff).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">THB/{selectedCurrency.code}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Information Cards Grid --- */}
        <div className="mt-12 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-slate-500 text-sm font-bold whitespace-nowrap">{t.tipsTitle[locale]}</span>
            <div className="h-px grow bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.tips.map((tip, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="bg-white w-10 h-10 rounded-lg shadow-sm flex items-center justify-center mb-4">
                  {tipIcons[index]}
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{tip.title[locale]}</h4>
                <p 
                  className="text-xs text-slate-500 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: tip.desc[locale].replace('**', '<strong>').replace('**', '</strong>') }} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Disclaimer / Info --- */}
        <div className="mt-10 pb-16 border-t border-slate-100 pt-8">
          <div className="flex items-start gap-3 text-slate-400 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-slate-300" />
            <div className="space-y-1">
              <p className="text-[16px] font-bold text-slate-600">{t.infoTitle[locale]}</p>
              <p className="text-[11px] md:text-[14px] leading-relaxed">
                {t.infoDesc1[locale]}
                <br /><br />
                <span className="font-bold text-slate-500"> {t.infoDesc2[locale]} </span>
                <br />
                {t.updatedAt[locale]}: {new Date().toLocaleDateString(locale === 'th' ? 'th-TH' : locale === 'zh' ? 'zh-CN' : 'en-US')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MODAL PROVIDER (Framer Motion) */}
      {/* ========================================= */}
      <AnimatePresence>
        {selectedProvider && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={() => setSelectedProvider(null)} 
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-8 pb-10 sm:pb-8 shadow-2xl relative flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* ขีดลากด้านบน (UI มือถือ) */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 sm:hidden shrink-0"></div>

              <div className="overflow-y-auto pr-2 pb-4">
                {/* ส่วนหัว ชื่อและสถานที่ */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1 leading-tight">
                    {selectedProvider.name[locale]}
                  </h2>
                  <p className="text-slate-500 text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: selectedProvider.color }}></span>
                    {selectedProvider.location[locale]}
                  </p>
                </div>

                <hr className="border-slate-100 mb-6" />

                {/* ตัวเลขเรทราคาขนาดใหญ่ */}
                <div className="mb-8">
                  <h3 className="text-[4rem] leading-none font-bold text-slate-800 tracking-tight">
                    {(Number(selectedCurrency.rate || 0) + selectedProvider.rateDiff).toFixed(2)}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 font-medium">
                    1 {selectedCurrency.code} = {(Number(selectedCurrency.rate || 0) + selectedProvider.rateDiff).toFixed(2)} {locale === 'en' ? 'THB' : locale === 'zh' ? '泰铢' : 'บาท'} {locale === 'en' ? '(Approx.)' : locale === 'zh' ? '(大约)' : '(โดยประมาณ)'}
                  </p>
                </div>

                {/* ข้อมูลรายละเอียด */}
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                    <span className="text-slate-500 whitespace-nowrap mr-4">{locale === 'en' ? 'Service Hours' : locale === 'zh' ? '营业时间' : 'เวลาทำการ'}</span>
                    <span className="font-bold text-slate-800 text-right">{selectedProvider.hours}</span>
                  </div>
                  <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                    <span className="text-slate-500 whitespace-nowrap mr-4">{locale === 'en' ? 'Service Days' : locale === 'zh' ? '营业日期' : 'วันทำการ'}</span>
                    <span className="font-bold text-slate-800 text-right">{selectedProvider.days[locale]}</span>
                  </div>
                  <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                    <span className="text-slate-500 whitespace-nowrap mr-4">{locale === 'en' ? 'Note' : locale === 'zh' ? '备注' : 'หมายเหตุ'}</span>
                    <span className="font-bold text-red-600 text-right">{selectedProvider.note[locale]}</span>
                  </div>
                </div>
              </div>

              {/* ปุ่ม Action */}
              <div className="space-y-3 mt-auto pt-4 shrink-0 bg-white">
                {selectedProvider.mapUrl ? (
                  <a 
                    href={selectedProvider.mapUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1D1D1D] py-4 font-bold text-white transition-transform hover:bg-black active:scale-[0.98] shadow-lg shadow-black/10"
                  >
                    <MapPin className="h-5 w-5" />
                    {locale === 'en' ? 'Open in Google Maps' : locale === 'zh' ? '在地图中打开' : 'เปิดในแผนที่'}
                  </a>
                ) : (
                  <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-4 font-bold text-slate-400 cursor-not-allowed">
                    <Smartphone className="h-5 w-5" />
                    {locale === 'en' ? 'Online Service Only' : locale === 'zh' ? '仅限在线服务' : 'บริการผ่านช่องทางออนไลน์'}
                  </div>
                )}
                
                <button 
                  onClick={() => setSelectedProvider(null)} 
                  className="flex w-full items-center justify-center rounded-2xl border-2 border-slate-100 py-4 font-bold text-slate-600 transition-colors hover:bg-slate-50 active:scale-[0.98]"
                >
                  {locale === 'en' ? 'Close' : locale === 'zh' ? '关闭' : 'ปิด'}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}