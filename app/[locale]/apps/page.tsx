'use client';

import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ESSENTIAL_APPS, type Locale } from '@/src/data/essentials';

// --- Base Data Structure (ข้อมูลที่ไม่ต้องแปลภาษา) ---
const BASE_CATEGORIES = [
  { id: 'transport', icon: '🚗', count: 5, color: 'text-orange-500', bgColor: 'bg-orange-100' },
  { id: 'hotel', icon: '🏨', count: 4, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { id: 'food', icon: '🗺️', count: 5, color: 'text-green-500', bgColor: 'bg-green-100' },
  { id: 'money', icon: '💳', count: 4, color: 'text-purple-500', bgColor: 'bg-purple-100' },
  { id: 'health', icon: '⚕️', count: 3, color: 'text-red-500', bgColor: 'bg-red-100' },
  { id: 'comm', icon: '📱', count: 4, color: 'text-teal-500', bgColor: 'bg-teal-100' }
];

export default function TravelGuide() {
  const t = useTranslations('TravelApps'); // เรียกใช้ next-intl สำหรับหมวด TravelApps
  const locale = useLocale() as Locale;

  const [activeSection, setActiveSection] = useState('transport');
  const [selectedApp, setSelectedApp] = useState<any>(null); // State สำหรับ Modal

  useEffect(() => {
    const sectionIds = BASE_CATEGORIES.map((cat) => cat.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSectionByScroll = () => {
      const offset = 140;
      let currentSection = sectionIds[0];

      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= offset && bottom >= offset) {
          currentSection = section.id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSectionByScroll();
    window.addEventListener('scroll', updateActiveSectionByScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSectionByScroll);
    };
  }, []);

  // ประกอบข้อมูลเข้ากับคำแปลภาษา
  const categories = BASE_CATEGORIES.map(cat => ({
    ...cat,
    name: t(`Categories.${cat.id}.name`),
    desc: t(`Categories.${cat.id}.desc`),
    note: t(`Categories.${cat.id}.note`),
  }));

  const appsData = ESSENTIAL_APPS.map(app => ({
    ...app,
    desc: app.desc[locale],
    tags: app.tags.map((tag) => tag[locale]),
  }));

  // Helper สำหรับแยกตัวหนังสือหนา/บางในแถบ Stats
  const renderStatMain = (text: string) => {
    const spaceIdx = text.indexOf(' ');
    if (spaceIdx === -1) return <>{text}</>;
    return (
      <>
        {text.substring(0, spaceIdx)}{' '}
        <span className="text-sm text-gray-500 font-normal">{text.substring(spaceIdx + 1)}</span>
      </>
    );
  };

  const renderAppIcon = (app: { name: string; image: string }, sizeClass: string, fallbackTextClass: string) => {
    if (app.image) {
      return <img src={app.image} alt={`${app.name} logo`} className={`${sizeClass} object-contain`} />;
    }

    return (
      <span className={`${fallbackTextClass} font-bold text-gray-500`}>
        {app.name.slice(0, 2).toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-800 pt-24">

      {/* --- INLINE CSS FOR ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes modalPop {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fade-up {
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
          .animate-modal-pop {
            animation: modalPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `
      }} />

      {/* --- HERO SECTION --- */}
      <div className="bg-white border-b border-gray-200 py-10 px-6 md:px-12 lg:px-24 animate-fade-up">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-blue-800 bg-blue-50 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {t('Hero.status')}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#1a2b4c] leading-tight mb-4">
              {t('Hero.titleMain')}<br /><span className="text-blue-600">{t('Hero.titleHighlight')}</span>
            </h1>
            <p className="text-gray-500 max-w-xl text-sm md:text-base">
              {t('Hero.description')}
            </p>
          </div>
          <div className="flex gap-4 md:flex-col items-end">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform cursor-default">
              {t('Hero.badge')}
            </span>
          </div>
        </div>
      </div>

      {/* --- STATS ROW --- */}
      <div className="bg-white border-b border-gray-200 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 text-center py-6">
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">{renderStatMain(t('Stats.apps'))}</div>
            <div className="text-xs text-gray-400 mt-1">{t('Stats.appsSub')}</div>
          </div>
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">{renderStatMain(t('Stats.categories'))}</div>
            <div className="text-xs text-gray-400 mt-1">{t('Stats.catSub')}</div>
          </div>
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">{renderStatMain(t('Stats.free'))}</div>
            <div className="text-xs text-gray-400 mt-1">{t('Stats.freeSub')}</div>
          </div>
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">{t('Stats.platforms')}</div>
            <div className="text-xs text-gray-400 mt-1">{t('Stats.platSub')}</div>
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col lg:flex-row gap-10">

        {/* SIDEBAR */}
        <div className="lg:w-1/4 flex-shrink-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="sticky top-10">
            <h3 className="text-sm font-bold text-gray-400 mb-4 tracking-wider uppercase">{t('Sidebar.title')}</h3>
            <ul className="space-y-1 mb-8">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    onClick={() => setActiveSection(cat.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === cat.id
                        ? 'bg-white shadow-sm text-orange-600 ring-1 ring-black/5'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      {/* ส่วนที่เพิ่ม: ไอคอนพร้อมพื้นหลังวงกลม */}
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-base ${cat.bgColor}`}>
                        {cat.icon}
                      </span>
                      {cat.name}
                    </span>

                    {/* แสดงจุดสีส้มเฉพาะเมนูที่ Active (เลียนแบบในรูป) */}
                    {activeSection === cat.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Tip Box */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-2">
                {t('Sidebar.tipTitle')}
              </div>
              <p className="text-xs text-green-800 leading-relaxed">
                {t('Sidebar.tipDesc')}
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-2">
                {t('Sidebar.warnTitle')}
              </div>
              <p className="text-xs text-orange-800 leading-relaxed">
                {t('Sidebar.warnDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:w-3/4 space-y-16">
          {categories.map((cat, index) => {
            const sectionApps = appsData.filter(app => app.category === cat.id);
            const featuredApp = sectionApps.find(app => app.featured);
            const standardApps = sectionApps.filter(app => !app.featured);

            const sectionDelay = 400 + (index * 150);

            return (
              <section id={cat.id} key={cat.id} className="scroll-mt-10 animate-fade-up" style={{ animationDelay: `${sectionDelay}ms` }}>
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${cat.bgColor}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>
                      <p className="text-sm text-gray-500">{cat.desc}</p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                    {t('UI.appCount', { count: cat.count })}
                  </span>
                </div>

                {/* Info Note */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3 text-sm text-blue-800">
                  <span className="text-blue-500 mt-0.5">ℹ️</span>
                  <p>{cat.note}</p>
                </div>

                {/* Featured App */}
                {featuredApp && (
                  <div
                    onClick={() => setSelectedApp(featuredApp)}
                    className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col md:flex-row gap-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl border border-gray-100 flex-shrink-0">
                      {renderAppIcon(featuredApp, 'w-10 h-10', 'text-lg')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{featuredApp.name} <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded ml-2">{t('UI.recommended')}</span></h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{featuredApp.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {featuredApp.tags.map((tag: string) => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid Apps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {standardApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl border border-gray-100 transition-transform hover:scale-110">
                          {renderAppIcon(app, 'w-8 h-8', 'text-sm')}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">★ {app.rating}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{app.name}</h3>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded inline-block mb-3 w-fit">{t('UI.platforms')}</span>
                      <p className="text-xs text-gray-500 mb-4 flex-1 line-clamp-3">{app.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* --- MODAL (POP-UP) --- */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div
            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors z-10"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="bg-gray-50 p-8 text-center border-b border-gray-100 relative">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white flex items-center justify-center text-5xl border border-gray-200 shadow-sm mb-4">
                {renderAppIcon(selectedApp, 'w-14 h-14', 'text-xl')}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedApp.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm font-medium text-gray-500">{selectedApp.rating}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {selectedApp.tags.map((tag: string) => (
                  <span key={tag} className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{t('UI.details')}</h4>
              <p className="text-gray-600 leading-relaxed mb-8">
                {selectedApp.desc}
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Apple App Store Button */}
                <a
                  href={selectedApp.appStoreUrl || '#'}
                  onClick={(e) => {
                    if (!selectedApp.appStoreUrl) e.preventDefault();
                  }}
                  className={`flex-1 flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition-transform ${selectedApp.appStoreUrl
                      ? 'bg-black hover:bg-gray-900 text-white hover:scale-105 active:scale-95'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                    }`}
                  target="_blank" rel="noreferrer"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.92 3.78 2.29-2.21 1.38-1.87 4.7 1.04 5.91-.72 1.83-1.61 3.51-3.47 4.81zm-3.36-13.6c-.13-1.89 1.35-3.67 3.32-3.87.27 2.06-1.57 3.86-3.32 3.87z" /></svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold text-gray-300 tracking-wider">{t('UI.downloadAppStore')}</div>
                    <div className="text-sm font-bold -mt-0.5">{t('UI.appStore')}</div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href={selectedApp.playStoreUrl || '#'}
                  onClick={(e) => {
                    if (!selectedApp.playStoreUrl) e.preventDefault();
                  }}
                  className={`flex-1 flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition-transform shadow-sm ${selectedApp.playStoreUrl
                      ? 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 hover:scale-105 active:scale-95'
                      : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                  target="_blank" rel="noreferrer"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4caf50" d="M3.6 3.6c-.4.4-.6.9-.6 1.6v13.6c0 .7.2 1.2.6 1.6l.1.1 7.7-7.7v-.4L3.7 3.5l-.1.1z" /><path fill="#ffeb3b" d="M15.4 15.4l-4-4v-.4l4-4 .1.1 4.7 2.7c1.3.7 1.3 1.9 0 2.7l-4.7 2.7-.1.1z" /><path fill="#f44336" d="M3.7 3.5L11.4 11l4-4L6.4 2.1C5.1 1.4 4 2.1 3.7 3.5z" /><path fill="#2196f3" d="M3.7 20.5c.3 1.4 1.4 2.1 2.7 1.4l9-5.1-4-4-7.7 7.7z" /></svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">{t('UI.getGooglePlay')}</div>
                    <div className="text-sm font-bold -mt-0.5">{t('UI.googlePlay')}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}