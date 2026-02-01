'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Kanit } from 'next/font/google'
import { useTranslations } from "next-intl"

import { 
  Siren, 
  Smartphone, 
  Coins,
} from "lucide-react"

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

const essentials = [
  {
    id: 1,
    key: "emergency",
    icon: <Siren size={40} />,
    href: "/emergency",
    overlayColor: "from-red-900/80 via-rose-800/60 to-red-500/30",
    accentColor: "bg-red-500",
    shadowColor: "shadow-red-500/40", 
  },
  {
    id: 2,
    key: "currency",
    icon: <Coins size={40} />,
    href: "/currency",
    overlayColor: "from-amber-900/80 via-orange-800/60 to-amber-500/30",
    
    // กำหนด Class เต็มๆ ที่นี่
    accentColor: "bg-yellow-500",
    shadowColor: "shadow-amber-500/40",
  },
  {
    id: 3,
    key: "apps",
    icon: <Smartphone size={40} />,
    href: "/apps",
    overlayColor: "from-blue-900/80 via-indigo-800/60 to-blue-500/30",
    accentColor: "bg-sky-500", 
    shadowColor: "shadow-sky-500/40",
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    } 
  }
}


export default function ChiangMaiEssentialsModern() {
  const t = useTranslations("essentials")

  return (
    // เปลี่ยน Background หลักให้ดู Dark & Modern ขึ้น
    <div className={`${kanit.className} flex flex-col items-center py-20 px-4 relative text-white`}>
      
      {/* Ambient Background Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 opacity-50" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] -z-10 opacity-40" />

      {/* Main Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl"
      >
        {essentials.map((item) => (
          <Link href={item.href} key={item.id} className="block w-full h-full group perspective">
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >


              {/* 4. Glass Content Card */}
              <div className="relative z-20 w-full p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                 {/* Icon with Accent Glow */}
                 <div className={`mb-4 p-3 rounded-2xl inline-block ${item.accentColor} shadow-lg shadow-${item.accentColor.replace('bg-', '')}/40`}>
                    {item.icon}
                 </div>

                 <h2 className="text-3xl font-bold mb-1 tracking-wide text-white">
                    {t(`${item.key}.title`)}
                  </h2>
                  <p className="text-white/60 font-medium tracking-wider text-sm uppercase mb-4">
                    {t(`${item.key}.subtitle`)}
                  </p>
                  
                  <div className="h-px w-full bg-white/10 mb-4"></div>

                  <p className="text-white/80 text-sm font-light leading-relaxed">
                   {t(`${item.key}.desc`)}
                  </p>
              </div>
              
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}