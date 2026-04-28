'use client'

// 1. นำเข้า AnimatePresence เพิ่มเติมจาก framer-motion
import { useState, useEffect } from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { Kanit, Anuphan } from 'next/font/google'

// Icons
import { 
  Siren, 
  Smartphone, 
  Coins,
  Sun
} from "lucide-react"

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

const anuphan = Anuphan({
  subsets: ['thai', 'latin'],
  weight: ['400', '600', '700'],
  display: 'swap'
})

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
}

const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeInOut' }
  }
}

// --- เพิ่มรายการรูปภาพสำหรับ Slideshow ---
// เปลี่ยน path รูปให้ตรงกับในโฟลเดอร์ public ของคุณได้เลยครับ
const heroImages = [
  "/slide2/img1.jpg", 
  "/slide2/img2.jpg",
  "/slide2/img3.jpg",
  "/slide2/img4.png"
]

export default function ChiangMaiTravelGuide() {
  const t = useTranslations('essentials')

  // --- State สำหรับ Slideshow ---
  const [currentSlide, setCurrentSlide] = useState(0)

  // --- State สำหรับ Weather API ---
  const [weather, setWeather] = useState({
    temp: 34,
    feelslike: 39,
    humidity: 72,
    wind: 12,
    uv: 9,
    vis: 5,
    isLoaded: false
  })

  // --- useEffect สำหรับเลื่อนสไลด์อัตโนมัติ (ทุกๆ 5 วินาที) ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [])

  // --- useEffect สำหรับเรียก API สภาพอากาศ ---
  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        if (data && data.current) {
          setWeather({
            temp: Math.round(data.current.temp_c),
            feelslike: Math.round(data.current.feelslike_c),
            humidity: data.current.humidity,
            wind: Math.round(data.current.wind_kph),
            uv: data.current.uv,
            vis: data.current.vis_km,
            isLoaded: true
          });
        }
      })
      .catch(err => console.error("Weather fetch error:", err));
  }, []);

  const essentials = [
    {
      id: 1, num: "01",
      subtitle: t('emergency.subtitle'), title: t('emergency.title'), desc: t('emergency.desc'),
      icon: <Siren size={36} strokeWidth={2} />, href: "/emergency",
      iconColor: "text-orange-500", titleColor: "text-orange-500", btnColor: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    },
    {
      id: 2, num: "02",
      subtitle: t('currency.subtitle'), title: t('currency.title'), desc: t('currency.desc'),
      icon: <Coins size={36} strokeWidth={2} />, href: "/currency",
      iconColor: "text-green-500", titleColor: "text-green-600", btnColor: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    },
    {
      id: 3, num: "03",
      subtitle: t('apps.subtitle'), title: t('apps.title'), desc: t('apps.desc'),
      icon: <Smartphone size={36} strokeWidth={2} />, href: "/apps",
      iconColor: "text-blue-500", titleColor: "text-blue-600", btnColor: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    }
  ]

  const travelTips = [
    { num: "01", title: t('Tips.items.tip1.title'), desc: t('Tips.items.tip1.desc') },
    { num: "02", title: t('Tips.items.tip2.title'), desc: t('Tips.items.tip2.desc') },
    { num: "03", title: t('Tips.items.tip3.title'), desc: t('Tips.items.tip3.desc') },
    { num: "04", title: t('Tips.items.tip4.title'), desc: t('Tips.items.tip4.desc') },
    { num: "05", title: t('Tips.items.tip5.title'), desc: t('Tips.items.tip5.desc') },
    { num: "06", title: t('Tips.items.tip6.title'), desc: t('Tips.items.tip6.desc') }
  ]

  return (
    <div className={`${kanit.className} bg-[#f5f6f4] min-h-screen text-slate-800 pb-20`}>
      
      {/* 1. Hero Section (Slideshow) */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
        
        {/* AnimatePresence ช่วยจัดการตอนรูปเก่าหายไปและรูปใหม่โผล่มา */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div 
              key={currentSlide}
              // Effect: เริ่มต้นใหญ่ขึ้นนิดนึงและโปร่งใส -> ชัดเจนและขนาดปกติ -> จางหายไป
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={heroImages[currentSlide]} 
                alt="Chiang Mai Travel Slide"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 z-0 bg-black/45" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 text-white mt-10 w-full px-4"
        >
          {/* ปรับขนาดข้อความแบบ Responsive: จอเล็ก text-4xl -> จอกลาง text-6xl -> จอใหญ่ text-8xl */}
          <motion.h1 
            variants={heroTextVariants}
            className={`${anuphan.className} text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 drop-shadow-2xl leading-[1.1] sm:leading-[1.15] tracking-[-0.02em] sm:tracking-[-0.05em] text-white`}
            style={{ fontWeight: 800 }}
          >
            {t('Hero.title')} <br/> 
            <span className="text-white/95">{t('Hero.subtitle')}</span>
          </motion.h1>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%", maxWidth: "700px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-[2px] bg-orange-500 mx-auto mb-6"
          />

          {/* ปรับขนาดเนื้อหาแบบ Responsive: จอเล็ก text-sm -> จอใหญ่ text-xl */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md max-w-xs sm:max-w-xl mx-auto font-light"
          >
            {t('Hero.desc')}
          </motion.p>
        </motion.div>

        {/* จุดนำทางสไลด์ (Slide Indicators) */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                currentSlide === index ? 'w-8 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        {/*<motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>*/}
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        
        {/* 2. Section: 3 บริการหลัก */}
        <div className="mb-8 pl-2 mt-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold flex items-center gap-2 mb-2"
          >
            <span className="text-orange-500 text-5xl">3</span> 
            {t('Services.heading')}
          </motion.h2>
          <p className="text-gray-500 text-sm md:text-base">
            {t('Services.subheading')}
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {essentials.map((item) => (
            <Link href={item.href} key={item.id} className="block w-full h-full group">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 flex flex-col transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`${item.iconColor}`}>
                    {item.icon}
                  </div>
                  <span className="text-gray-300 font-medium text-lg">
                    {item.num}
                  </span>
                </div>

                <div className="flex-grow">
                  <p className={`${item.titleColor} font-semibold text-sm mb-1`}>
                    {item.subtitle}
                  </p>
                  <h3 className={`${item.titleColor} text-2xl font-bold mb-4`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <span className={`inline-block px-5 py-2 rounded-full text-sm font-semibold transition-colors ${item.btnColor}`}>
                    {t('Services.viewDetails')} {"->"}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* 3. Section: Weather Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-r from-[#2b467a] to-[#386edb] rounded-[2rem] p-8 text-white shadow-xl shadow-blue-900/20 mb-12 flex flex-col md:flex-row items-center justify-between transition-opacity duration-500"
          style={{ opacity: weather.isLoaded ? 1 : 0.8 }} 
        >
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <Sun size={72} className="text-yellow-400 fill-yellow-400 drop-shadow-md" />
            <div>
              <h2 className="text-5xl font-bold mb-1">{weather.temp}°C</h2>
              <p className="font-semibold text-lg mb-1">{t('Weather.status')}</p>
              <p className="text-sm text-blue-200">
                {t('Weather.feelsLike').replace('39°C', `${weather.feelslike}°C`)}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-10 text-center">
            {[
              `${weather.humidity}%`, 
              `${weather.wind} km/h`, 
              `UV ${weather.uv}`, 
              `${weather.vis} km`
            ].map((val, i) => {
              const labels = [t('Weather.humidity'), t('Weather.wind'), t('Weather.uv'), t('Weather.visibility')];
              return (
                <div key={i}>
                  <p className="font-bold text-2xl mb-1">{val}</p>
                  <p className="text-sm text-blue-200">{labels[i]}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 4. Section: Travel Tips */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-2">
            {t('Tips.heading')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {travelTips.map((tip, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 hover:bg-white rounded-2xl p-5 md:p-6 flex gap-5 items-start border border-gray-200/50 transition-all shadow-sm hover:shadow-md"
              >
                <span className="text-3xl font-bold text-gray-300 shrink-0">
                  {tip.num}
                </span>
                <div>
                  <h3 className="font-bold text-gray-700 text-lg mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}