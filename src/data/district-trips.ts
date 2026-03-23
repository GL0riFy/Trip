import { ChaiPrakanTrips, ChaiPrakanOTOP } from "@/src/data/chai-prakan/chai-prakan";
import { ChiangDaoTrips, ChiangDaoOTOP } from "@/src/data/chiang-dao/chiang-dao";
import { ChomThongTrips, ChomThongOTOP } from "@/src/data/chom-thong/chom-thong";
import { DoiSaketTrips, DoiSaketOTOP } from "@/src/data/doi-saket/doi-saket";
import { fangTrips, FangOTOP } from "@/src/data/fang/fang";
import { HangDongTrip, HangDongOTOP } from "@/src/data/hang-dong/hang-dong";
import { MaeAiTrips, MaeAiOTOP } from "@/src/data/mae-ai/mae-ai";
import { MaeOnTrip, MaeOnOTOP } from "@/src/data/mae-on/mae-on";
import { MaeRimTrips, MaeRimOTOP } from "@/src/data/mae-rim/mae-rim";
import { MaeTaengTrips, MaeTaengOTOP } from "@/src/data/mae-taeng/mae-taeng";
import { MueangChiangMaiTrip, MueangChiangMaiOTOP } from "@/src/data/mueang-chiang-mai/mueang-chiang-mai";
import { SanKamphaengTrip, SanKamphaengOTOP } from "@/src/data/san-kamphaeng/san-kamphaeng";

export type LocalizedText = {
  en: string;
  zh: string;
  /** Thai; when omitted, Thai locale falls back to English */
  th?: string;
};

/** Pick string for UI by next-intl / route locale */
export function pickLocalized(locale: string, v: LocalizedText): string {
  if (locale === "zh") return v.zh;
  if (locale === "th") return v.th ?? v.en;
  return v.en;
}

export type DistrictTrip = {
  id: string;
  title: LocalizedText;
  price: LocalizedText;
  hours: LocalizedText;
  detail: LocalizedText;
  detail_more: {
    img: string;
    video: string;
    lat?: number;
    lng?: number;
    location?: string;
    credit?: string;
  };
};

export type DistrictOTOP = {
  id: string;
  title: LocalizedText;
  price: LocalizedText;
  hours?: LocalizedText;
  detail: LocalizedText;
  detail_more: {
    location: string;
    lat: number;
    lng: number;
    img: string;
    video: string;
    credit: string;
  };
};

export const districtTrips: Record<string, DistrictTrip[]> = {
  "chai-prakan": ChaiPrakanTrips,
  "chiang-dao": ChiangDaoTrips,
  "chom-thong": ChomThongTrips,
  "doi-saket": DoiSaketTrips,
  fang: fangTrips,
  "hang-dong": HangDongTrip,
  "mae-ai": MaeAiTrips,
  "mae-on": MaeOnTrip,
  "mae-rim": MaeRimTrips,
  "mae-taeng": MaeTaengTrips,
  "mueang-chiang-mai": MueangChiangMaiTrip,
  "san-kamphaeng": SanKamphaengTrip,
};

export const districtOTOP: Record<string, DistrictOTOP[]> = {
  "chai-prakan": ChaiPrakanOTOP,
  "chiang-dao": ChiangDaoOTOP,
  "chom-thong": ChomThongOTOP,
  "doi-saket": DoiSaketOTOP,
  fang: FangOTOP,
  "hang-dong": HangDongOTOP,
  "mae-ai": MaeAiOTOP,
  "mae-on": MaeOnOTOP,
  "mae-rim": MaeRimOTOP,
  "mae-taeng": MaeTaengOTOP,
  "mueang-chiang-mai": MueangChiangMaiOTOP,
  "san-kamphaeng": SanKamphaengOTOP,
};
