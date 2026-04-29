import { ShieldAlert, Ambulance, Flame, Waves, Siren, CarFront, Globe, Phone } from "lucide-react";
import { ReactNode } from "react";

export type Locale = 'th' | 'en' | 'zh';
type LocalizedString = Record<Locale, string>;

// --- Interface ---
export interface EmergencyItem {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  number: string;
  icon?: ReactNode;
  color: string;
  serviceHours?: LocalizedString;
  serviceDays?: LocalizedString;
  fee?: LocalizedString;
}

export interface EmergencyCategory {
  categoryTitle: LocalizedString;
  items: EmergencyItem[];
}

// --- Page Static Text (หัวข้อต่างๆ ในหน้า) ---
export const PAGE_UI = {
  subtitle: { th: "เชียงใหม่ · บริการฉุกเฉิน", en: "Chiang Mai · Emergency Services", zh: "清迈 · 紧急服务" },
  titleMain: { th: "เบอร์", en: "Emergency", zh: "紧急" },
  titleSub: { th: "ฉุกเฉิน", en: "Numbers", zh: "热线" },
  statusBadge: { th: "พร้อมให้บริการ", en: "Ready to serve", zh: "随时待命" },
  policeHeroTitle: { th: "ตำรวจ—แจ้งเหตุเหตุด่วนเหตุร้าย", en: "Police — Emergency Call", zh: "警察 — 紧急报案" },
  policeHeroDesc: { th: "กดโทรได้เลย • ฟรีทุกเครือข่าย • 24 ชั่วโมง", en: "Call now • Toll-free • 24/7 Service", zh: "即刻拨打 • 所有网络免费 • 24小时服务" },

  // คำแปลใหม่สำหรับ Modal
  modalHint: { th: "แตะปุ่มด้านล่างเพื่อโทรทันที", en: "Tap the button below to call now", zh: "点击下方按钮立即拨打" },
  modalHours: { th: "เวลาให้บริการ", en: "Service Hours", zh: "服务时间" },
  modalDays: { th: "วันให้บริการ", en: "Service Days", zh: "服务天数" },
  modalFee: { th: "ค่าโทร", en: "Call Fee", zh: "通话费用" },
  modalNumber: { th: "หมายเลข", en: "Number", zh: "号码" },
  btnCall: { th: "โทรเลย", en: "Call Now", zh: "立即拨打" },
  btnClose: { th: "ปิด", en: "Close", zh: "关闭" }
};

// --- Contacts Data ---
export const EMERGENCY_SECTIONS: EmergencyCategory[] = [
  {
    categoryTitle: { th: "การแพทย์ฉุกเฉิน", en: "Medical Emergency", zh: "医疗急救" },
    items: [
      {
        id: "1669",
        title: { th: "รถพยาบาล / กู้ชีพ", en: "Ambulance / Rescue", zh: "救护车 / 急救" },
        desc: { th: "อุบัติเหตุ • เจ็บป่วยฉุกเฉิน • หัวใจ", en: "Accident • Emergency • Heart Attack", zh: "事故 • 紧急疾病 • 心脏病" },
        number: "1669",
        icon: <Ambulance className="w-8 h-8 text-red-500" />,
        color: "text-red-500",
        serviceHours: { th: "ตลอด 24 ชั่วโมง", en: "24 Hours", zh: "24 小时" },
        serviceDays: { th: "ทุกวัน", en: "Everyday", zh: "每天" },
        fee: { th: "ฟรี", en: "Free", zh: "免费" }
      },
      {
        id: "199",
        title: { th: "ดับเพลิง", en: "Fire Department", zh: "消防部门" },
        desc: { th: "เพลิงไหม้ • ระเบิด • สารเคมี", en: "Fire • Explosion • Chemical Leak", zh: "火灾 • 爆炸 • 化学泄漏" },
        number: "199",
        icon: <Flame className="w-8 h-8 text-orange-600" />,
        color: "text-red-500"
      },
      {
        id: "1199",
        title: { th: "กู้ภัยทางน้ำ", en: "Water Emergency", zh: "水上救援" },
        desc: { th: "จมน้ำ • อุทกภัย • ท่อประปาแตก", en: "Drowning • Flood • Pipe Burst", zh: "溺水 • 洪水 • 管道爆裂" },
        number: "1199",
        icon: <Waves className="w-8 h-8 text-blue-500" />,
        color: "text-green-500"
      }
    ]
  },
  {
    categoryTitle: { th: "บริการนักท่องเที่ยวและทั่วไป", en: "Tourist & General Services", zh: "游客与一般服务" },
    items: [
      {
        id: "1155",
        title: { th: "ตำรวจท่องเที่ยว", en: "Tourist Police", zh: "旅游警察" },
        desc: { th: "ดูแลความปลอดภัยนักท่องเที่ยว", en: "Security for tourists", zh: "保障游客安全" },
        number: "1155",
        color: "text-blue-500"
      },
      {
        id: "1193",
        title: { th: "ตำรวจทางหลวง", en: "Highway Police", zh: "公路警察" },
        desc: { th: "อุบัติเหตุบนทางหลวงทั่วประเทศ", en: "Highway accidents nationwide", zh: "全国公路事故" },
        number: "1193",
        color: "text-indigo-600"
      },
      {
        id: "053248604",
        title: { th: "ททท. เชียงใหม่", en: "TAT Chiang Mai", zh: "泰国旅游局 (清迈)" },
        desc: { th: "ข้อมูลท่องเที่ยว ร้องเรียน ขอความช่วยเหลือ", en: "Tourism Information Center", zh: "清迈旅游信息中心" },
        number: "053 248 604",
        icon: <Globe className="w-8 h-8 text-emerald-600" />,
        color: "text-emerald-600",
        serviceHours: { th: "08:30-16:30", en: "08:30-16:30", zh: "08:30-16:30" },
        serviceDays: { th: "จันทร์-ศุกร์", en: "Mon-Fri", zh: "周一至周五" },
        fee: { th: "ฟรี", en: "Free", zh: "免费" }
      }
    ]
  }
];