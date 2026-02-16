'use client'

import { motion } from "framer-motion"
import { Kanit } from 'next/font/google'
import { 
  Landmark,       // Banks
  Store,          // Dept Store
  Smartphone,     // Online Apps
  Calculator,     // Converter
  Banknote,       // Money
  MapPin,         // Location
  Wallet,
  ArrowRightLeft
} from "lucide-react"
import { useLocale } from "next-intl"
import { useState } from "react"

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function MoneyPage() {
  const locale = useLocale()
  const isEn = locale === 'en'
  
  // State สำหรับ Calculator
  const [amount, setAmount] = useState<string>("100")
  const [currency, setCurrency] = useState("USD")
  const rates: Record<string, number> = { USD: 34.5, CNY: 4.8, EUR: 37.2, JPY: 0.23 }
  const converted = (parseFloat(amount || "0") * rates[currency]).toLocaleString(undefined, { maximumFractionDigits: 0 })

  return (
    <div className={`${kanit.className} min-h-screen text-white pb-24 relative overflow-hidden`}>
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto mt-20 px-6">
        
        {/* Header */}
        <div className="mb-8">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-4"
            >
                <Banknote size={16} />
                {isEn ? "Chiang Mai Money Guide" : "清迈货币指南"}
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-emerald-200">
                {isEn ? "Currency Exchange" : "货币兑换服务"}
            </h1>
        </div>

        {/* --- CALCULATOR SECTION (Moved to TOP) --- */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400 shadow-lg shadow-emerald-500/10">
                        <Calculator size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {isEn ? "Currency Estimator" : "汇率估算器"}
                        </h2>
                        <p className="text-white/50 text-sm">
                            {isEn ? "Check approximate rates before you go." : "出发前检查大致汇率。"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                     {/* Input Group */}
                    <div className="flex items-center bg-black/30 rounded-xl p-2 border border-white/10 w-full sm:w-auto">
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent w-24 pl-3 font-bold text-2xl text-white focus:outline-none"
                        />
                        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)}
                            className="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer pr-2"
                        >
                            <option value="USD">USD</option>
                            <option value="CNY">CNY</option>
                            <option value="EUR">EUR</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </div>

                    <div className="hidden sm:block text-white/20">
                        <ArrowRightLeft size={20} />
                    </div>

                    {/* Output Group */}
                    <div className="flex items-center justify-between gap-4 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-xl w-full sm:w-auto min-w-[180px]">
                        <span className="text-sm font-bold text-emerald-400/60">THB</span>
                        <span className="text-2xl font-bold text-emerald-100">{converted}</span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Main Grid Layout */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >

            {/* --- ROW 1 --- */}

            {/* 1. Best Rates (SuperRich) - (Span 8 cols) */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-8 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
                <div className="relative h-full bg-white/5 border border-orange-500/30 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Banknote size={120} />
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-orange-500 rounded-xl text-white">
                                <Wallet size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-orange-100">
                                {isEn ? "SuperRich (Best Rate)" : "SuperRich (最佳汇率)"}
                            </h2>
                        </div>
                        <p className="text-white/70 mb-6">
                            {isEn 
                             ? "The most trusted exchange counters. Passport required." 
                             : "最值得信赖的兑换柜台。需要护照。"}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {["SuperRich Chiang Mai", "SuperRich Thailand (Green)", "Kasikorn SuperRich"].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-black/20 p-2 px-3 rounded-lg border border-white/5 text-sm">
                                <div className="w-2 h-2 rounded-full bg-orange-400" />
                                <span className="font-medium text-white/90">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 2. Popular Location (Thapae Gate) - (Span 4 cols) */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-4 relative group">
                <div className="relative h-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-rose-500/20 rounded-xl text-rose-300">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-xl font-bold">
                            {isEn ? "Thapae Gate" : "塔佩门"}
                        </h3>
                    </div>
                    <p className="text-white/60 text-sm mb-4 flex-grow">
                        {isEn 
                         ? "Exchange booth hub. Very easy to find." 
                         : "兑换亭中心，非常容易找到。"}
                    </p>
                    <div className="mt-auto h-32 w-full rounded-xl bg-rose-900/20 border border-rose-500/20 flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent z-10" />
                         <span className="z-20 font-semibold text-rose-200">Map View</span>
                    </div>
                </div>
            </motion.div>

            {/* --- ROW 2 (3 Columns Layout: Banks / Malls / Apps) --- */}

            {/* 3. Banks (Span 4 cols) */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
                <div className="h-full bg-blue-900/10 border border-blue-500/20 backdrop-blur-xl rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                            <Landmark size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-blue-100">
                            {isEn ? "Banks" : "银行"}
                        </h3>
                    </div>
                    <ul className="space-y-3">
                        {[
                          { name: "Bangkok Bank", color: "text-blue-400" },
                          { name: "SCB", color: "text-purple-400" },
                          { name: "KBank", color: "text-green-400" },
                          { name: "Krungthai", color: "text-sky-400" }
                        ].map((bank, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-white/80 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                <span className={`text-[10px] font-bold ${bank.color}`}>●</span>
                                {bank.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* 4. Department Stores (Span 4 cols) */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
                <div className="h-full bg-purple-900/10 border border-purple-500/20 backdrop-blur-xl rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300">
                            <Store size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-purple-100">
                            {isEn ? "Malls" : "购物中心"}
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="group bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-colors cursor-default border border-white/5">
                            <p className="font-semibold text-white">Central Festival</p>
                            <p className="text-xs text-white/50">4th Floor, Banking Zone</p>
                        </div>
                        <div className="group bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-colors cursor-default border border-white/5">
                            <p className="font-semibold text-white">Maya Lifestyle</p>
                            <p className="text-xs text-white/50">Nimman Road</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 5. Online Apps (Span 4 cols) */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-4">
                <div className="h-full bg-emerald-900/10 border border-emerald-500/20 backdrop-blur-xl rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-300">
                            <Smartphone size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-emerald-100">
                            {isEn ? "Apps" : "在线应用"}
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#92D050]/20 border border-[#92D050]/30 p-3 rounded-xl flex flex-col items-center justify-center text-center hover:bg-[#92D050]/30 transition-colors">
                            <span className="font-black text-[#92D050] tracking-tighter text-lg">WISE</span>
                        </div>
                        <div className="bg-white/10 border border-white/20 p-3 rounded-xl flex flex-col items-center justify-center text-center hover:bg-white/20 transition-colors">
                            <span className="font-bold text-white text-lg">Revolut</span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-center text-white/40">
                        *Scan QR via PromptPay
                    </p>
                </div>
            </motion.div>

        </motion.div>
      </div>
    </div>
  )
}