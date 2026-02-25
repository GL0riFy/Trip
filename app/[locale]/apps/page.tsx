'use client'

import { motion } from "framer-motion"
import { Kanit } from 'next/font/google'
import Image from "next/image"
import { useLocale } from "next-intl"

// ✅ Import ข้อมูลดิบเข้ามา (ตอนนี้ export แล้ว จะไม่มี error)
import { appCategories } from "@/src/data/essentials"

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function AppsPage() {
  const locale = useLocale()

  // ✅ Logic ภาษา
  const isEn = locale === 'en';

  return (
    <div className={`${kanit.className} min-h-screen text-white pb-20`}>
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto mt-20 px-6">
        
        {/* Header Section */}
        <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-white to-white/60">
                {isEn ? 'Essential Apps' : '必备应用'}
            </h1>
            <p className="text-white/60 text-lg font-light">
                {isEn 
                 ? 'Applications you should have on your phone for a smooth trip.' 
                 : '为了您的顺利出行，建议手机上安装这些应用。'}
            </p>
        </div>

        {/* Categories Grid */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {/* ✅ Map ข้อมูลดิบ และเลือกภาษาข้างในนี้ */}
            {appCategories.map((category, idx) => {
                // Logic เลือกภาษาของ Category Title
                const catTitle = isEn ? category.title : category.titleCn;

                return (
                    <div key={idx} className="relative">
                        
                        {/* Category Title */}
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                {category.icon}
                            </div>
                            <h2 className="text-2xl font-semibold tracking-wide text-white/90">
                                {catTitle}
                            </h2>
                        </div>

                        {/* Apps Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {category.apps.map((app, appIdx) => {
                                // Logic เลือกภาษาของ App
                                const appName = isEn ? app.name : (app.nameCn || app.name);
                                const appDesc = isEn ? app.desc : (app.descCn || app.desc);
                                const appTag = isEn ? app.tag : (app.tagCn || app.tag);

                                return (
                                    <motion.div
                                        key={appIdx}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 overflow-hidden"
                                    >
                                        <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-lg bg-white/5">
                                            <Image 
                                                src={app.logo} 
                                                alt={appName}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-lg truncate pr-2 text-white">{appName}</h3>
                                                {appTag && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                                                        {appTag}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-white/50 leading-snug group-hover:text-white/70 transition-colors line-clamp-2">
                                                {appDesc}
                                            </p>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:bg-white/10 transition-all pointer-events-none" />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </motion.div>

        {/* Tips Footer */}
        <div className="mt-20 p-6 rounded-2xl bg-linear-to-r from-blue-900/20 to-purple-900/20 border border-white/10 text-center">
            <p className="text-white/70 text-sm">
                💡 <span className="font-semibold text-white">{isEn ? 'Pro Tip:' : '小贴士:'}</span> 
                {isEn 
                 ? ' Download and register these apps before you arrive.' 
                 : ' 建议在抵达前下载并注册这些应用。'}
            </p>
        </div>

      </div>
    </div>
  )
}