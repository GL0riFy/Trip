'use client'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Kanit } from 'next/font/google'

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

const LANGUAGES = [
  { code: 'en', name: 'English', country: 'us' },
  { code: 'zh', name: '中文', country: 'cn' },
  { code: 'th', name: 'ไทย', country: 'th' },
]

export default function Navigation() {
  const t = useTranslations('Nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const navigationLinks = [
    { key: 'home', href: `/${locale}` },
    { key: 'products', href: `/${locale}/products` },
    { key: 'map', href: `/${locale}/maps` },
    { key: 'essentials', href: `/${locale}/essentials` },
    { key: 'dashboard', href: `/${locale}/dashboard` }
  ]

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => setIsMobile(window.innerWidth <= 910)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isClient) return
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isClient])

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(/^\/(en|zh|th)/, `/${newLocale}`)
    router.push(newPath)
    setIsLangOpen(false)
    setIsMenuOpen(false)
  }

  if (!isClient) return null

  // --- ส่วนที่แก้ไข: เช็คว่าอยู่หน้าแผนที่หรือไม่ เพื่อให้ Navbar ขุ่นตลอดเวลาในหน้านี้ ---
  const isMapPage = pathname.includes('/maps');
  const showNavbarBg = isScrolled || (isMobile && isMenuOpen) || isMapPage;

  return (
    <motion.nav
      initial={false}
      animate={{
        y: isMobile ? 15 : (isScrolled ? 16 : 10),
        width: isMobile ? '92%' : (isScrolled ? '85%' : '90%'),
      }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
      className={`fixed z-50 left-0 right-0 mx-auto flex flex-col ${kanit.className}`}
    >
      <div 
        className={`relative w-full transition-all duration-300 
          ${showNavbarBg 
            ? 'bg-black/30 backdrop-blur-xl border border-white/10 shadow-xl' 
            : 'bg-transparent border-transparent'}
          rounded-[26px]`}
      >
        <div className="relative w-full px-6 h-16 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center shrink-0">
            <Link href={`/${locale}`} onClick={() => { setIsMenuOpen(false); setIsLangOpen(false); }}>
              <Image src="/Logo/Logo.png" alt="logo" width={85} height={85} className="object-contain" />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden min-[911px]:flex absolute left-1/2 -translate-x-1/2 space-x-8">
            {navigationLinks.map(link => (
              <Link key={link.key} href={link.href} className="text-white font-medium hover:text-blue-300 transition-colors text-sm uppercase tracking-widest drop-shadow-md">
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* RIGHT: LANGUAGE (Desktop) */}
          <div className="ml-auto relative hidden min-[911px]:block">
            <button
              onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}
              className="flex items-center gap-2 text-white font-medium hover:text-blue-300 transition-colors text-sm drop-shadow-md"
            >
              <img src={`https://flagcdn.com/w40/${LANGUAGES.find(l => l.code === locale)?.country}.png`} className="w-5 h-3.5 object-cover rounded-sm" alt="flag" />
              <span>{LANGUAGES.find(l => l.code === locale)?.name}</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-40 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/20 shadow-2xl p-1.5 z-60"
                >
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => switchLocale(l.code)}
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl transition ${locale === l.code ? 'bg-blue-600/50 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                    >
                      <img src={`https://flagcdn.com/w40/${l.country}.png`} className="w-5 h-3.5 object-cover rounded-sm" alt={l.name} />
                      {l.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE BURGER */}
          <div className="min-[911px]:hidden ml-auto">
            <button onClick={() => { setIsMenuOpen(!isMenuOpen); setIsLangOpen(false); }} className="p-2 text-white">
              {isMenuOpen ? <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>}
            </button>
          </div>
        </div>

        {/* MOBILE MENU CONTENT */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              className="min-[911px]:hidden w-full border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col px-6 pb-6 pt-2 space-y-1">
                {navigationLinks.map(link => (
                  <Link key={link.key} href={link.href} onClick={() => setIsMenuOpen(false)} className="block py-3.5 text-white font-medium border-b border-white/5 last:border-0 text-lg">
                    {t(link.key)}
                  </Link>
                ))}
                
                {/* MOBILE LANGUAGE DROPDOWN */}
                <div className="pt-4">
                  <button 
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    <div className="flex items-center gap-3">
                      <img src={`https://flagcdn.com/w40/${LANGUAGES.find(l => l.code === locale)?.country}.png`} className="w-6 h-4 object-cover rounded-sm" alt="flag" />
                      <span className="font-medium">{LANGUAGES.find(l => l.code === locale)?.name}</span>
                    </div>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isLangOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-1"
                      >
                        {LANGUAGES.map(l => (
                          <button
                            key={l.code}
                            onClick={() => switchLocale(l.code)}
                            className={`flex items-center gap-4 w-full px-5 py-3 rounded-xl transition ${locale === l.code ? 'bg-blue-600/40 text-white' : 'text-white/60 hover:bg-white/5'}`}
                          >
                            <img src={`https://flagcdn.com/w40/${l.country}.png`} className="w-6 h-4 object-cover rounded-sm" alt={l.name} />
                            <span>{l.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}