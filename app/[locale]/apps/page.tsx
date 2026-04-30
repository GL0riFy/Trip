'use client';

import React, { useState } from 'react';

// --- Data Structure ---
const categories = [
  { id: 'transport', name: 'บริการเรียกรถ', icon: '🚗', count: 5, color: 'text-orange-500', bgColor: 'bg-orange-100', desc: 'Ride-hailing & Motorbike Services', note: 'ในเชียงใหม่ Grab ครอบคลุมที่สุด ส่วน Maxim และ Bolt ราคาจะถูกกว่า แนะนำให้โหลดไว้เทียบราคาครับ' },
  { id: 'hotel', name: 'จองที่พัก', icon: '🏨', count: 4, color: 'text-blue-500', bgColor: 'bg-blue-100', desc: 'Hotel, Resort & Accommodation Booking', note: 'Agoda มักให้ราคาดีที่สุดสำหรับโรงแรมในไทย ควรเปรียบเทียบกับ Booking.com เสมอ' },
  { id: 'food', name: 'อาหาร นำทาง & แปลภาษา', icon: '🗺️', count: 5, color: 'text-green-500', bgColor: 'bg-green-100', desc: 'Navigation, Food & Translation', note: 'ดาวน์โหลด Google Maps แบบออฟไลน์ของเชียงใหม่ไว้ก่อนเดินทาง ช่วยประหยัดแบตและเน็ตได้เยอะครับ' },
  { id: 'money', name: 'การเงิน & ชำระเงิน', icon: '💳', count: 4, color: 'text-purple-500', bgColor: 'bg-purple-100', desc: 'Currency, Payment & Banking', note: 'ร้านค้าที่เชียงใหม่ส่วนใหญ่ โดยเฉพาะถนนคนเดินหรือตลาดสด รองรับการสแกนจ่าย QR Code (PromptPay)' },
  { id: 'health', name: 'สุขภาพ & ฉุกเฉิน', icon: '⚕️', count: 3, color: 'text-red-500', bgColor: 'bg-red-100', desc: 'Medical, Emergency & Insurance', note: 'เบอร์โทรฉุกเฉิน: 1669 (การแพทย์ฉุกเฉิน), 1155 (ตำรวจท่องเที่ยว)' },
  { id: 'comm', name: 'สื่อสาร & ซิมการ์ด', icon: '📱', count: 4, color: 'text-teal-500', bgColor: 'bg-teal-100', desc: 'Messaging, Internet & eSIM', note: 'คนไทยและร้านค้าส่วนใหญ่ใช้ LINE ในการติดต่อสื่อสารเป็นหลัก' }
];

