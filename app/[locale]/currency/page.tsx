'use client';

import React, { useState, useEffect } from 'react';
import { Prompt } from 'next/font/google';
import { useParams } from 'next/navigation';
import { ArrowLeftRight, Loader2, Trophy, Landmark, CreditCard, AlertTriangle, Smartphone, Info } from 'lucide-react';
import { t, BASE_CURRENCY_LIST, type Locale, type Currency } from '@/src/data/essentials'; // เปลี่ยน path ให้ตรงกับโปรเจกต์คุณ

const promptFont = Prompt({ subsets: ['latin', 'thai'], weight: ['300', '400', '500', '600', '700'] });

// ไอคอนสำหรับ Card คำแนะนำ
const tipIcons = [
  <Trophy key="icon1" className="w-6 h-6 text-yellow-500" />,
  <CreditCard key="icon2" className="w-6 h-6 text-blue-500" />,
  <Smartphone key="icon3" className="w-6 h-6 text-indigo-500" />,
  <AlertTriangle key="icon4" className="w-6 h-6 text-orange-500" />
];

export default function CurrencyExchangePage() {
  
  const params = useParams();
  const locale = (params?.locale as Locale) || 'th';
  // 1. เก็บแค่ข้อมูล "เรทเงินดิบๆ" ที่ดึงมาจาก API เท่านั้น
  const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [amount, setAmount] = useState<number | string>(100);
  
  // 2. เก็บแค่ "รหัสสกุลเงิน" ที่ถูกเลือก แทนการเก็บ Object ทั้งก้อน
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>(BASE_CURRENCY_LIST[0].code);

  // ดึงข้อมูล API แค่ครั้งเดียวตอนโหลดหน้า
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

  // 3. Derived State: ประกอบข้อมูลเรทเงินเข้ากับ "คำแปลตามภาษา" สดๆ ทุกครั้งที่ Render
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

  // 4. ค้นหา Currency Object ตัวเต็มจากรหัสที่เลือกไว้
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
    <section className={`bg-white min-h-screen py-12 px-6 md:px-12 text-slate-800 ${promptFont.className}`}>
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
                    onClick={() => setSelectedCurrencyCode(currency.code)} // เปลี่ยนมาเซฟแค่รหัส String
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
            {t.providers.map((provider, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: provider.color }}></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base">{provider.name[locale]}</h4>
                    <p className="text-slate-400 text-[10px] md:text-xs">{provider.location[locale]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`hidden md:block px-2 py-0.5 rounded text-[10px] font-bold ${provider.tagColor}`}>
                    {provider.tag[locale]}
                  </span>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">
                      {(Number(selectedCurrency.rate || 0) + provider.rateDiff).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400">{t.unitRate[locale]}/{selectedCurrency.code}</div>
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
    </section>
  );
}