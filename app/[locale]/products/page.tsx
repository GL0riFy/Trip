"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { products } from "@/src/data/products";
import { verifiedDistrictLocationOverrides } from "@/src/data/verified-product-locations";

type SortType = "default" | "price-asc" | "price-desc";
type BaseProduct = (typeof products)[number];
type Product = Omit<BaseProduct, "shopName" | "shopNameCN" | "shopNameTH" | "phone" | "address" | "addressCN" | "addressTH"> & {
  shopName?: string;
  shopNameCN?: string;
  shopNameTH?: string;
  phone?: string;
  address?: string;
  addressCN?: string;
  addressTH?: string;
  mapRating?: number;
  mapsQuery?: string;
};

function tri(locale: string, en: string, zh: string, th: string) {
  if (locale === "zh") return zh;
  if (locale === "th") return th;
  return en;
}

const SKIP_LOCATION_UPDATE_IDS = new Set([1, 2, 3, 4, 6, 7, 8]);

const districtItemCounter = new Map<string, number>();
const productsWithVerifiedLocations: Product[] = products.map((product) => {
  if (!product.district) return product;
  const districtOverrides = verifiedDistrictLocationOverrides[product.district];
  if (!districtOverrides || districtOverrides.length === 0) return product;
  const index = districtItemCounter.get(product.district) ?? 0;
  districtItemCounter.set(product.district, index + 1);
  if (SKIP_LOCATION_UPDATE_IDS.has(product.id)) return product;
  const override = districtOverrides[index] ?? districtOverrides[districtOverrides.length - 1];
  return { ...product, ...override, phone: override.phone ?? product.phone };
});

