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
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const navigationLinks = [
    { key: 'home', href: `/${locale}` },
    { 
      key: 'products', 
      href: '#',
      subItems: [
        { key: 'products_otop', href: `/${locale}/products` },
        { key: 'restaurants', href: `/${locale}/restaurants` },
        { key: 'hotels', href: `/${locale}/hotels` },
      ]
    },
    { key: 'map', href: `/${locale}/maps` },
    { key: 'essentials', href: `/${locale}/essentials` },
    { key: 'review', href: `/${locale}/review` }
  ]

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => {
      const mobileCheck = window.innerWidth <= 910;
      setIsMobile(mobileCheck);
    }
    const handleGlobalClick = () => {
      setIsLangOpen(false);
      setIsDesktopProductsOpen(false);
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleGlobalClick)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleGlobalClick)
    }
  }, [])

  useEffect(() => {
    if (!isClient) return
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
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

  const specialPages = ['/maps', '/emergency', '/currency', '/apps', '/products']
  const isSpecialPage = specialPages.some((page) => pathname.includes(page))

  const isFloating = isScrolled || isSpecialPage
  const showNavbarBg = isFloating || (isMobile && isMenuOpen)

  return (
    <motion.nav
      initial={false}
      animate={{
        y: isFloating ? (isMobile ? 15 : 20) : 0,
        width: isFloating ? (isMobile ? '92%' : '85%') : '100%',
      }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
      className={`fixed top-0 z-50 left-0 right-0 mx-auto flex flex-col ${kanit.className}`}
    >
      <div
        className={`relative w-full transition-all duration-300 
          ${showNavbarBg
            ? 'bg-black/30 backdrop-blur-xl border border-white/10 shadow-xl'
            : 'bg-transparent border-transparent'
          }
          ${isFloating ? 'rounded-[26px]' : 'rounded-none'}
        `}
      >
        <div className="relative w-full px-6 h-16 flex items-center justify-between">

          {/* 📌 LOGO & MOBILE LANGUAGE SELECTOR */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href={`/${locale}`} onClick={() => { setIsMenuOpen(false); setIsLangOpen(false); }}>
              <Image src="/Logo/Logo.png" alt="logo" width={85} height={85} className="object-contain" />
            </Link>

            {/* ปุ่มเปลี่ยนภาษาสำหรับมือถือ (ขยายขนาดตามคำขอ) */}
            <div className="relative min-[911px]:hidden">
              <button
                onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); setIsMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition shadow-sm"
              >
                <img
                  src={`https://flagcdn.com/w40/${LANGUAGES.find(l => l.code === locale)?.country}.png`}
                  className="w-7 h-5 object-cover rounded-md"
                  alt="flag"
                />
                <svg className={`w-5 h-5 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-3 w-44 rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-2 z-[60]"
                  >
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className={`flex items-center gap-4 w-full px-3 py-3 text-base rounded-xl transition ${locale === l.code ? 'bg-blue-600/50 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                      >
                        <img src={`https://flagcdn.com/w40/${l.country}.png`} className="w-6 h-4 object-cover rounded-sm" alt={l.name} />
                        <span className="font-medium">{l.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden min-[911px]:flex absolute left-1/2 -translate-x-1/2 space-x-4 lg:space-x-8">
            {navigationLinks.map(link => (
              link.subItems ? (
                <div key={link.key} className="relative">
                  <div 
                    onClick={(e) => { e.stopPropagation(); setIsDesktopProductsOpen(!isDesktopProductsOpen); setIsLangOpen(false); }}
                    className="text-white font-medium hover:text-blue-300 transition-colors text-sm uppercase tracking-widest drop-shadow-md cursor-pointer flex items-center gap-1 py-1"
                  >
                    <span className="whitespace-nowrap">{t(link.key)}</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${isDesktopProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDesktopProductsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[220px] z-[60]"
                      >
                        <div className="bg-black/80 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-2 flex flex-col" onClick={(e) => e.stopPropagation()}>
                          {link.subItems.map(sub => (
                            <Link key={sub.key} href={sub.href} onClick={() => setIsDesktopProductsOpen(false)} className="px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-colors text-center whitespace-nowrap font-medium">
                              {t(sub.key)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.key} href={link.href} className="text-white font-medium hover:text-blue-300 transition-colors text-sm uppercase tracking-widest drop-shadow-md py-1 whitespace-nowrap">
                  {t(link.key)}
                </Link>
              )
            ))}
          </div>

          {/* RIGHT: LANGUAGE (Desktop) */}
          <div className="ml-auto relative hidden min-[911px]:block">
            <button
              onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); setIsDesktopProductsOpen(false); }}
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
                  className="absolute right-0 mt-4 w-40 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/20 shadow-2xl p-1.5 z-[60]"
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
            <button onClick={() => { setIsMenuOpen(!isMenuOpen); setIsLangOpen(false); setIsMobileProductsOpen(false); }} className="p-2 text-white">
              {isMenuOpen ? <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>}
            </button>
          </div>
        </div>

        {/* 📌 MOBILE MENU CONTENT */}
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
                  link.subItems ? (
                    <div key={link.key} className="block border-b border-white/5 last:border-0">
                      <button 
                        onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)} 
                        className="w-full py-3.5 text-white font-medium text-lg flex items-center justify-between"
                      >
                        {t(link.key)}
                        <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <AnimatePresence>
                        {isMobileProductsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pl-4 pb-2 space-y-1 border-l-2 border-white/10 ml-2 mb-2">
                              {link.subItems.map(sub => (
                                <Link 
                                  key={sub.key} 
                                  href={sub.href} 
                                  onClick={() => { setIsMenuOpen(false); setIsMobileProductsOpen(false); }} 
                                  className="py-2.5 text-white/70 hover:text-white font-medium text-base block"
                                >
                                  {t(sub.key)}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link 
                      key={link.key} 
                      href={link.href} 
                      onClick={() => { setIsMenuOpen(false); setIsMobileProductsOpen(false); }} 
                      className="block py-3.5 text-white font-medium border-b border-white/5 last:border-0 text-lg"
                    >
                      {t(link.key)}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}