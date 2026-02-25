"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { products } from "@/src/data/products";

type SortType = "default" | "price-asc" | "price-desc";
type Product = (typeof products)[number];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function RefactoredProductShowcase() {
  const locale = useLocale();
  const isEn = locale === "en";

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [sortType, setSortType] = useState<SortType>("default");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

  const closeContactPopup = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeContactPopup();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isEn ? "en-US" : "zh-CN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price / 100);
  };

  const allDistricts = Array.from(new Set(products.map((product) => product.district))).sort();

  let filteredProducts = products;
  if (selectedDistrict !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.district === selectedDistrict);
  }

  if (sortType === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortType === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const phoneHref = selectedProduct ? `tel:${selectedProduct.phone.replace(/\s+/g, "")}` : "#";
  const mapHref = selectedProduct
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedProduct.address)}`
    : "#";

  return (
    <div className="min-h-screen text-gray-900 antialiased">
      <header className="relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h1 className="mb-4 text-5xl font-extrabold leading-tight md:text-6xl">
              {isEn ? "Find Local OTOP Products" : "探索本地 OTOP 产品"}
            </h1>
            <p className="mb-6 max-w-xl text-lg text-gray-600">
              {isEn
                ? "Browse products by district and open each product contact popup to call the shop or open its map location instantly."
                : "按地区浏览商品，并通过每件商品的联系弹窗直接拨打电话或打开地图导航。"}
            </p>

            <a
              href="#products"
              className="inline-flex items-center gap-3 rounded-md bg-gray-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              {isEn ? "Browse Products" : "浏览商品"}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            onClick={() => setSelectedProduct(products[0])}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={products[0].image}
                alt={products[0].name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[30rem] w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 max-w-xs rounded-lg bg-white/90 p-4 shadow-md backdrop-blur">
                <h3 className="text-lg font-bold">
                  {isEn ? products[0].name : products[0].nameCN}
                </h3>
                <p className="text-sm text-gray-600">{formatPrice(products[0].price)}</p>
                <p className="mt-1 text-xs font-semibold text-orange-700">
                  {isEn ? "Tap to view contact" : "点击查看联系方式"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main id="products" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500">
                {isEn ? "Complete Collection" : "完整系列"}
              </p>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                {isEn ? "Products With Direct Contact" : "可直接联系商家的商品"}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {isEn
                  ? `Showing ${filteredProducts.length} products`
                  : `共显示 ${filteredProducts.length} 件商品`}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                {isEn ? "Sort by Price" : "按价格排序"}
              </label>
              <select
                value={sortType}
                onChange={(event) => setSortType(event.target.value as SortType)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="default">{isEn ? "Default" : "默认"}</option>
                <option value="price-asc">{isEn ? "Low to High" : "价格从低到高"}</option>
                <option value="price-desc">{isEn ? "High to Low" : "价格从高到低"}</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                {isEn ? "Filter by District" : "按地区筛选"}
              </label>
              <select
                value={selectedDistrict}
                onChange={(event) => setSelectedDistrict(event.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">{isEn ? "All Districts" : "全部地区"}</option>
                {allDistricts.map((district) => (
                  <option key={district} value={district}>
                    {isEn
                      ? district
                      : products.find((product) => product.district === district)?.districtCN || district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${selectedDistrict}-${sortType}`}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProducts.map((product) => (
            <motion.article
              key={product.id}
              variants={itemVariants}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-64 w-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 transition-opacity ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{isEn ? product.name : product.nameCN}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.icon} {isEn ? product.nameCN : product.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {isEn ? product.district : product.districtCN}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold">{formatPrice(product.price)}</div>
                    <div className="text-sm text-yellow-500">★★★★★</div>
                  </div>
                </div>

                <p className="line-clamp-2 text-sm text-gray-600">
                  {isEn ? product.description : product.descriptionCN}
                </p>

                <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {isEn ? "Seller" : "商家"}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm font-semibold text-gray-900">
                    {isEn ? product.shopName : product.shopNameCN}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{product.phone}</p>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
                >
                  {isEn ? "View Contact Popup" : "打开联系方式弹窗"}
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">
              {isEn ? "No products found in this district." : "该地区暂无商品。"}
            </p>
          </div>
        )}
      </main>

      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`product-contact-title-${selectedProduct.id}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
          onClick={closeContactPopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
          >
            <div className="relative h-44 overflow-hidden sm:h-52">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/35 to-transparent" />
              <div className="absolute bottom-4 left-5 right-14 flex items-end justify-between gap-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
                    {isEn ? "Shop Contact" : "商家联系方式"}
                  </p>
                  <h2 id={`product-contact-title-${selectedProduct.id}`} className="mt-1 text-2xl font-bold leading-tight">
                    {isEn ? selectedProduct.name : selectedProduct.nameCN}
                  </h2>
                  <p className="mt-1 text-xs text-orange-100">
                    {isEn ? selectedProduct.district : selectedProduct.districtCN}
                  </p>
                </div>
                <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                  {formatPrice(selectedProduct.price)}
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6 sm:p-7">
              <p className="text-sm leading-relaxed text-gray-600">
                {isEn ? selectedProduct.description : selectedProduct.descriptionCN}
              </p>

              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-white p-5">
                <h3 className="text-lg font-bold text-gray-900">
                  {isEn ? selectedProduct.shopName : selectedProduct.shopNameCN}
                </h3>
                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-base">📍</span>
                    <p className="leading-relaxed">
                      {isEn ? selectedProduct.address : selectedProduct.addressCN}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base">📞</span>
                    <a href={phoneHref} className="font-semibold text-blue-700 transition hover:text-blue-900">
                      {selectedProduct.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
                >
                  {isEn ? "Call Shop" : "拨打电话"}
                </a>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                >
                  {isEn ? "Open Map" : "打开地图"}
                </a>
                <button
                  type="button"
                  onClick={closeContactPopup}
                  className="inline-flex items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-900 transition hover:bg-orange-100"
                >
                  {isEn ? "Close" : "关闭"}
                </button>
              </div>
            </div>

            <button
              onClick={closeContactPopup}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-sm font-bold text-gray-700 shadow transition hover:bg-white"
              aria-label="Close popup"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
