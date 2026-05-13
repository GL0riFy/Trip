import { tag } from "@turf/turf";
import { th } from "framer-motion/client";

export const HangDongTrips = [
  {
    id: "Grand-Canyon-Water-Park",
    title: {
      en: "Grand Canyon Water Park",
      zh: "清迈大峡谷水上乐园",
      th: "แกรนด์แคนยอนวอเตอร์ปาร์ค"
    },
    price: {
      en: "Swimming pass: Adult 950 THB | Child (90–120 cm) 750 THB | Under 90 cm Free. Wakeboard 1 hr 550 THB. Combo promo 1,400 THB.",
      zh: "游泳票：成人 950 泰铢 | 儿童 750 泰铢 | 90cm 以下免费。滑水 550 泰铢/小时。套票 1,400 泰铢。",
      th: "บัตรว่ายน้ำ: ผู้ใหญ่ 950 บาท | เด็ก (90–120 ซม.) 750 บาท | ต่ำกว่า 90 ซม. เข้าฟรี | เวคบอร์ด 1 ชม. 550 บาท | โปรโมชั่นคอมโบ 1,400 บาท"
    },
    hours: {
      en: "Open daily (Check official page for latest hours)",
      zh: "每日开放（建议查看官方时间）",
      th: "เปิดทุกวัน (ตรวจสอบเวลาทำการล่าสุดจากหน้าเพจอย่างเป็นทางการ)"
    },
    detail: {
      en: "The largest outdoor water park in northern Chiang Mai. Offers water sliders, kayaking, canoeing, cliff jumping, zipline (1 round included), and wakeboarding. Great for adventure lovers.",
      zh: "清迈北部大型户外水上乐园，提供滑水道、皮划艇、跳崖、滑索和滑水活动，适合喜欢刺激活动的游客。",
      th: "สวนน้ำกลางแจ้งที่ใหญ่ที่สุดในเชียงใหม่ตอนเหนือ มีเครื่องเล่นทางน้ำอย่างสไลเดอร์ คายัค แคนู กระโดดหน้าผา ซิปไลน์ (รวม 1 รอบ) และเวคบอร์ด เหมาะสำหรับผู้ที่รักการผจญภัย"
    },
    tag: {
      th: "กิจกรรม",
      en: "activity",
      zh: "活动"
    },
    detail_more: {
      location: "202 ถนนเลียบคลองชลประทาน น้ำแพร่ อำเภอหางดง เชียงใหม่ 50230",
      lat: 18.6958239, 
      lng: 98.8913324,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Ob-Khan-National-Park",
    title: {
      en: "Ob Khan National Park",
      zh: "奥坎国家公园",
      th: "อุทยานแห่งชาติออบขาน"
    },
    price: {
      en: "Free (National park fee may apply in some cases)",
      zh: "免费（部分情况可能收国家公园费）",
      th: "ฟรี (อาจมีค่าเข้าอุทยานแห่งชาติในบางกรณี)"
    },
    hours: {
      en: "6:00 a.m. – 6:00 p.m.",
      zh: "06:00 – 18:00",
      th: "06:00 – 18:00 น."
    },
    detail: {
      en: "Famous for its steep canyon cliffs and the Mae Khan River flowing through the middle. Shallow water areas make it suitable for swimming and photography.",
      zh: "以峡谷峭壁和湄坎河闻名，水位较浅，适合游泳和拍照。"
    },
    tag: {
      th: "ธรรมชาติ",
      en: "nature",
      zh: "自然"
    },
    detail_more: {
      location: "น้ำแพร่ อำเภอหางดง เชียงใหม่ 50230",
      lat: 18.7232836, 
      lng: 98.8201689,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Wat-Ton-Kwen",
    title: {
      en: "Wat Ton Kwen (Wat Intharawat)",
      zh: "通宽寺 (Wat Ton Kwen)",
      th: "วัดต้นเกว๋น (วัดอินทราวาส)"
    },
    price: {
      en: "Free entry (Traditional costume rental 120–140 THB)",
      zh: "免费入场（传统服装租赁 120–140 泰铢）",
      th: "เข้าฟรี (ค่าเช่าชุดพื้นเมือง 120-140 บาท)"
    },
    hours: {
      en: "Open daily",
      zh: "每日开放",
      th: "เปิดทุกวัน"
    },
    detail: {
      en: "A beautiful classic Lanna-style wooden temple in the countryside. Known for its traditional viharn and peaceful atmosphere.",
      zh: "经典兰纳风格木质寺庙，环境安静，非常适合拍照和参观。"
    },
    tag: {
      th: "วัด",
      en: "temple",
      zh: "寺庙"
    },
    detail_more: {
      location: "PWFG+45F บ้านต้นเกว๋น ซอย 3 ตำบล หนองควาย อำเภอหางดง เชียงใหม่ 50230",
      lat: 18.7227136, 
      lng: 98.9254005,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Ban-Tawai-Wood-Carving",
    title: {
      en: "Ban Tawai Wood Carving Handicraft Center",
      zh: "班塔外木雕村",
      th: "ศูนย์หัตถกรรมไม้แกะสลักบ้านถวาย"
    },
    price: {
      en: "Free entry (Pay for products)",
      zh: "免费入场（商品另购）",
      th: "เข้าฟรี (จ่ายเฉพาะค่าสินค้าที่ซื้อ)"
    },
    hours: {
      en: "Open daily",
      zh: "每日开放",
      th: "เปิดทุกวัน"
    },
    detail: {
      en: "One of Thailand’s largest wood carving communities. Visitors can shop for high-quality wood crafts, home decorations, and handmade souvenirs.",
      zh: "泰国大型木雕村，可购买优质木雕和家居装饰品。"
    },
    tag: {
      th: "สถาปัตยกรรม",
      en: "architecture",
      zh: "建筑"
    },
    detail_more: {
      location: "MXM2+PG ตำบล ขุนคง อำเภอหางดง เชียงใหม่",
      lat: 18.6846473, 
      lng: 98.9502479,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Wat-Aranyawat",
    title: {
      en: "Wat Aranyawat (Ban Pong Temple)",
      zh: "阿兰雅瓦寺 (Ban Pong Temple)",
      th: "วัดอรัญญาวาส (วัดบ้านปง)"
    },
    price: {
      en: "Free",
      zh: "免费",
      th: "ฟรี"
    },
    hours: {
      en: "8:00 a.m. – 4:00 p.m.",
      zh: "08:00 – 16:00",
      th: "08:00 – 16:00 น."
    },
    detail: {
      en: "Also known as Phra That Si Mueang Pong. A stunning white temple considered the 2nd metal castle in Thailand and 4th in the world.",
      zh: "又称 Phra That Si Mueang Pong，是泰国第二座金属城堡式寺庙，外观洁白壮观。"
    },
    tag: {
      th: "วัด",
      en: "temple",
      zh: "寺庙"
    },
    detail_more: {
      location: "QV2M+3MQ ตำบล บ้านปง อำเภอหางดง เชียงใหม่ 50230",
      lat: 18.7503332, 
      lng: 98.8842523,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  }
];
