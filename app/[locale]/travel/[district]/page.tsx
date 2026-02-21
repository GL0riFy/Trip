// app/[locale]/travel/[district]/page.tsx
// ✅ Server Component — ห้ามมี "use client" เพราะต้องใช้ generateStaticParams

import { notFound } from "next/navigation";
import { districts } from "@/src/data/chiangmai-districts";
import { districtTrips } from "@/src/data/district-trips";
import DistrictPageClient from "./DistrictPageClient";

type DistrictPageProps = {
  params: Promise<{ locale: string; district: string }>;
};

function getDistrictName(districtId: string): string {
  return districtId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// ✅ ต้องอยู่ใน Server Component เท่านั้น
export function generateStaticParams() {
  return districts.map((district) => ({
    district: district.id,
  }));
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const { locale, district } = await params;
  const normalizedLocale: "en" | "zh" = locale === "zh" ? "zh" : "en";
  const districtExists = districts.some((item) => item.id === district);

  if (!districtExists) notFound();

  const trips = districtTrips[district] ?? [];
  const districtName = getDistrictName(district);

  // ส่งข้อมูลทั้งหมดเข้า Client Component
  return (
    <DistrictPageClient
      locale={normalizedLocale}
      district={district}
      trips={trips}
      districtName={districtName}
    />
  );
}