// ─── Animation Variants ────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function RefactoredProductShowcase() {
  const locale = useLocale();

  const displayName = (p: Product) =>
    locale === "th" ? (p.nameTH ?? p.name) : locale === "zh" ? p.nameCN : p.name;
  const secondaryName = (p: Product) =>
    locale === "th" ? p.name : locale === "zh" ? p.name : p.nameCN;
  const displayDesc = (p: Product) =>
    locale === "th" ? (p.descriptionTH ?? p.description) : locale === "zh" ? p.descriptionCN : p.description;
  const displayDistrict = (p: Product) =>
    !p.district ? "" : locale === "th" ? (p.districtTH ?? p.district) : locale === "zh" ? p.districtCN : p.district;
  const displayShop = (p: Product) =>
    locale === "th" ? (p.shopNameTH ?? p.shopName ?? "") : locale === "zh" ? (p.shopNameCN ?? "") : (p.shopName ?? "");
  const displayAddr = (p: Product) =>
    locale === "th" ? (p.addressTH ?? p.address) : locale === "zh" ? p.addressCN : p.address;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortType, setSortType] = useState<SortType>("default");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

  const closeContactPopup = () => setSelectedProduct(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") closeContactPopup(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale === "en" ? "en-US" : locale === "th" ? "th-TH" : "zh-CN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price / 100);

  const allDistricts = Array.from(
    new Set(productsWithVerifiedLocations.map((p) => p.district).filter((d): d is string => Boolean(d)))
  ).sort();

  let filteredProducts = productsWithVerifiedLocations;
  if (selectedDistrict !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.district === selectedDistrict);
  }
  if (sortType === "price-asc") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  else if (sortType === "price-desc") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);

  const phoneHref = selectedProduct?.phone ? `tel:${selectedProduct.phone.replace(/\s+/g, "")}` : "#";
  const mapSearchText = selectedProduct
    ? selectedProduct.mapsQuery || displayAddr(selectedProduct) || ""
    : "";
  const mapHref = mapSearchText
    ? mapSearchText.startsWith("http") ? mapSearchText : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapSearchText)}`
    : "#";

  return (
    <>
      {/* ─── Global Styles ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --ink: #0a0a0a;
          --ink-soft: #3a3a3a;
          --ink-muted: #888;
          --surface: #fafaf8;
          --card: #ffffff;
          --accent: #e8501a;
          --accent-light: #fff1ec;
          --accent-mid: #fad5c7;
          --border: #e8e4df;
          --border-strong: #c8c2bb;
        }

        .page-root { font-family: 'DM Sans', sans-serif; background: transparent; color: var(--ink); }
        .display { font-family: 'Syne', sans-serif; }

        /* Filter bar */
        .filter-select {
          appearance: none;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255,255,255,0.5);
          border-radius: 10px;
          padding: 10px 40px 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        .filter-select:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px rgba(10,10,10,0.08); }
        .filter-select:hover { border-color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.9); }

        /* Card */
        .product-card {
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1.5px solid rgba(255,255,255,0.6);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px -8px rgba(10,10,10,0.18);
          border-color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.94);
        }

        /* Image overlay */
        .card-img-wrap { position: relative; overflow: hidden; height: 280px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; }
        .card-img-wrap img { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        .product-card:hover .card-img-wrap img { transform: scale(1.02); }
        .card-price-badge {
          position: absolute;
          top: 14px; right: 14px;
          background: var(--ink);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 999px;
          letter-spacing: 0.01em;
        }
        .card-district-badge {
          position: absolute;
          top: 14px; left: 14px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(6px);
          color: var(--ink-soft);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: 1px solid rgba(0,0,0,0.08);
        }

        /* CTA button */
        .cta-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%;
          background: var(--ink);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.15s;
        }
        .cta-btn:hover { background: var(--accent); transform: translateY(-1px); }
        .cta-btn-arrow { transition: transform 0.2s; }
        .cta-btn:hover .cta-btn-arrow { transform: translateX(4px); }

        /* Rating dot */
        .rating-chip {
          display: inline-flex; align-items: center; gap: 5px;
          background: #fffbe6;
          border: 1px solid #f0e4a0;
          border-radius: 999px;
          padding: 3px 9px;
          font-size: 12px;
          font-weight: 600;
          color: #7a5c00;
        }

        /* Modal */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center;
          background: rgba(10,10,10,0.55);
          backdrop-filter: blur(6px);
          padding: 16px;
        }
        .modal-panel {
          position: relative;
          width: 100%; max-width: 680px;
          background: var(--card);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 100px -12px rgba(10,10,10,0.45);
          border: 1.5px solid var(--border);
        }
        .modal-hero { position: relative; height: 220px; overflow: hidden; }
        .modal-hero img { object-fit: cover; width: 100%; height: 100%; }
        .modal-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.2) 50%, transparent 100%);
        }
        .modal-hero-text { position: absolute; bottom: 20px; left: 24px; right: 60px; color: #fff; }
        .modal-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 4px; }
        .modal-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; line-height: 1.15; }
        .modal-close {
          position: absolute; top: 14px; right: 14px;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .modal-close:hover { background: rgba(255,255,255,0.3); }
        .modal-body { padding: 24px 28px 28px; }
        .modal-info-card {
          background: var(--accent-light);
          border: 1.5px solid var(--accent-mid);
          border-radius: 16px;
          padding: 18px 20px;
          margin: 16px 0;
        }
        .modal-shop-name { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--ink); margin-bottom: 12px; }
        .modal-info-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; font-size: 14px; color: var(--ink-soft); }
        .modal-info-row:last-child { margin-bottom: 0; }
        .modal-info-icon { font-size: 16px; margin-top: 1px; flex-shrink: 0; }
        .modal-actions { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 20px; }
        .modal-btn {
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          padding: 13px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.15s, filter 0.15s;
          border: none;
        }
        .modal-btn:hover { transform: translateY(-2px); filter: brightness(0.95); }
        .modal-btn-primary { background: var(--ink); color: #fff; }
        .modal-btn-secondary { background: rgba(255,255,255,0.85); color: var(--ink); border: 1.5px solid var(--border-strong); backdrop-filter: blur(4px); }
        .modal-btn-ghost { background: var(--accent-light); color: var(--accent); border: 1.5px solid var(--accent-mid); }

        /* Hero */
        .hero-wrap { position: relative; overflow: hidden; background: transparent; color: #fff; }
        .hero-grid-bg { display: none; }
        .hero-accent-circle { display: none; }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          margin-bottom: 20px;
          backdrop-filter: blur(6px);
        }
        .hero-tag-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

        .hero-stat { display: flex; flex-direction: column; }
        .hero-stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; line-height: 1; }
        .hero-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 2px; }

        /* Feature card (hero right) */
        .hero-feature-card {
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, border-color 0.2s;
          backdrop-filter: blur(8px);
        }
        .hero-feature-card:hover { transform: scale(1.01); border-color: rgba(255,255,255,0.4); }

        /* Section header */
        .section-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: #fff;
          text-shadow: 0 1px 4px rgba(0,0,0,0.2);
          margin-bottom: 8px;
        }
        .section-eyebrow::before { content: ''; display: block; width: 20px; height: 2px; background: var(--accent); border-radius: 2px; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--surface); }
        ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 3px; }

        @media (max-width: 640px) {
          .modal-actions { grid-template-columns: 1fr; }
          .hero-stats { display: none; }
        }
      `}</style>

      <div className="page-root min-h-screen">

        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <header className="hero-wrap">
          <div className="hero-grid-bg" />
          <div className="hero-accent-circle" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-center">

              {/* Left copy */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 max-w-xl"
              >
                <div className="hero-tag">
                  <span className="hero-tag-dot" />
                  {tri(locale, "OTOP Marketplace", "OTOP 市场", "ตลาด OTOP")}
                </div>

                <h1 className="display mb-5 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                  {locale === "zh" ? (
                    <>探索<span style={{ color: "var(--accent)" }}>本地</span><br />OTOP 产品</>
                  ) : locale === "th" ? (
                    <>ค้นหา<span style={{ color: "var(--accent)" }}>สินค้า</span><br />OTOP ท้องถิ่น</>
                  ) : (
                    <>Find <span style={{ color: "var(--accent)" }}>Local</span><br />OTOP Products</>
                  )}
                </h1>

                <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "420px" }}>
                  {tri(
                    locale,
                    "Browse by district and connect directly with local sellers — call or navigate in one tap.",
                    "按地区浏览商品，一键联系卖家或打开导航。",
                    "เลือกตามอำเภอ ติดต่อร้านค้าโดยตรง — โทรหรือเปิดแผนที่ได้ในคลิกเดียว"
                  )}
                </p>

                <div className="flex items-center gap-5 flex-wrap">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition"
                    style={{ background: "var(--accent)" }}
                    onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
                    onMouseLeave={e => (e.currentTarget.style.filter = "")}
                  >
                    {tri(locale, "Browse Products", "浏览商品", "ดูสินค้า")}
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>

                  {/* Stats */}
                  <div className="hero-stats flex items-center gap-8 pl-2">
                    <div className="hero-stat">
                      <span className="hero-stat-num">{productsWithVerifiedLocations.length}+</span>
                      <span className="hero-stat-label">{tri(locale, "Products", "商品", "สินค้า")}</span>
                    </div>
                    <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.15)" }} />
                    <div className="hero-stat">
                      <span className="hero-stat-num">{allDistricts.length}</span>
                      <span className="hero-stat-label">{tri(locale, "Districts", "地区", "อำเภอ")}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right featured card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 max-w-md lg:max-w-none"
                onClick={() => setSelectedProduct(productsWithVerifiedLocations[0])}
              >
                <div className="hero-feature-card">
                  <div style={{ position: "relative", height: "300px" }}>
                    <Image
                      src={productsWithVerifiedLocations[0].image}
                      alt={displayName(productsWithVerifiedLocations[0])}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 55%)" }} />
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
                          {tri(locale, "Featured", "精选商品", "แนะนำ")}
                        </p>
                        <h3 className="display" style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
                          {displayName(productsWithVerifiedLocations[0])}
                        </h3>
                      </div>
                      <div style={{ background: "var(--accent)", color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 14, fontWeight: 700, fontFamily: "Syne, sans-serif", flexShrink: 0 }}>
                        {formatPrice(productsWithVerifiedLocations[0].price)}
                      </div>
                    </div>
                    <p style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.04em" }}>
                      {tri(locale, "↗ Tap to view contact", "↗ 点击查看联系方式", "↗ แตะเพื่อดูข้อมูลติดต่อ")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* ─── PRODUCTS SECTION ────────────────────────────────────────────── */}
        <main id="products" className="mx-auto max-w-7xl px-6 py-16">

          {/* Section header + filters */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="section-eyebrow">{tri(locale, "Complete Collection", "完整系列", "คอลเลกชันครบ")}</p>
                <h2 className="display text-3xl font-extrabold leading-tight md:text-4xl" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                  {tri(locale, "Products With Direct Contact", "可直接联系商家的商品", "สินค้าที่ติดต่อร้านได้โดยตรง")}
                </h2>
                <p className="mt-1.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {tri(locale, `${filteredProducts.length} products`, `${filteredProducts.length} 件商品`, `${filteredProducts.length} รายการ`)}
                </p>
              </div>

              {/* Filter row */}
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {tri(locale, "Sort", "排序", "เรียง")}
                  </label>
                  <select value={sortType} onChange={e => setSortType(e.target.value as SortType)} className="filter-select">
                    <option value="default">{tri(locale, "Default", "默认", "ค่าเริ่มต้น")}</option>
                    <option value="price-asc">{tri(locale, "Price: Low → High", "价格从低到高", "ราคา: ต่ำ → สูง")}</option>
                    <option value="price-desc">{tri(locale, "Price: High → Low", "价格从高到低", "ราคา: สูง → ต่ำ")}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {tri(locale, "District", "地区", "อำเภอ")}
                  </label>
                  <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="filter-select">
                    <option value="all">{tri(locale, "All Districts", "全部地区", "ทุกอำเภอ")}</option>
                    {allDistricts.map(d => (
                      <option key={d} value={d}>
                        {locale === "en"
                          ? d
                          : locale === "zh"
                            ? productsWithVerifiedLocations.find(p => p.district === d)?.districtCN || d
                            : productsWithVerifiedLocations.find(p => p.district === d)?.districtTH ?? d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Active district pill */}
            {selectedDistrict !== "all" && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
                <span className="text-sm" style={{ color: "var(--ink-muted)" }}>{tri(locale, "Filtering:", "筛选：", "กรอง:")}</span>
                <button
                  onClick={() => setSelectedDistrict("all")}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                  style={{ background: "var(--ink)", color: "#fff" }}
                >
                  {selectedDistrict}
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </motion.div>
            )}
          </div>

          {/* Product grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={`${selectedDistrict}-${sortType}`}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                variants={fadeUp}
                onClick={() => setSelectedProduct(product)}
                className="product-card"
              >
                {/* Image */}
                <div className="card-img-wrap">
                  <Image
                    src={product.image}
                    alt={displayName(product)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                  <span className="card-price-badge">{formatPrice(product.price)}</span>
                  {product.district && (
                    <span className="card-district-badge">{displayDistrict(product)}</span>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: "20px 20px 22px" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="display" style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25, marginBottom: 2 }}>
                        {displayName(product)}
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                        {secondaryName(product)}
                      </p>
                    </div>
                    {product.mapRating && (
                      <span className="rating-chip" style={{ flexShrink: 0 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#b8930a" }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {product.mapRating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {displayDesc(product)}
                  </p>

                  {/* Seller strip */}
                  <div style={{ background: "rgba(0,0,0,0.04)", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "10px 14px", marginBottom: 14 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)", marginBottom: 3 }}>
                      {tri(locale, "Seller", "商家", "ร้านค้า")}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {displayShop(product)}
                    </p>
                    {product.phone && (
                      <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>{product.phone}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="cta-btn"
                    onClick={e => { e.stopPropagation(); setSelectedProduct(product); }}
                  >
                    {tri(locale, "View Contact", "联系商家", "ดูข้อมูลติดต่อ")}
                    <svg className="cta-btn-arrow" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--ink-muted)", opacity: 0.5 }}>
                  <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <p className="display text-xl font-bold" style={{ color: "var(--ink)" }}>
                {tri(locale, "No products found", "未找到商品", "ไม่พบสินค้า")}
              </p>
              <p style={{ color: "var(--ink-muted)", marginTop: 6, fontSize: 14 }}>
                {tri(locale, "Try selecting a different district.", "请尝试选择其他地区。", "ลองเลือกอำเภออื่น")}
              </p>
            </motion.div>
          )}
        </main>

        {/* ─── CONTACT MODAL ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeContactPopup}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${selectedProduct.id}`}
            >
              <motion.div
                className="modal-panel"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Hero image */}
                <div className="modal-hero">
                  <Image
                    src={selectedProduct.image}
                    alt={displayName(selectedProduct)}
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="modal-hero-overlay" />
                  <div className="modal-hero-text">
                    <p className="modal-eyebrow">{tri(locale, "Shop Contact", "商家联系方式", "ข้อมูลติดต่อร้าน")}</p>
                    <h2 id={`modal-title-${selectedProduct.id}`} className="modal-title">
                      {displayName(selectedProduct)}
                    </h2>
                    <p style={{ marginTop: 4, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                      {displayDistrict(selectedProduct)}
                    </p>
                  </div>
                  <button className="modal-close" onClick={closeContactPopup} aria-label="Close">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-soft)" }}>
                    {displayDesc(selectedProduct)}
                  </p>

                  <div className="modal-info-card">
                    <p className="modal-shop-name">
                      {displayShop(selectedProduct)}
                    </p>
                    {(selectedProduct.address || selectedProduct.addressCN || selectedProduct.addressTH) && (
                      <div className="modal-info-row">
                        <svg className="modal-info-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: "var(--accent)" }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4.5-6-8-6-10.5a6 6 0 1112 0C18 13 16 16.5 12 21z"/><circle cx="12" cy="10.5" r="2" fill="currentColor" stroke="none"/></svg>
                        <span>{displayAddr(selectedProduct)}</span>
                      </div>
                    )}
                    {selectedProduct.phone && (
                      <div className="modal-info-row">
                        <svg className="modal-info-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: "var(--accent)" }}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.98 2.18 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                        <a href={phoneHref} style={{ fontWeight: 600, color: "#1d4ed8", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                        >
                          {selectedProduct.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="modal-actions">
                    <a href={phoneHref} className="modal-btn modal-btn-primary">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.98 2.18 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                      {tri(locale, "Call Shop", "拨打电话", "โทรหาร้าน")}
                    </a>
                    <a href={mapHref} target="_blank" rel="noreferrer" className="modal-btn modal-btn-secondary">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4.5-6-8-6-10.5a6 6 0 1112 0C18 13 16 16.5 12 21z"/><circle cx="12" cy="10.5" r="2" fill="currentColor" stroke="none"/></svg>
                      {tri(locale, "Open Map", "打开地图", "เปิดแผนที่")}
                    </a>
                    <button type="button" onClick={closeContactPopup} className="modal-btn modal-btn-ghost">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                      {tri(locale, "Close", "关闭", "ปิด")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}