const appsData = [
  // Transport
  { id: 'grab', category: 'transport', name: 'Grab', featured: true, desc: 'Super app ที่ครบครันที่สุด เรียกแท็กซี่ มอเตอร์ไซค์ สั่งอาหาร ส่งพัสดุ จ่ายเงินในแอปเดียว (ครอบคลุมทั่วเชียงใหม่)', icon: '🟢', tags: ['ใช้ได้ 8 ประเทศ', 'หลายช่องทางชำระเงิน', 'สั่งอาหารได้'], rating: '4.8' },
  { id: 'bolt', category: 'transport', name: 'Bolt', featured: false, desc: 'ราคาประหยัดกว่า Grab เฉลี่ย 10–20% เหมาะสำหรับเส้นทางในเมือง', icon: '⚡', tags: ['ประหยัด', 'ฟรี'], rating: '4.6' },
  { id: 'maxim', category: 'transport', name: 'Maxim', featured: false, desc: 'บริการแท็กซี่และมอเตอร์ไซค์ราคาต่ำสุด นิยมใช้ในเชียงใหม่และต่างจังหวัด', icon: '🔵', tags: ['ราคาถูก', 'ฟรี'], rating: '4.4' },
  { id: 'muvmi', category: 'transport', name: 'MuvMi', featured: false, desc: 'รถตุ๊กตุ๊กไฟฟ้าและมอเตอร์ไซค์ เหมาะเส้นทางสั้น เป็นมิตรกับสิ่งแวดล้อม', icon: '🛵', tags: ['อีโค่', 'ฟรี'], rating: '4.3' },
  { id: '12go', category: 'transport', name: '12Go Asia', featured: false, desc: 'จองตั๋วรถไฟ รถบัส เครื่องบินข้ามจังหวัด/ประเทศ ไว้ใจได้ มีตั๋วส่งทันที', icon: '🚂', tags: ['ระหว่างประเทศ', 'ฟรี'], rating: '4.5' },
  // Hotel
  { id: 'agoda', category: 'hotel', name: 'Agoda', featured: true, desc: 'แพลตฟอร์มจองโรงแรมที่แข็งแกร่งที่สุดในเอเชีย มีที่พักกว่า 2 ล้านแห่งทั่วโลก ราคาดีเป็นพิเศษสำหรับโรงแรมในไทย', icon: '🔴', tags: ['ราคาพิเศษ', 'สะสมแต้มได้', 'ยืนยันทันที'], rating: '4.8' },
  { id: 'booking', category: 'hotel', name: 'Booking.com', featured: false, desc: 'ตัวเลือกที่พักหลากหลายที่สุด โรงแรม รีสอร์ท โฮสเทล ยกเลิกฟรีบางแพ็กเกจ', icon: '🔵', tags: ['ยอดนิยม', 'ฟรี'], rating: '4.7' },
  { id: 'airbnb', category: 'hotel', name: 'Airbnb', featured: false, desc: 'เช่าบ้าน วิลล่า ห้องพักส่วนตัว เหมาะสำหรับครอบครัว หรือกลุ่มเพื่อน', icon: '🏠', tags: ['ครอบครัว', 'ฟรี'], rating: '4.8' },
  { id: 'hostelworld', category: 'hotel', name: 'Hostelworld', featured: false, desc: 'จองโฮสเทลอันดับ 1 เหมาะสำหรับนักเดินทางคนเดียวหรืองบจำกัด', icon: '🛖', tags: ['งบประหยัด', 'ฟรี'], rating: '4.4' },
  // Food & Nav
  { id: 'gmaps', category: 'food', name: 'Google Maps', featured: true, desc: 'แผนที่ที่แม่นยำที่สุด นำทางแบบออฟไลน์ได้เมื่อดาวน์โหลดไว้ล่วงหน้า แสดงสภาพจราจรแบบเรียลไทม์ (จำเป็นมากเวลาขึ้นดอย)', icon: '📍', tags: ['ออฟไลน์ได้', 'จราจรเรียลไทม์', 'รีวิวร้านอาหาร'], rating: '4.8' },
  { id: 'wongnai', category: 'food', name: 'Wongnai', featured: false, desc: 'แหล่งรวมรีวิวร้านอาหารไทยที่ใหญ่ที่สุด มีเมนู ราคา และรีวิวจากคนพื้นที่', icon: '🍜', tags: ['เฉพาะไทย', 'ฟรี'], rating: '4.5' },
  { id: 'foodpanda', category: 'food', name: 'foodpanda', featured: false, desc: 'สั่งอาหารเดลิเวอรี่ ส่งถึงที่พักภายใน 30–45 นาที มีโปรโมชั่นบ่อย', icon: '🐼', tags: ['เดลิเวอรี่', 'ฟรี'], rating: '4.4' },
  { id: 'gtranslate', category: 'food', name: 'Google Translate', featured: false, desc: 'แปลภาษาทันที ถ่ายภาพเมนูหรือป้ายสัญลักษณ์เพื่อแปลได้เลย', icon: '🌐', tags: ['ออฟไลน์', 'ฟรี'], rating: '4.6' },
  { id: 'tripadvisor', category: 'food', name: 'TripAdvisor', featured: false, desc: 'ค้นหาสถานที่ท่องเที่ยว ร้านอาหาร จากรีวิวนักเดินทางทั่วโลก', icon: '✈️', tags: ['วางแผน', 'ฟรี'], rating: '4.5' },
  // Money
  { id: 'wise', category: 'money', name: 'Wise', featured: true, desc: 'โอนเงินระหว่างประเทศเรทกลาง (Mid-market rate) ถอนเงินสดจาก ATM ทั่วโลกได้ฟรีเดือนละ 2 ครั้ง บัตรเดบิตรองรับ 40+ สกุลเงิน', icon: '💚', tags: ['เรทดีที่สุด', 'ถอน ATM ฟรี', '40+ สกุลเงิน'], rating: '4.8' },
  { id: 'xecurrency', category: 'money', name: 'XE Currency', featured: false, desc: 'ตรวจสอบอัตราแลกเปลี่ยนแบบเรียลไทม์ ใช้งานออฟไลน์ได้', icon: '📊', tags: ['ออฟไลน์', 'ฟรี'], rating: '4.7' },
  { id: 'kplus', category: 'money', name: 'K PLUS', featured: false, desc: 'แอปธนาคารกสิกรไทย ใช้สแกน QR PromptPay ได้ทันที ปลอดภัย', icon: '🟩', tags: ['ธนาคารไทย', 'ฟรี'], rating: '4.6' },
  { id: 'splitwise', category: 'money', name: 'Splitwise', featured: false, desc: 'หารค่าใช้จ่ายกับเพื่อนร่วมเดินทางอย่างง่ายดาย คำนวณหนี้อัตโนมัติ', icon: '🧮', tags: ['หารค่าใช้จ่าย', 'ฟรี'], rating: '4.7' },
  // Health
  { id: 'bumrungrad', category: 'health', name: 'Hospital Apps', featured: true, desc: 'โรงพยาบาลเอกชนชั้นนำ นัดหมายแพทย์ออนไลน์ ดูผลตรวจ และโทรปรึกษาแพทย์ผ่านวิดีโอคอล มีแพทย์หลายภาษา', icon: '🏥', tags: ['นัดออนไลน์', 'ดูผลตรวจ', 'ปรึกษาแพทย์'], rating: '4.7' },
  { id: 'mapsme', category: 'health', name: 'maps.me', featured: false, desc: 'แผนที่ออฟไลน์ 100% สำรองไว้หาก Google Maps ใช้งานไม่ได้บนดอย', icon: '🗺️', tags: ['ออฟไลน์', 'ฟรี'], rating: '4.5' },
  { id: 'isos', category: 'health', name: 'iSOS / AXA', featured: false, desc: 'แอปประกันเดินทาง ใช้แจ้งเคลมหรือขอความช่วยเหลือฉุกเฉิน 24 ชม.', icon: '🛡️', tags: ['ประกัน', 'ฟรี'], rating: '4.3' },
  // Comm
  { id: 'line', category: 'comm', name: 'LINE', featured: true, desc: 'แอปแชทที่คนไทยใช้มากที่สุด ร้านค้า โรงแรม และบริการในเชียงใหม่สื่อสารผ่าน LINE เป็นหลัก (แนะนำให้โหลด)', icon: '💬', tags: ['แชทฟรี', 'สั่งอาหารได้', 'ชำระเงิน'], rating: '4.8' },
  { id: 'whatsapp', category: 'comm', name: 'WhatsApp', featured: false, desc: 'แชทและโทรฟรีผ่านเน็ต เหมาะสำหรับติดต่อเพื่อนต่างชาติ', icon: '📗', tags: ['ยอดนิยม', 'ฟรี'], rating: '4.7' },
  { id: 'airalo', category: 'comm', name: 'Airalo (eSIM)', featured: false, desc: 'ซื้อ eSIM ออนไลน์ก่อนเดินทาง ไม่ต้องเปลี่ยนซิม เชื่อมต่อได้ทันที', icon: '📡', tags: ['eSIM', 'ฟรี'], rating: '4.6' },
  { id: 'protonvpn', category: 'comm', name: 'ProtonVPN', featured: false, desc: 'VPN ฟรี ป้องกันข้อมูลส่วนตัวเมื่อใช้ Wi-Fi โรงแรม หรือร้านกาแฟ', icon: '🔒', tags: ['ความปลอดภัย', 'ฟรี'], rating: '4.6' }
];

