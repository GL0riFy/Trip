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

export interface Currency {
  code: string;
  name: string;
  sub: string;
  iso: string;
  buy?: number; 
  sell?: number; 
  rate?: number;
}

// ข้อมูลพื้นฐานสกุลเงิน
export const BASE_CURRENCY_LIST = [
  { code: 'USD', iso: 'us' },
  { code: 'CNY', iso: 'cn' },
  { code: 'JPY', iso: 'jp' },
  { code: 'EUR', iso: 'eu' },
  { code: 'GBP', iso: 'gb' },
  { code: 'KRW', iso: 'kr' },
  { code: 'SGD', iso: 'sg' },
  { code: 'AUD', iso: 'au' }
];

// Dictionary แบบรวมไว้ที่เดียวกัน
export const t = {
  loading: { th: 'กำลังอัปเดตอัตราแลกเปลี่ยนล่าสุด...', en: 'Updating latest exchange rates...', zh: '正在更新最新汇率...' },
  tagLocation: { th: 'เชียงใหม่ · บริการ', en: 'Chiang Mai · Services', zh: '清迈 · 服务' },
  title: { th: 'บริการแลกเปลี่ยน', en: 'Currency Exchange', zh: '外币兑换' },
  title2: { th: 'เงินตราต่างประเทศ', en: 'Services', zh: '服务' },
  calcTitle: { th: 'คำนวณอัตราแลกเปลี่ยน', en: 'Exchange Rate Calculator', zh: '汇率计算器' },
  amountLabel: { th: 'จำนวนเงิน', en: 'Amount', zh: '金额' },
  receiveLabel: { th: 'ได้รับ (บาท)', en: 'Receive (THB)', zh: '收到 (泰铢)' },
  estRateLabel: { th: 'อัตราแลกเปลี่ยนโดยประมาณ', en: 'Estimated exchange rate', zh: '预估汇率' },
  tableTitle: { th: 'อัตราแลกเปลี่ยน โดยประมาณ', en: 'Estimated Exchange Rates', zh: '预估汇率' },
  thCurrency: { th: 'สกุลเงิน', en: 'Currency', zh: '货币' },
  thBuy: { th: 'ซื้อ (Buy)', en: 'Buy', zh: '买入' },
  thSell: { th: 'ขาย (Sell)', en: 'Sell', zh: '卖出' },
  btnUse: { th: 'ใช้งาน', en: 'Use', zh: '使用' },
  compareTitle: { th: 'เปรียบเทียบจุดแลกเงินในเชียงใหม่', en: 'Compare Exchange Spots in Chiang Mai', zh: '比较清迈的兑换点' },
  unitRate: { th: 'บาท', en: 'THB', zh: '泰铢' },
  tipsTitle: { th: 'ข้อแนะนำในการแลกเงิน', en: 'Money Exchange Tips', zh: '兑换货币提示' },
  infoTitle: { th: 'ข้อควรทราบเกี่ยวกับข้อมูลอัตราแลกเปลี่ยน', en: 'Important Notes on Exchange Rates', zh: '关于汇率信息的重要提示' },
  infoDesc1: { 
    th: 'อัตราแลกเปลี่ยนที่แสดงผลมีการหน่วงเวลา (Delay) ประมาณ 24 ชั่วโมง และเป็นเพียงการคำนวณเบื้องต้นเพื่อความสะดวกในการวางแผนเดินทางเท่านั้น ราคาจริงอาจมีการเปลี่ยนแปลงตามความผันผวนของตลาดและนโยบายของแต่ละจุดให้บริการ', 
    en: 'Displayed exchange rates have an approximate 24-hour delay and are preliminary calculations for travel planning convenience. Actual rates may vary based on market fluctuations and individual provider policies.', 
    zh: '显示的汇率有大约 24 小时的延迟，仅作为方便您规划行程的初步计算。实际价格可能会根据市场波动和各服务点的政策而有所变化。' 
  },
  infoDesc2: { 
    th: 'โปรดตรวจสอบราคาปัจจุบัน ณ จุดบริการอีกครั้งก่อนทำการแลกเปลี่ยนจริง', 
    en: 'Please verify the current rate at the physical service point before making a transaction.', 
    zh: '实际兑换前，请再次在服务点核实当前价格。' 
  },
  updatedAt: { th: 'อัปเดตล่าสุด', en: 'Last updated', zh: '最后更新' },
  
  // แปลชื่อสกุลเงิน
  currencies: {
    USD: { name: { th: 'ดอลลาร์สหรัฐ', en: 'US Dollar', zh: '美元' }, sub: { th: 'สหรัฐอเมริกา', en: 'USA', zh: '美国' } },
    CNY: { name: { th: 'หยวนจีน', en: 'Chinese Yuan', zh: '人民币' }, sub: { th: 'จีน', en: 'China', zh: '中国' } },
    JPY: { name: { th: 'เยนญี่ปุ่น', en: 'Japanese Yen', zh: '日元' }, sub: { th: 'ญี่ปุ่น', en: 'Japan', zh: '日本' } },
    EUR: { name: { th: 'ยูโร', en: 'Euro', zh: '欧元' }, sub: { th: 'สหภาพยุโรป', en: 'European Union', zh: '欧盟' } },
    GBP: { name: { th: 'ปอนด์สเตอร์ลิง', en: 'British Pound', zh: '英镑' }, sub: { th: 'สหราชอาณาจักร', en: 'United Kingdom', zh: '英国' } },
    KRW: { name: { th: 'วอนเกาหลีใต้', en: 'South Korean Won', zh: '韩元' }, sub: { th: 'เกาหลีใต้', en: 'South Korea', zh: '韩国' } },
    SGD: { name: { th: 'ดอลลาร์สิงคโปร์', en: 'Singapore Dollar', zh: '新加坡元' }, sub: { th: 'สิงคโปร์', en: 'Singapore', zh: '新加坡' } },
    AUD: { name: { th: 'ดอลลาร์ออสเตรเลีย', en: 'Australian Dollar', zh: '澳元' }, sub: { th: 'ออสเตรเลีย', en: 'Australia', zh: '澳大利亚' } }
  },

  // ข้อมูลคำแนะนำ (Tips)
  tips: [
    {
      title: { th: 'SuperRich ให้ดีที่สุด', en: 'SuperRich Gives the Best Rates', zh: 'SuperRich 汇率最好' },
      desc: { th: 'SuperRich (ป้ายสีเขียว) ให้อัตราสูงกว่าธนาคารทั่วไป 1-2% และมักจะเป็นเรทที่ดีที่สุดในเชียงใหม่ **ต้องใช้พาสปอร์ตตัวจริงเท่านั้น**', en: 'SuperRich (Green sign) offers 1-2% higher rates than regular banks and is usually the best in Chiang Mai. **Original passport required.**', zh: 'SuperRich（绿牌）提供的汇率比普通银行高 1-2%，通常是清迈最好的汇率。**必须出示护照原件。**' }
    },
    {
      title: { th: 'ตู้ ATM ค่าธรรมเนียมสูง', en: 'High ATM Fees', zh: 'ATM 手续费高' },
      desc: { th: 'การกดเงินจากตู้ ATM ต่างชาติในไทยมีค่าธรรมเนียมประมาณ 220 บาทต่อครั้ง และเรทธนาคารมักจะไม่คุ้มเท่าการแลกเงินสด', en: 'Withdrawing from foreign ATMs in Thailand costs about 220 THB per transaction, and bank exchange rates are often less favorable than cash.', zh: '在泰国使用外国 ATM 取款每次需缴纳约 220 泰铢手续费，且银行汇率通常不如现金兑换划算。' }
    },
    {
      title: { th: 'Wise / Revolut ดีสำหรับโอน', en: 'Wise / Revolut for Transfers', zh: 'Wise / Revolut 适合转账' },
      desc: { th: 'หากคุณมีบัญชี Wise หรือ Revolut การใช้บัตรจ่ายโดยตรงหรือโอนเข้าบัญชีไทยจะได้เรทกลางตลาด (Mid-market rate) ที่คุ้มค่ามาก', en: 'If you use Wise or Revolut, paying directly by card or transferring to a Thai account provides highly cost-effective mid-market rates.', zh: '如果您有 Wise 或 Revolut 账户，直接使用银行卡支付或转账到泰国账户可获得中间市场汇率，非常划算。' }
    },
    {
      title: { th: 'ระวังเครื่องแลกเงินอัตโนมัติ', en: 'Beware of Automated Kiosks', zh: '当心自动兑换机' },
      desc: { th: 'เครื่องแลกเงินตามจุดท่องเที่ยวอาจดูสะดวก แต่ควรตรวจสอบเรทให้ดีก่อนกดยืนยัน เพราะมักจะมีค่าธรรมเนียมแฝงหรือเรทที่ต่ำกว่าปกติ', en: 'Exchange machines at tourist spots seem convenient, but verify rates before confirming, as they often include hidden fees or lower margins.', zh: '旅游景点的兑换机可能看起来很方便，但在确认之前请仔细检查汇率，因为它们通常有隐藏费用或较低的汇率。' }
    }
  ],

  // ข้อมูลสถานที่เปรียบเทียบ
  providers: [
    { 
      name: { th: 'SuperRich เชียงใหม่', en: 'SuperRich Chiang Mai', zh: '清迈 SuperRich' }, 
      location: { th: 'ถนนช้างคลาน - ใกล้ Night Bazaar', en: 'Chang Klan Rd - Near Night Bazaar', zh: '长康路 - 靠近夜市' }, 
      tag: { th: 'อัตราดีที่สุด', en: 'Best Rate', zh: '最佳汇率' }, 
      color: '#10B981', rateDiff: 0.05, tagColor: 'bg-yellow-100 text-yellow-700' 
    },
    { 
      name: { th: 'SuperRich (สีเขียว)', en: 'SuperRich (Green)', zh: 'SuperRich (绿牌)' }, 
      location: { th: 'เซ็นทรัลเฟสติวัล ชั้น 4', en: 'Central Festival 4th Floor', zh: '尚泰清迈购物中心 4 楼' }, 
      tag: { th: 'อัตราดีที่สุด', en: 'Best Rate', zh: '最佳汇率' }, 
      color: '#3B82F6', rateDiff: 0.02, tagColor: 'bg-blue-100 text-blue-700' 
    },
    { 
      name: { th: 'ย่านท่าแพ', en: 'Tha Phae Area', zh: '塔佩门区域' }, 
      location: { th: 'ถนนช้างคลาน - ใกล้ Night Bazaar', en: 'Chang Klan Rd - Near Night Bazaar', zh: '长康路 - 靠近夜市' }, 
      tag: { th: 'สะดวก', en: 'Convenient', zh: '方便' }, 
      color: '#F59E0B', rateDiff: -0.35, tagColor: 'bg-yellow-50 text-yellow-600' 
    },
    { 
      name: { th: 'ธนาคารทั่วไป', en: 'General Banks', zh: '一般银行' }, 
      location: { th: 'ธนาคารทั่วไปในเชียงใหม่', en: 'General Banks in Chiang Mai', zh: '清迈的一般银行' }, 
      tag: { th: 'ธนาคาร', en: 'Bank', zh: '银行' }, 
      color: '#10B981', rateDiff: -0.85, tagColor: 'bg-green-100 text-green-700' 
    },
    { 
      name: { th: 'มาย่า ไลฟ์สไตล์', en: 'MAYA Lifestyle', zh: '玛雅购物中心' }, 
      location: { th: 'ถนนนิมมานเหมินท์', en: 'Nimman Rd', zh: '宁曼路' }, 
      tag: { th: 'สะดวก', en: 'Convenient', zh: '方便' }, 
      color: '#F59E0B', rateDiff: -0.55, tagColor: 'bg-yellow-50 text-yellow-600' 
    },
    { 
      name: { th: 'Wise / Revolut', en: 'Wise / Revolut', zh: 'Wise / Revolut' }, 
      location: { th: 'โอนเงินออนไลน์', en: 'Online Transfer', zh: '在线转账' }, 
      tag: { th: 'ออนไลน์', en: 'Online', zh: '在线' }, 
      color: '#0F172A', rateDiff: -0.15, tagColor: 'bg-cyan-100 text-cyan-700' 
    }
  ]
};

