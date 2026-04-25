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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
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

  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale === "en" ? "en-US" : locale === "th" ? "th-TH" : "zh-CN", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
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
    ? mapSearchText.startsWith("http") ? mapSearchText : `http://googleusercontent.com/maps.google.com/?q=${encodeURIComponent(mapSearchText)}`
    : "#";

  // ดึงสินค้าแนะนำตัวแรกมาใช้แสดงบน Hero
  const featuredProduct = productsWithVerifiedLocations[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Prompt:wght@400;500;600;700;800&display=swap');

        :root {
          --cream: #F7F3EE;
          --cream-dark: #EDE7DE;
          --ink: #1A1714;
          --ink-mid: #4A4540;
          --ink-soft: #8A837C;
          --sand: #C9B99A;
          --rust: #C4520A;
          --rust-light: #F5E6DC;
          --rust-mid: #E8C4AB;
          --white: #FFFFFF;
          --gold: #A07840;
          --border: #DDD5CA;
          --shadow-sm: 0 2px 8px rgba(26,23,20,0.06);
          --shadow-md: 0 8px 32px rgba(26,23,20,0.1);
          --shadow-lg: 0 24px 64px rgba(26,23,20,0.14);
          --radius: 4px;
          --radius-lg: 12px;
          --radius-xl: 20px;
        }

        .body-serif {
            font-family: 'Sarabun', 'Noto Sans SC', serif;
        }
        
        .page-root {
          background: var(--cream);
          color: var(--ink);
          font-family: 'DM Sans', 'Noto Sans Thai', sans-serif;
          line-height: 1.6;
          min-height: 100vh;
        }

        /* ── HERO SECTION ──────────────────────────────────────── */
        .hero {
          min-height: 100vh;
          display: grid; 
          grid-template-columns: 1fr 1fr;
        }
        .hero-left {
          background: var(--ink);
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 64px;
          position: relative; overflow: hidden;
        }
        .hero-left::before {
          content: '';
          position: absolute; top: -120px; left: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(196,82,10,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-left::after {
          content: '';
          position: absolute; bottom: -80px; right: -40px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(160,120,64,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--sand);
          margin-bottom: 32px;
        }
        .hero-eyebrow-line {
          width: 32px; height: 1px; background: var(--rust);
        }

        .hero-headline {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: clamp(42px, 5vw, 68px);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: var(--white);
          margin-bottom: 28px;
        }
        .hero-headline em {
          font-style: italic;
          color: var(--rust);
        }

        .hero-body {
          font-size: 15px; color: rgba(247,243,238,0.55);
          line-height: 1.75;
          max-width: 360px;
          margin-bottom: 48px;
        }

        .hero-cta-group {
          display: flex; align-items: center; gap: 20px;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--rust);
          color: var(--white);
          font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.2s, filter 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }

        .hero-stats {
          display: flex; gap: 40px;
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .hero-stat-num {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: 32px; font-weight: 700; color: var(--white);
          line-height: 1;
          display: block;
        }
        .hero-stat-label {
          font-size: 11px; color: rgba(247,243,238,0.4);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-top: 6px; display: block;
        }

        .hero-right {
          position: relative; overflow: hidden;
          background: var(--cream-dark);
        }
        .hero-img-main {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.9;
          transition: transform 6s ease;
        }
        .hero-right:hover .hero-img-main { transform: scale(1.04); }

        .hero-card-float {
          position: absolute; bottom: 48px; left: 48px; right: 48px;
          background: rgba(247,243,238,0.95);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-xl);
          padding: 24px 28px;
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: var(--shadow-lg);
          display: flex; justify-content: space-between; align-items: center;
          animation: floatUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .hero-card-float:hover {
          transform: translateY(-4px);
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-card-title {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: 17px; font-weight: 700; color: var(--ink);
          margin-bottom: 4px;
        }
        .hero-card-sub {
          font-size: 12px; color: var(--ink-soft);
          display: flex; align-items: center; gap: 6px;
        }
        .hero-card-price {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: 24px; font-weight: 700; color: var(--rust);
        }
        .hero-card-badge {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--rust);
          background: var(--rust-light);
          padding: 3px 10px; border-radius: 999px;
          margin-top: 4px; display: inline-block;
        }

        /* ── FILTER BAR ────────────────────────────────────────── */
        .filter-section {
          padding: 48px 64px 32px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .filter-heading {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: 32px; font-weight: 700; color: var(--ink);
          letter-spacing: -0.02em;
        }
        .filter-heading span { color: var(--rust); }

        .filter-controls {
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .filter-pill {
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 13px; font-weight: 500;
          cursor: pointer;
          border: 1.5px solid var(--border);
          background: var(--white);
          color: var(--ink-mid);
          transition: all 0.18s;
          font-family: 'DM Sans', 'Noto Sans Thai', sans-serif;
        }
        .filter-pill:hover, .filter-pill.active {
          background: var(--ink);
          color: var(--white);
          border-color: var(--ink);
        }
        .filter-select-wrap {
          position: relative;
        }
        .filter-select-wrap select {
          appearance: none;
          padding: 9px 36px 9px 16px;
          border-radius: 999px;
          font-size: 13px; font-weight: 500;
          cursor: pointer;
          border: 1.5px solid var(--border);
          background: var(--white);
          color: var(--ink-mid);
          font-family: 'DM Sans', 'Noto Sans Thai', sans-serif;
          transition: all 0.18s;
        }
        .filter-select-wrap select:hover { border-color: var(--ink); }
        .filter-select-wrap select:focus { outline: none; border-color: var(--ink); }
        .filter-select-wrap::after {
          content: '▾';
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          font-size: 11px; color: var(--ink-soft);
          pointer-events: none;
        }

        /* ── PRODUCT GRID ──────────────────────────────────────── */
        .products-section { 
          padding: 0 64px 96px; 
          max-width: 1400px;
          margin: 0 auto;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }

        .product-card {
          background: var(--white);
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .card-img-wrap {
          position: relative; height: 260px;
          background: var(--cream-dark);
          overflow: hidden;
        }
        .card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .product-card:hover .card-img-wrap img { transform: scale(1.05); }

        .card-price-badge {
          position: absolute; top: 16px; right: 16px;
          background: var(--ink);
          color: var(--white);
          font-size: 13px; font-weight: 600;
          padding: 5px 14px; border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
        }
        .card-tag {
          position: absolute; top: 16px; left: 16px;
          background: rgba(247,243,238,0.95);
          color: var(--ink-mid);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .card-body { padding: 22px 24px 24px; }

        .card-category {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--rust);
          margin-bottom: 8px;
        }
        .card-name {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: 20px; font-weight: 700; color: var(--ink);
          line-height: 1.25; margin-bottom: 4px;
        }
        .card-name-sub {
          font-size: 12px; color: var(--ink-soft); margin-bottom: 12px;
        }
        .card-desc {
          font-size: 13px; color: var(--ink-mid);
          line-height: 1.7; margin-bottom: 18px;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .card-seller {
          background: var(--cream);
          border-radius: 10px; padding: 12px 14px;
          margin-bottom: 18px;
          border: 1px solid var(--border);
        }
        .card-seller-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--ink-soft); margin-bottom: 3px;
        }
        .card-seller-name {
          font-size: 13px; font-weight: 600; color: var(--ink);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .card-seller-phone {
          font-size: 12px; color: var(--ink-soft); margin-top: 2px;
        }

        .card-rating {
          display: inline-flex; align-items: center; gap: 5px;
          background: #FFF9E6; border: 1px solid #EDE0A0;
          border-radius: 999px; padding: 3px 10px;
          font-size: 12px; font-weight: 600; color: #7A5C00;
          margin-bottom: 16px;
        }

        .card-btn {
          width: 100%; padding: 13px;
          background: var(--ink); color: var(--white);
          border: none; border-radius: 10px;
          font-family: 'DM Sans', 'Noto Sans Thai', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.18s, transform 0.18s;
        }
        .card-btn:hover { background: var(--rust); transform: translateY(-1px); }
        .card-btn svg { transition: transform 0.2s; }
        .card-btn:hover svg { transform: translateX(4px); }

        /* ── MODAL ─────────────────────────────────────────────── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(26,23,20,0.65);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }

        .modal-panel {
          background: var(--white);
          border-radius: 24px;
          width: 100%; max-width: 640px;
          overflow: hidden;
          box-shadow: 0 48px 120px rgba(26,23,20,0.4);
          border: 1px solid var(--border);
        }

        .modal-hero {
          position: relative; height: 200px; overflow: hidden;
          background: var(--cream-dark);
        }
        .modal-hero img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .modal-hero-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,23,20,0.85) 0%, rgba(26,23,20,0.2) 50%, transparent 100%);
        }
        .modal-hero-info {
          position: absolute; bottom: 20px; left: 24px; right: 56px;
          color: var(--white);
        }
        .modal-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--sand);
          margin-bottom: 6px;
        }
        .modal-title {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: 24px; font-weight: 800; line-height: 1.15;
        }
        .modal-district {
          font-size: 12px; color: rgba(247,243,238,0.5); margin-top: 4px;
        }
        .modal-close-btn {
          position: absolute; top: 14px; right: 14px;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          color: var(--white); font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .modal-close-btn:hover { background: rgba(255,255,255,0.28); }

        .modal-body { padding: 24px 28px 28px; }

        .modal-desc {
          font-size: 14px; color: var(--ink-mid); line-height: 1.75;
          margin-bottom: 20px;
        }

        .modal-info-box {
          background: var(--rust-light);
          border: 1.5px solid var(--rust-mid);
          border-radius: 14px;
          padding: 18px 20px; margin-bottom: 20px;
        }
        .modal-shop-name {
          font-family: 'Inter', 'Prompt', sans-serif;
          font-size: 18px; font-weight: 700; color: var(--ink);
          margin-bottom: 14px;
        }
        .modal-info-row {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: var(--ink-mid);
          margin-bottom: 8px;
        }
        .modal-info-row:last-child { margin-bottom: 0; }
        .modal-info-row svg { flex-shrink: 0; margin-top: 2px; color: var(--rust); }

        .modal-actions {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;
        }
        .modal-btn {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 13px; border-radius: 10px;
          font-family: 'DM Sans', 'Noto Sans Thai', sans-serif;
          font-size: 13px; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: transform 0.15s, filter 0.15s;
          border: none;
        }
        .modal-btn:hover { transform: translateY(-2px); filter: brightness(0.95); }
        .modal-btn-call { background: var(--ink); color: var(--white); }
        .modal-btn-map { background: var(--white); color: var(--ink); border: 1.5px solid var(--border); }
        .modal-btn-close { background: var(--rust-light); color: var(--rust); border: 1.5px solid var(--rust-mid); }

        /* ── RESPONSIVE ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-right { height: 420px; }
          .filter-section, .products-section { padding-left: 24px; padding-right: 24px; }
        }
        @media (max-width: 640px) {
          .hero {
    /* ปรับให้ความสูงยืดตามเนื้อหา ไม่ต้องบังคับเต็มจอ 100vh ตลอดเวลา */
    min-height: auto; 
  }

  .hero-left { 
    /* --- จุดสำคัญที่สุด --- */
    /* เปลี่ยนจาก 56px เป็น 140px เพื่อดันเนื้อหาลงมาจาก Navbar */
    padding: 140px 24px 60px 24px !important; 
    
    display: flex;
    flex-direction: column;
    /* เปลี่ยนจาก center เป็น flex-start เพื่อให้คุมระยะจากด้านบนได้แม่นยำ */
    justify-content: flex-start; 
  }

  .hero-headline {
    /* ลดขนาดหัวข้อลงนิดหน่อยบนมือถือ จะได้ไม่เบียดกันจนเกินไป */
    font-size: 38px; 
    margin-top: 12px;
    line-height: 1.2;
  }

  .hero-eyebrow {
    /* เว้นช่องว่างให้หัวข้อ OTOP นิดนึง */
    margin-bottom: 10px;
  }

  .hero-body {
    margin-bottom: 32px;
    font-size: 14px;
    color: rgba(247,243,238,0.7); /* ปรับสีให้ชัดขึ้นนิดนึงบนพื้นหลังเข้ม */
  }

  .modal-actions { 
    grid-template-columns: 1fr; 
  }
}
      `}</style>

      <div className="page-root">
        
        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line"></span>
              {tri(locale, "Local OTOP Market", "本地 OTOP 市场", "ตลาด OTOP ท้องถิ่น")}
            </div>
            <h1 className="hero-headline">
              {locale === "th" ? (
                <>สินค้า<em>คุณภาพ</em><br/>จากชุมชน</>
              ) : locale === "zh" ? (
                <>探索<em>优质</em><br/>本地产品</>
              ) : (
                <>Find <em>Local</em><br/>OTOP Products</>
              )}
            </h1>
            <p className="hero-body">
              {tri(locale,
                "Browse by district and connect directly with local sellers — call or navigate in one tap.",
                "按地区浏览商品，一键联系卖家或打开导航。",
                "เลือกซื้อสินค้า OTOP แท้จากผู้ผลิตท้องถิ่นโดยตรง ติดต่อร้านค้า โทรหา หรือเปิดแผนที่ได้ในคลิกเดียว"
              )}
            </p>
            <div className="hero-cta-group">
              <a href="#products" className="btn-primary">
                {tri(locale, "Browse Products", "浏览全部", "ดูสินค้าทั้งหมด")}
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4-4 4M21 12H3"/>
                </svg>
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <span className="hero-stat-num">{productsWithVerifiedLocations.length}+</span>
                <span className="hero-stat-label">{tri(locale, "Products", "商品", "สินค้า")}</span>
              </div>
              <div>
                <span className="hero-stat-num">{allDistricts.length}</span>
                <span className="hero-stat-label">{tri(locale, "Districts", "地区", "อำเภอ")}</span>
              </div>
              <div>
                <span className="hero-stat-num">100%</span>
                <span className="hero-stat-label">{tri(locale, "Authentic", "正品", "ของแท้")}</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            {featuredProduct && (
              <>
                <Image
                  src={featuredProduct.image}
                  alt={displayName(featuredProduct)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="hero-img-main"
                  style={{ objectFit: "cover" }}
                />
                <div className="hero-card-float" onClick={() => setSelectedProduct(featuredProduct)}>
                  <div>
                    <div className="hero-card-title">{displayName(featuredProduct)}</div>
                    <div className="hero-card-sub">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4.5-6-8-6-10.5a6 6 0 1112 0C18 13 16 16.5 12 21z"/>
                      </svg>
                      {displayDistrict(featuredProduct)}
                    </div>
                    <span className="hero-card-badge">{tri(locale, "Featured", "精选", "แนะนำ")}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="hero-card-price">{formatPrice(featuredProduct.price)}</div>
                    <div style={{ fontSize: "11px", color: "var(--ink-soft)", marginTop: "4px" }}>
                      {tri(locale, "Tap to view", "点击查看", "ต่อชิ้น")}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ─── FILTER + PRODUCTS ────────────────────────────────────────────── */}
        <section id="products">
          <div className="filter-section">
            <div>
              <h2 className="filter-heading">
                {tri(locale, "All OTOP", "全部 OTOP", "รายการสินค้า")}
  <span> {tri(locale, "Products", "商品", "OTOP ทั้งหมด")}</span>
              </h2>
              <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "6px" }}>
                {tri(locale, `Showing ${filteredProducts.length} items`, `显示 ${filteredProducts.length} 件商品`, `แสดง ${filteredProducts.length} รายการ`)}
              </p>
            </div>
            
            <div className="filter-controls">
              <button 
                className={`filter-pill ${selectedDistrict === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedDistrict('all')}
              >
                {tri(locale, "All Districts", "全部地区", "ทุกอำเภอ")}
              </button>
              
              {allDistricts.map(d => (
                <button 
                  key={d}
                  className={`filter-pill ${selectedDistrict === d ? 'active' : ''}`}
                  onClick={() => setSelectedDistrict(d)}
                >
                  {locale === "en"
                    ? d
                    : locale === "zh"
                      ? productsWithVerifiedLocations.find(p => p.district === d)?.districtCN || d
                      : productsWithVerifiedLocations.find(p => p.district === d)?.districtTH ?? d}
                </button>
              ))}

              <div className="filter-select-wrap">
                <select value={sortType} onChange={e => setSortType(e.target.value as SortType)}>
                  <option value="default">{tri(locale, "Sort: Default", "默认排序", "เรียง: ค่าเริ่มต้น")}</option>
                  <option value="price-asc">{tri(locale, "Price: Low → High", "价格从低到高", "ราคา: ต่ำ → สูง")}</option>
                  <option value="price-desc">{tri(locale, "Price: High → Low", "价格从高到低", "ราคา: สูง → ต่ำ")}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="products-section">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={`${selectedDistrict}-${sortType}`}
              className="product-grid"
            >
              {filteredProducts.map((product) => (
                <motion.article
                  key={product.id}
                  variants={fadeUp}
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="card-img-wrap">
                    <Image
                      src={product.image}
                      alt={displayName(product)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                    <span className="card-price-badge">{formatPrice(product.price)}</span>
                    {product.district && (
                      <span className="card-tag">{displayDistrict(product)}</span>
                    )}
                  </div>
                  
                  <div className="card-body">
                    {/* Placeholder category since the original TSX data model didn't explicitly have category */}
                    <div className="card-category">OTOP</div> 
                    <h3 className="card-name">{displayName(product)}</h3>
                    <p className="card-name-sub body-serif">{secondaryName(product)}</p>
                    <p className="card-desc body-serif">{displayDesc(product)}</p>
                    
                    {product.mapRating && (
                      <div className="card-rating">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#B8930A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {product.mapRating.toFixed(1)}
                      </div>
                    )}
                    
                    <div className="card-seller">
                      <div className="card-seller-label">{tri(locale, "Seller", "商家", "ร้านค้า")}</div>
                      <div className="card-seller-name">{displayShop(product)}</div>
                      {product.phone && (
                        <div className="card-seller-phone">{product.phone}</div>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      className="card-btn"
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                    >
                      {tri(locale, "View Contact", "联系商家", "ดูข้อมูลติดต่อ")}
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                  <div style={{ fontSize: "48px", opacity: 0.2 }}>🔍</div>
                </div>
                <p style={{ fontFamily: "'Inter', 'Prompt', sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)" }}>
                  {tri(locale, "No products found", "未找到商品", "ไม่พบสินค้าในอำเภอนี้")}
                </p>
                <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "6px" }}>
                  {tri(locale, "Try selecting a different district.", "请尝试选择其他地区。", "ลองเลือกอำเภออื่น")}
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ─── CONTACT MODAL ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeContactPopup}
            >
              <motion.div
                className="modal-panel"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="modal-hero">
                  <Image
                    src={selectedProduct.image}
                    alt={displayName(selectedProduct)}
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="modal-hero-gradient" />
                  <div className="modal-hero-info">
                    <div className="modal-eyebrow">{tri(locale, "Shop Contact", "商家联系方式", "ข้อมูลติดต่อร้าน")}</div>
                    <h2 className="modal-title">{displayName(selectedProduct)}</h2>
                    <div className="modal-district">{displayDistrict(selectedProduct)} · เชียงใหม่</div>
                  </div>
                  <button className="modal-close-btn" onClick={closeContactPopup}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="modal-body">
                  <p className="modal-desc body-serif">
                    {displayDesc(selectedProduct)}
                  </p>

                  <div className="modal-info-box">
                    <div className="modal-shop-name">{displayShop(selectedProduct)}</div>
                    
                    {(selectedProduct.address || selectedProduct.addressCN || selectedProduct.addressTH) && (
                      <div className="modal-info-row">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4.5-6-8-6-10.5a6 6 0 1112 0C18 13 16 16.5 12 21z" />
                          <circle cx="12" cy="10.5" r="2" fill="currentColor" stroke="none" />
                        </svg>
                        <span>{displayAddr(selectedProduct)}</span>
                      </div>
                    )}
                    
                    {selectedProduct.phone && (
                      <div className="modal-info-row">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.98 2.18 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        <a 
                          href={phoneHref} 
                          style={{ fontWeight: 600, color: "#1d4ed8", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                        >
                          {selectedProduct.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="modal-actions">
                    <a href={phoneHref} className="modal-btn modal-btn-call">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.98 2.18 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      {tri(locale, "Call Shop", "拨打电话", "โทรหาร้าน")}
                    </a>
                    <a href={mapHref} target="_blank" rel="noreferrer" className="modal-btn modal-btn-map">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4.5-6-8-6-10.5a6 6 0 1112 0C18 13 16 16.5 12 21z" />
                        <circle cx="12" cy="10.5" r="2" fill="currentColor" stroke="none" />
                      </svg>
                      {tri(locale, "Open Map", "打开地图", "เปิดแผนที่")}
                    </a>
                    <button type="button" onClick={closeContactPopup} className="modal-btn modal-btn-close">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                      </svg>
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