export default function TravelGuide() {
  const [activeSection, setActiveSection] = useState('transport');
  const [selectedApp, setSelectedApp] = useState<any>(null); // State สำหรับ Modal

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
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> พร้อมให้บริการ
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#1a2b4c] leading-tight mb-4">
              แอปพลิเคชัน<br />ที่ต้องมีเมื่อมาเที่ยว<span className="text-blue-600">เชียงใหม่</span>
            </h1>
            <p className="text-gray-500 max-w-xl text-sm md:text-base">
              ที่เรารวบรวมแอปเหล่านี้ให้ ก็เพื่ออำนวยความสะดวกให้คุณตลอดการเดินทาง ทั้งเรื่องการเดินทาง อาหาร และที่พัก ครอบคลุมทุกความต้องการ 
            </p>
          </div>
          <div className="flex gap-4 md:flex-col items-end">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform cursor-default">
              อัปเดตใหม่ 2025 ✓
            </span>
          </div>
        </div>
      </div>

      {/* --- STATS ROW --- */}
      <div className="bg-white border-b border-gray-200 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 text-center py-6">
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">25 <span className="text-sm text-gray-500 font-normal">แอปพลิเคชัน</span></div>
            <div className="text-xs text-gray-400 mt-1">คัดสรรอย่างดี</div>
          </div>
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">6 <span className="text-sm text-gray-500 font-normal">หมวดหมู่</span></div>
            <div className="text-xs text-gray-400 mt-1">ครอบคลุมทุกการเดินทาง</div>
          </div>
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">ฟรี <span className="text-sm text-gray-500 font-normal">ส่วนใหญ่</span></div>
            <div className="text-xs text-gray-400 mt-1">ดาวน์โหลดได้เลย</div>
          </div>
          <div className="px-4">
            <div className="text-2xl font-bold text-gray-900">iOS/Android</div>
            <div className="text-xs text-gray-400 mt-1">รองรับทุกระบบ</div>
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR */}
        <div className="lg:w-1/4 flex-shrink-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="sticky top-10">
            <h3 className="text-sm font-bold text-gray-400 mb-4 tracking-wider uppercase">หมวดหมู่</h3>
            <ul className="space-y-1 mb-8">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a 
                    href={`#${cat.id}`}
                    onClick={() => setActiveSection(cat.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === cat.id 
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                      : 'text-gray-600 hover:bg-gray-100 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${cat.bgColor.replace('bg-', 'bg-').replace('100', '500')}`}></span>
                      {cat.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Tip Box */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-2">
                💡 ทริคแนะนำ
              </div>
              <p className="text-xs text-green-800 leading-relaxed">
                โหลดแอปแผนที่ออฟไลน์ของเชียงใหม่ไว้เลยครับ เวลาขึ้นดอยอินทนนท์ หรือม่อนแจ่ม สัญญาณเน็ตอาจจะหายได้
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-2">
                ⚠️ ระวัง
              </div>
              <p className="text-xs text-orange-800 leading-relaxed">
                หลีกเลี่ยงการดาวน์โหลดแอปจากลิงก์แปลกๆ นะครับ โหลดผ่าน App Store / Google Play เท่านั้นเพื่อความปลอดภัย
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

            // คำนวณ delay ให้ไล่เรียงลงมาทีละ section
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
                    {cat.count} แอป
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
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl border border-gray-100 flex-shrink-0">
                      {featuredApp.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{featuredApp.name} <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded ml-2">แนะนำ</span></h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{featuredApp.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {featuredApp.tags.map(tag => (
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
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl border border-gray-100 transition-transform hover:scale-110">
                          {app.icon}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">★ {app.rating}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{app.name}</h3>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded inline-block mb-3 w-fit">iOS & Android</span>
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
                {selectedApp.icon}
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
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">รายละเอียด</h4>
              <p className="text-gray-600 leading-relaxed mb-8">
                {selectedApp.desc}
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Apple App Store Button */}
                <a 
                  href="#" 
                  className="flex-1 flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white rounded-xl py-3 px-4 transition-transform hover:scale-105 active:scale-95"
                  target="_blank" rel="noreferrer"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.92 3.78 2.29-2.21 1.38-1.87 4.7 1.04 5.91-.72 1.83-1.61 3.51-3.47 4.81zm-3.36-13.6c-.13-1.89 1.35-3.67 3.32-3.87.27 2.06-1.57 3.86-3.32 3.87z"/></svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold text-gray-300 tracking-wider">Download on the</div>
                    <div className="text-sm font-bold -mt-0.5">App Store</div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a 
                  href="#" 
                  className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-xl py-3 px-4 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                  target="_blank" rel="noreferrer"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4caf50" d="M3.6 3.6c-.4.4-.6.9-.6 1.6v13.6c0 .7.2 1.2.6 1.6l.1.1 7.7-7.7v-.4L3.7 3.5l-.1.1z"/><path fill="#ffeb3b" d="M15.4 15.4l-4-4v-.4l4-4 .1.1 4.7 2.7c1.3.7 1.3 1.9 0 2.7l-4.7 2.7-.1.1z"/><path fill="#f44336" d="M3.7 3.5L11.4 11l4-4L6.4 2.1C5.1 1.4 4 2.1 3.7 3.5z"/><path fill="#2196f3" d="M3.7 20.5c.3 1.4 1.4 2.1 2.7 1.4l9-5.1-4-4-7.7 7.7z"/></svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">GET IT ON</div>
                    <div className="text-sm font-bold -mt-0.5">Google Play</div>
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