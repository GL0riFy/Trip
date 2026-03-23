"use client";
// app/[locale]/travel/[district]/DistrictPageClient.tsx
// ✅ Client Component — animations, hooks, framer-motion ทั้งหมดอยู่ที่นี่

import Link from "next/link";
import { motion, useScroll, useTransform, cubicBezier, type Variants } from "framer-motion";
import { useRef } from "react";
import TripMapModal, { type TripMapEntry } from "@/app/components/TripMapModal";
import DistrictBg from "@/app/components/DistrictBg";
import DistrictHistorySection from "@/app/components/DistrictHistorySection";
import type { DistrictOTOP, DistrictTrip } from "@/src/data/district-trips";
import { products } from "@/src/data/products";
import { verifiedDistrictLocationOverrides } from "@/src/data/verified-product-locations";

// ─── Easing ───────────────────────────────────────────────────────────────────
// Framer Motion v11+ ต้องใช้ cubicBezier() แทน number[] ใน Variants

const easeExpOut = cubicBezier(0.16, 1, 0.3, 1);

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: easeExpOut,
    },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeExpOut },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: easeExpOut,
    },
  }),
};

const dividerVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: easeExpOut, delay: 0.3 },
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  locale: "en" | "zh" | "th";
  district: string;
  trips: DistrictTrip[];
  otop: DistrictOTOP[];
  districtName: string;
};

// Helper function to convert "Chai Prakan" to "chai-prakan"
const slugify = (text?: string) => (text ?? "").toLowerCase().replace(/\s+/g, "-");
const SKIP_LOCATION_UPDATE_IDS = new Set([1, 2, 3, 4, 6, 7, 8]);

// ─── Component ────────────────────────────────────────────────────────────────

export default function DistrictPageClient({ locale, district, trips, otop, districtName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.4]);

  // Add product markers on district map and align coordinates with each district's OTOP points.
  const districtSlug = slugify(district);
  const districtProducts = products.filter((product) => slugify(product.district) === districtSlug);
  const districtOverrides =
    districtProducts.length > 0
      ? verifiedDistrictLocationOverrides[districtProducts[0].district] ?? []
      : [];

  const productMapLocations: TripMapEntry[] = districtProducts
    .map((product, index) => {
      const refLocation = otop.length > 0 ? otop[index % otop.length]?.detail_more : undefined;
      const shouldUseVerifiedLocation = !SKIP_LOCATION_UPDATE_IDS.has(product.id);
      const override =
        districtOverrides.length > 0
          ? districtOverrides[index] ?? districtOverrides[districtOverrides.length - 1]
          : undefined;
      const addrForMap =
        locale === "th"
          ? product.addressTH ?? product.address
          : locale === "zh"
            ? product.addressCN
            : product.address;
      const fallbackMapQuery =
        addrForMap ||
        [product.shopName, addrForMap]
          .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
          .join(", ");
      const location =
        locale === "zh"
          ? shouldUseVerifiedLocation
            ? override?.addressCN || product.addressCN
            : product.addressCN
          : locale === "th"
            ? shouldUseVerifiedLocation
              ? override?.address || product.addressTH || product.address
              : product.addressTH || product.address
            : shouldUseVerifiedLocation
              ? override?.address || product.address
              : product.address;
      const mapsQuery = shouldUseVerifiedLocation
        ? override?.mapsQuery || fallbackMapQuery || undefined
        : fallbackMapQuery || undefined;

      return {
        id: `product-${product.id}`,
        title: {
          en: product.name,
          zh: product.nameCN,
          th: product.nameTH ?? product.name,
        },
        price: {
          en: `${product.price} THB`,
          zh: `${product.price} 泰铢`,
          th: `${product.price} บาท`,
        },
        hours: {
          en: "Contact seller for opening hours",
          zh: "营业时间请联系商家",
          th: "สอบถามเวลาเปิดร้านกับผู้ขาย",
        },
        detail: {
          en: product.description,
          zh: product.descriptionCN,
          th: product.descriptionTH ?? product.description,
        },
        detail_more: {
          img: product.image,
          lat: refLocation?.lat,
          lng: refLocation?.lng,
          location,
          mapsQuery,
          video: "",
          credit: "",
        },
      };
    })
    .filter(
      (productLocation) =>
        typeof productLocation.detail_more.lat === "number" &&
        typeof productLocation.detail_more.lng === "number"
    );

  // Combine trips and products for map display.
  const combinedLocations: TripMapEntry[] = [
    ...(trips as TripMapEntry[]),
    ...productMapLocations,
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen text-white"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      <DistrictBg district={district} />

      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Birthstone&display=swap');
        .back-link:hover .arrow { transform: translateX(-4px); }
        .arrow { transition: transform 0.2s ease; display: inline-block; }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,163,87,0.4), transparent);
          transform-origin: left;
        }
      `}</style>

      {/* ── Ambient glow blobs (parallax) ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <motion.div style={{ y: blobY1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
          <div style={{ position: "absolute", top: "-10%", right: "5%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,163,87,0.08) 0%, transparent 70%)" }} />
        </motion.div>
        <motion.div style={{ y: blobY2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}>
          <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,172,190,0.06) 0%, transparent 70%)" }} />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:px-8">

        {/* ── Back link ── */}
        <motion.div variants={slideLeft} initial="hidden" animate="visible">
          <Link
            href={`/${locale}/travel`}
            className="back-link inline-flex items-center gap-2 mb-12 opacity-60 hover:opacity-100 transition-opacity"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.05em", textDecoration: "none", color: "inherit" }}
          >
            <span className="arrow">←</span>
            <span>All Districts</span>
          </Link>
        </motion.div>

        {/* ── Hero header ── */}
        <motion.header className="mb-16" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4a357", marginBottom: 12 }}
          >
            Chiang Mai Province · Thailand
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{ fontFamily: "'Birthstone', cursive", fontSize: "clamp(48px, 8vw, 110px)", fontWeight: 400, lineHeight: 1, marginBottom: 20, textShadow: "0 6px 40px rgba(0,0,0,0.6)" }}
          >
            {districtName}
          </motion.h1>

          <motion.div
            className="divider"
            variants={dividerVariant} initial="hidden" animate="visible"
            style={{ maxWidth: 120 }}
          />

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 16 }}
          >
            {trips.length} curated experiences
          </motion.p>
        </motion.header>

        {/* ── Interactive Map ── */}
        <motion.section
          className="mb-20"
          variants={scaleIn} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="flex items-center gap-3 mb-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span
              style={{ fontSize: 20 }}
              animate={{ rotate: [0, 10, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            >
              🗺
            </motion.span>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              Explore the Area
            </h2>
          </motion.div>
          <TripMapModal
            trips={combinedLocations}
            locale={locale}
            districtName={districtName}
            districtId={district}
          />
        </motion.section>

        {/* ── History Section ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <DistrictHistorySection
            districtId={district}
            districtName={districtName}
            locale={locale}
          />
        </motion.div>

        {/* ── Footer ── */}
        <motion.div className="divider mt-24" variants={dividerVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} />
        <motion.p
          variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#d4a357", textAlign: "center", marginTop: 20, letterSpacing: "0.1em" }}
        >
          {districtName} · Chiang Mai · Thailand
        </motion.p>
      </div>
    </div>
  );
}
