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

export interface EssentialApp {
  id: string;
  category: 'transport' | 'hotel' | 'food' | 'money' | 'health' | 'comm';
  name: string;
  featured: boolean;
  image: string;
  rating: string;
  appStoreUrl: string;
  playStoreUrl: string;
  desc: LocalizedString;
  tags: LocalizedString[];
}

export const ESSENTIAL_APPS: EssentialApp[] = [
  {
    id: 'grab',
    category: 'transport',
    name: 'Grab',
    featured: true,
    image: '/apps/grab.png',
    rating: '4.8',
    appStoreUrl: 'https://apps.apple.com/app/grab-superapp/id647268330',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger',
    desc: {
      th: 'Super app ที่ครบครันที่สุด เรียกแท็กซี่ มอเตอร์ไซค์ สั่งอาหาร ส่งพัสดุ จ่ายเงินในแอปเดียว (ครอบคลุมทั่วเชียงใหม่)',
      en: 'The ultimate super app. Book taxis, motorbikes, order food, deliver parcels, and pay all in one place (covers all of Chiang Mai).',
      zh: '功能最全的超级应用。打车、呼叫摩托、点外卖、寄快递和手机支付一站式搞定（覆盖清迈全境）。'
    },
    tags: [
      { th: 'ใช้ได้ 8 ประเทศ', en: '8 Countries', zh: '覆盖8个国家' },
      { th: 'หลายช่องทางชำระเงิน', en: 'Multiple Payments', zh: '多种支付方式' },
      { th: 'สั่งอาหารได้', en: 'Food Delivery', zh: '支持外卖' }
    ]
  },
  {
    id: 'bolt',
    category: 'transport',
    name: 'Bolt',
    featured: false,
    image: '/apps/Bolt.png',
    rating: '4.6',
    appStoreUrl: 'https://apps.apple.com/app/bolt-request-a-ride/id675033630',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=ee.mtakso.client',
    desc: {
      th: 'ราคาประหยัดกว่า Grab เฉลี่ย 10–20% เหมาะสำหรับเส้นทางในเมือง',
      en: 'Cheaper than Grab by 10–20% on average. Ideal for short routes within the city.',
      zh: '价格平均比 Grab 便宜 10-20%。非常适合市区内的短途出行。'
    },
    tags: [
      { th: 'ประหยัด', en: 'Budget-friendly', zh: '性价比高' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'maxim',
    category: 'transport',
    name: 'Maxim',
    featured: false,
    image: '/apps/Maxim.png',
    rating: '4.4',
    appStoreUrl: 'https://apps.apple.com/app/maxim-order-a-taxi/id1533652452',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.taxsee.taxsee',
    desc: {
      th: 'บริการแท็กซี่และมอเตอร์ไซค์ราคาต่ำสุด นิยมใช้ในเชียงใหม่และต่างจังหวัด',
      en: 'Offers the lowest rates for taxi and motorbike services. Very popular in Chiang Mai and rural provinces.',
      zh: '提供最低廉的出租车和摩托车服务。在清迈及外府地区非常受欢迎。'
    },
    tags: [
      { th: 'ราคาถูก', en: 'Lowest Price', zh: '价格最低' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'muvmi',
    category: 'transport',
    name: 'MuvMi',
    featured: false,
    image: '/apps/MuvMi.png',
    rating: '4.3',
    appStoreUrl: '',
    playStoreUrl: '',
    desc: {
      th: 'รถตุ๊กตุ๊กไฟฟ้าและมอเตอร์ไซค์ เหมาะเส้นทางสั้น เป็นมิตรกับสิ่งแวดล้อม',
      en: 'Electric Tuk-Tuks and motorbikes. Perfect for short distances and eco-friendly.',
      zh: '提供电动嘟嘟车和摩托车服务。非常环保，适合短距离代步。'
    },
    tags: [
      { th: 'อีโค่', en: 'Eco-friendly', zh: '绿色环保' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: '12go',
    category: 'transport',
    name: '12Go Asia',
    featured: false,
    image: '/apps/12Go.png',
    rating: '4.5',
    appStoreUrl: 'https://apps.apple.com/app/12go-train-bus-ferry-flight/id1563771466',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=asia.twelvego.android',
    desc: {
      th: 'จองตั๋วรถไฟ รถบัส เครื่องบินข้ามจังหวัด/ประเทศ ไว้ใจได้ มีตั๋วส่งทันที',
      en: 'Book trains, buses, and flights across provinces/countries. Reliable with instant ticket delivery.',
      zh: '预订跨省或跨国的火车、巴士和航班。安全可靠，车票即时发送。'
    },
    tags: [
      { th: 'ระหว่างประเทศ', en: 'International', zh: '国际交通' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'agoda',
    category: 'hotel',
    name: 'Agoda',
    featured: true,
    image: '/apps/Agoda.png',
    rating: '4.8',
    appStoreUrl: 'https://apps.apple.com/app/agoda-hotels-booking-deals/id440676901',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.agoda.mobile.consumer',
    desc: {
      th: 'แพลตฟอร์มจองโรงแรมที่แข็งแกร่งที่สุดในเอเชีย มีที่พักกว่า 2 ล้านแห่งทั่วโลก ราคาดีเป็นพิเศษสำหรับโรงแรมในไทย',
      en: 'The strongest hotel booking platform in Asia with over 2M properties worldwide. Exceptionally good rates for Thailand.',
      zh: '亚洲最强大的酒店预订平台，提供全球超过200万家住宿。预订泰国酒店的价格极具优势。'
    },
    tags: [
      { th: 'ราคาพิเศษ', en: 'Special Rates', zh: '特价优惠' },
      { th: 'สะสมแต้มได้', en: 'Earn Points', zh: '积分奖励' },
      { th: 'ยืนยันทันที', en: 'Instant Booking', zh: '即时确认' }
    ]
  },
  {
    id: 'booking',
    category: 'hotel',
    name: 'Booking.com',
    featured: false,
    image: '/apps/Booking.png',
    rating: '4.7',
    appStoreUrl: 'https://apps.apple.com/app/booking-com-travel-deals/id367003839',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.booking',
    desc: {
      th: 'ตัวเลือกที่พักหลากหลายที่สุด โรงแรม รีสอร์ท โฮสเทล ยกเลิกฟรีบางแพ็กเกจ',
      en: 'The widest variety of accommodations, including hotels, resorts, and hostels. Offers free cancellation on select packages.',
      zh: '住宿选择最丰富的平台，涵盖酒店、度假村和青年旅舍。部分套餐支持免费取消。'
    },
    tags: [
      { th: 'ยอดนิยม', en: 'Popular', zh: '最受欢迎' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'airbnb',
    category: 'hotel',
    name: 'Airbnb',
    featured: false,
    image: '/apps/Airbnb.png',
    rating: '4.8',
    appStoreUrl: 'https://apps.apple.com/app/airbnb/id401626263',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.airbnb.android',
    desc: {
      th: 'เช่าบ้าน วิลล่า ห้องพักส่วนตัว เหมาะสำหรับครอบครัว หรือกลุ่มเพื่อน',
      en: 'Rent houses, villas, or private rooms. Great for families or friend groups.',
      zh: '租赁整套房屋、别墅或独立房间。非常适合家庭或朋友结伴出游。'
    },
    tags: [
      { th: 'ครอบครัว', en: 'Family-friendly', zh: '适合家庭' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'hostelworld',
    category: 'hotel',
    name: 'Hostelworld',
    featured: false,
    image: '/apps/Hostelworld.png',
    rating: '4.4',
    appStoreUrl: 'https://apps.apple.com/app/hostelworld-travel-app/id348890820',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.hostelworld.app',
    desc: {
      th: 'จองโฮสเทลอันดับ 1 เหมาะสำหรับนักเดินทางคนเดียวหรืองบจำกัด',
      en: 'The #1 hostel booking app. Perfect for solo travelers or those on a strict budget.',
      zh: '排名第一的青年旅舍预订应用。独自旅行者或预算有限人士的首选。'
    },
    tags: [
      { th: 'งบประหยัด', en: 'Budget', zh: '经济实惠' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'gmaps',
    category: 'food',
    name: 'Google Maps',
    featured: true,
    image: '/apps/gmaps.png',
    rating: '4.8',
    appStoreUrl: 'https://apps.apple.com/app/google-maps/id585027354',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps',
    desc: {
      th: 'แผนที่ที่แม่นยำที่สุด นำทางแบบออฟไลน์ได้เมื่อดาวน์โหลดไว้ล่วงหน้า แสดงสภาพจราจรแบบเรียลไทม์ (จำเป็นมากเวลาขึ้นดอย)',
      en: 'The most accurate maps. Navigate offline (if downloaded) and see real-time traffic (crucial for mountain trips).',
      zh: '最精准的地图应用。提前下载即可支持离线导航，并显示实时路况（前往山区时必不可少）。'
    },
    tags: [
      { th: 'ออฟไลน์ได้', en: 'Offline Mode', zh: '支持离线' },
      { th: 'จราจรเรียลไทม์', en: 'Live Traffic', zh: '实时路况' },
      { th: 'รีวิวร้านอาหาร', en: 'Reviews', zh: '餐厅点评' }
    ]
  },
  {
    id: 'wongnai',
    category: 'food',
    name: 'Wongnai',
    featured: false,
    image: '/apps/Wongnai.png',
    rating: '4.5',
    appStoreUrl: 'https://apps.apple.com/app/wongnai/id484206296',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.wongnai.android',
    desc: {
      th: 'แหล่งรวมรีวิวร้านอาหารไทยที่ใหญ่ที่สุด มีเมนู ราคา และรีวิวจากคนพื้นที่',
      en: 'The largest hub for Thai restaurant reviews. Features menus, prices, and insights from locals.',
      zh: '泰国最大的餐厅点评聚合平台。提供详细菜单、价格以及当地人的真实评价。'
    },
    tags: [
      { th: 'เฉพาะไทย', en: 'Thai Only', zh: '专注泰国' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'foodpanda',
    category: 'food',
    name: 'foodpanda',
    featured: false,
    image: '',
    rating: '4.4',
    appStoreUrl: 'https://apps.apple.com/app/foodpanda-food-delivery/id758103884',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.global.foodpanda.android',
    desc: {
      th: 'สั่งอาหารเดลิเวอรี่ ส่งถึงที่พักภายใน 30–45 นาที มีโปรโมชั่นบ่อย',
      en: 'Order food delivery straight to your accommodation within 30–45 mins. Frequent promotions available.',
      zh: '提供外卖配送服务，30-45分钟内送达住处。经常推出各种优惠活动。'
    },
    tags: [
      { th: 'เดลิเวอรี่', en: 'Delivery', zh: '外卖配送' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'gtranslate',
    category: 'food',
    name: 'Google Translate',
    featured: false,
    image: '/apps/translate.png',
    rating: '4.6',
    appStoreUrl: 'https://apps.apple.com/app/google-translate/id414706506',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.google.android.apps.translate',
    desc: {
      th: 'แปลภาษาทันที ถ่ายภาพเมนูหรือป้ายสัญลักษณ์เพื่อแปลได้เลย',
      en: 'Instant translation. Snap a photo of a menu or sign to translate it immediately.',
      zh: '实时翻译神器。只需对着菜单或路标拍照，即可立即获得翻译结果。'
    },
    tags: [
      { th: 'ออฟไลน์', en: 'Offline Mode', zh: '支持离线' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'tripadvisor',
    category: 'food',
    name: 'TripAdvisor',
    featured: false,
    image: '/apps/TripAdvisor.png',
    rating: '4.5',
    appStoreUrl: 'https://apps.apple.com/app/tripadvisor-hotels-restaurants/id284876795',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tripadvisor.tripadvisor',
    desc: {
      th: 'ค้นหาสถานที่ท่องเที่ยว ร้านอาหาร จากรีวิวนักเดินทางทั่วโลก',
      en: 'Find attractions and restaurants based on reviews from travelers worldwide.',
      zh: '根据全球旅行者的真实点评，轻松探索各大景点和优质餐厅。'
    },
    tags: [
      { th: 'วางแผน', en: 'Trip Planner', zh: '行程规划' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'wise',
    category: 'money',
    name: 'Wise',
    featured: true,
    image: '/apps/Wise.png',
    rating: '4.8',
    appStoreUrl: 'https://apps.apple.com/app/wise-international-account/id612261027',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.transferwise.android',
    desc: {
      th: 'โอนเงินระหว่างประเทศเรทกลาง ถอนเงินสดจาก ATM ทั่วโลกได้ฟรีเดือนละ 2 ครั้ง บัตรเดบิตรองรับ 40+ สกุลเงิน',
      en: 'International money transfers at the mid-market rate. 2 free global ATM withdrawals monthly. Debit card supports 40+ currencies.',
      zh: '以中间市场汇率进行国际转账。每月提供2次全球 ATM 免费取款，借记卡支持40多种货币。'
    },
    tags: [
      { th: 'เรทดีที่สุด', en: 'Best Rates', zh: '汇率最优' },
      { th: 'ถอน ATM ฟรี', en: 'Free ATM', zh: '免费取现' },
      { th: '40+ สกุลเงิน', en: '40+ Currencies', zh: '40+ 货币' }
    ]
  },
  {
    id: 'xecurrency',
    category: 'money',
    name: 'XE Currency',
    featured: false,
    image: '/apps/XECurrency.png',
    rating: '4.7',
    appStoreUrl: 'https://apps.apple.com/app/xe-currency-converter/id315241195',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.xe.currency',
    desc: {
      th: 'ตรวจสอบอัตราแลกเปลี่ยนแบบเรียลไทม์ ใช้งานออฟไลน์ได้',
      en: 'Check real-time exchange rates. Works completely offline.',
      zh: '实时查询全球汇率。完全支持离线使用。'
    },
    tags: [
      { th: 'ออฟไลน์', en: 'Offline', zh: '离线功能' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'kplus',
    category: 'money',
    name: 'K PLUS',
    featured: false,
    image: '/apps/Kplus.png',
    rating: '4.6',
    appStoreUrl: 'https://apps.apple.com/app/k-plus/id361190773',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kasikorn.retail.mbanking.wap',
    desc: {
      th: 'แอปธนาคารกสิกรไทย ใช้สแกน QR PromptPay ได้ทันที ปลอดภัย',
      en: 'Kasikorn Bank app. Use it to scan PromptPay QR codes instantly and securely.',
      zh: '开泰银行 (Kasikorn) 官方应用。可用于安全、快速地扫描 PromptPay 二维码付款。'
    },
    tags: [
      { th: 'ธนาคารไทย', en: 'Thai Bank', zh: '泰国银行' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'splitwise',
    category: 'money',
    name: 'Splitwise',
    featured: false,
    image: '/apps/Splitwise.png',
    rating: '4.7',
    appStoreUrl: 'https://apps.apple.com/app/splitwise/id458023433',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.Splitwise.SplitwiseMobile',
    desc: {
      th: 'หารค่าใช้จ่ายกับเพื่อนร่วมเดินทางอย่างง่ายดาย คำนวณหนี้อัตโนมัติ',
      en: 'Easily split expenses with travel buddies. Automatically calculates debts.',
      zh: '轻松与旅伴分摊各项开销。应用会自动为您计算并结清账单。'
    },
    tags: [
      { th: 'หารค่าใช้จ่าย', en: 'Split Bills', zh: '账单分摊' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'bumrungrad',
    category: 'health',
    name: 'Hospital Help',
    featured: true,
    image: '/apps/Hospital.png',
    rating: '4.7',
    appStoreUrl: 'https://apps.apple.com/us/app/hospital-help/id6748514501',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=br.com.eprohealth.unifacisa.hospitalhelp&hl=th',
    desc: {
      th: 'โรงพยาบาลเอกชนชั้นนำ นัดหมายแพทย์ออนไลน์ ดูผลตรวจ และโทรปรึกษาแพทย์ผ่านวิดีโอคอล มีแพทย์หลายภาษา',
      en: 'Top private hospitals. Book appointments online, view results, and consult via video call. Multilingual doctors available.',
      zh: '顶尖的私立医院官方应用。支持在线预约、查看体检报告以及视频问诊，提供多语种医生服务。'
    },
    tags: [
      { th: 'นัดออนไลน์', en: 'Book Online', zh: '在线预约' },
      { th: 'ดูผลตรวจ', en: 'Medical Results', zh: '查看报告' },
      { th: 'ปรึกษาแพทย์', en: 'Telehealth', zh: '视频问诊' }
    ]
  },
  {
    id: 'mapsme',
    category: 'health',
    name: 'maps.me',
    featured: false,
    image: '/apps/maps.me.png',
    rating: '4.5',
    appStoreUrl: 'https://apps.apple.com/app/maps-me-offline-maps-gps-nav/id510623322',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mapswithme.maps.pro',
    desc: {
      th: 'แผนที่ออฟไลน์ 100% สำรองไว้หาก Google Maps ใช้งานไม่ได้บนดอย',
      en: '100% offline maps. A great backup in case Google Maps loses signal in the mountains.',
      zh: '100%纯离线地图。当在山区无法使用 Google Maps 时，这是最好的备用方案。'
    },
    tags: [
      { th: 'ออฟไลน์', en: 'Offline', zh: '纯离线' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'axa',
    category: 'health',
    name: 'AXA',
    featured: false,
    image: '/apps/Axa.png',
    rating: '4.3',
    appStoreUrl: 'https://apps.apple.com/us/app/axa-global-healthcare/id6482987595',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.agh.ipmi.prod&hl=th',
    desc: {
      th: 'แอปประกันเดินทาง ใช้แจ้งเคลมหรือขอความช่วยเหลือฉุกเฉิน 24 ชม.',
      en: 'Travel insurance app. Use for claims or requesting 24/7 emergency assistance.',
      zh: '旅游保险专属应用。可随时随地用于提交理赔或申请 24 小时紧急援助。'
    },
    tags: [
      { th: 'ประกัน', en: 'Insurance', zh: '旅行保险' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'line',
    category: 'comm',
    name: 'LINE',
    featured: true,
    image: '/apps/Line.png',
    rating: '4.8',
    appStoreUrl: 'https://apps.apple.com/app/line/id443904275',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=jp.naver.line.android',
    desc: {
      th: 'แอปแชทที่คนไทยใช้มากที่สุด ร้านค้า โรงแรม และบริการในเชียงใหม่สื่อสารผ่าน LINE เป็นหลัก (แนะนำให้โหลด)',
      en: 'The most used chat app in Thailand. Shops, hotels, and services in Chiang Mai rely on LINE for communication (Highly recommended).',
      zh: '泰国人最常用的聊天软件。清迈的商店、酒店及各类服务业主要通过 LINE 进行沟通（强烈建议下载）。'
    },
    tags: [
      { th: 'แชทฟรี', en: 'Free Chat', zh: '免费聊天' },
      { th: 'สั่งอาหารได้', en: 'Order Food', zh: '可点外卖' },
      { th: 'ชำระเงิน', en: 'Payments', zh: '支持支付' }
    ]
  },
  {
    id: 'whatsapp',
    category: 'comm',
    name: 'WhatsApp',
    featured: false,
    image: '/apps/WhatsApp.png',
    rating: '4.7',
    appStoreUrl: 'https://apps.apple.com/app/whatsapp-messenger/id310633997',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.whatsapp',
    desc: {
      th: 'แชทและโทรฟรีผ่านเน็ต เหมาะสำหรับติดต่อเพื่อนต่างชาติ',
      en: 'Free internet calls and chats. Best for keeping in touch with international friends.',
      zh: '通过网络进行免费的文字聊天和语音通话。非常适合与外国朋友保持联系。'
    },
    tags: [
      { th: 'ยอดนิยม', en: 'Popular', zh: '广泛使用' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'airalo',
    category: 'comm',
    name: 'Airalo (eSIM)',
    featured: false,
    image: '/apps/Airalo.png',
    rating: '4.6',
    appStoreUrl: 'https://apps.apple.com/app/airalo-esim-travel-internet/id1475911720',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mobillium.airalo',
    desc: {
      th: 'ซื้อ eSIM ออนไลน์ก่อนเดินทาง ไม่ต้องเปลี่ยนซิม เชื่อมต่อได้ทันที',
      en: 'Buy eSIMs online before your trip. Connect instantly without swapping physical SIMs.',
      zh: '出行前在线购买 eSIM 卡。无需更换实体 SIM 卡，落地即可直接连网。'
    },
    tags: [
      { th: 'eSIM', en: 'eSIM', zh: 'eSIM 服务' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  },
  {
    id: 'protonvpn',
    category: 'comm',
    name: 'ProtonVPN',
    featured: false,
    image: '/apps/ProtonVPN.png',
    rating: '4.6',
    appStoreUrl: 'https://apps.apple.com/app/proton-vpn-fast-secure/id1437005085',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=ch.protonvpn.android',
    desc: {
      th: 'VPN ฟรี ป้องกันข้อมูลส่วนตัวเมื่อใช้ Wi-Fi โรงแรม หรือร้านกาแฟ',
      en: 'Free VPN to protect your personal data when using hotel or cafe Wi-Fi.',
      zh: '免费安全的 VPN 软件。在连接酒店或咖啡馆的公共 Wi-Fi 时，有效保护您的个人隐私数据。'
    },
    tags: [
      { th: 'ความปลอดภัย', en: 'Security', zh: '隐私安全' },
      { th: 'ฟรี', en: 'Free', zh: '免费' }
    ]
  }
];