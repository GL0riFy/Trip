export type Locale = 'th' | 'en' | 'zh';

type LocalizedString = Record<Locale, string>;

export interface EventData {
  id: string;
  day: string; // เพิ่มฟิลด์สำหรับตัวเลขวันที่
  image: string;
  href: string;
  titleMain: LocalizedString;
  titleFull: LocalizedString;
  subtitle: LocalizedString;
  desc: LocalizedString;
  fullDate: LocalizedString;
  shortDate: LocalizedString;
}

// ข้อมูลกิจกรรมที่รวมอยู่ภายในคอมโพเนนต์เพื่อให้ทำงานได้ทันที
// อย่าลืมตรวจสอบ path ของรูปภาพให้ถูกต้อง (เช่น '/Event/...')
export const EVENTS_DATA: EventData[] = [
  {
    id: '01',
    day: '13',
    image: '/Event/saointhakhin.jpg',
    href: '/events/01',
    titleMain: { th: 'ใส่ขันดอก', en: 'Inthakhin', zh: '鲜花节' },
    titleFull: { th: 'ใส่ขันดอกอินทขิล', en: 'Inthakhin Festival', zh: '清迈城市柱祭典' },
    subtitle: { th: 'ประเพณีล้านนา - เชียงใหม่', en: 'Lanna Tradition - Chiang Mai', zh: '兰纳传统 - 清迈' },
    desc: {
      th: 'พิธีสักการะบูชาเสาหลักเมืองเชียงใหม่ ชาวเชียงใหม่จะนำดอกไม้ ข้าวตอก และธูปเทียนใส่ในขันดอกไม้เพื่อความเป็นสิริมงคล',
      en: 'A sacred ceremony to worship the Chiang Mai City Pillar. Locals offer flowers, popped rice, candles, and incense for prosperity and good fortune.',
      zh: '祭拜清迈城市柱的神圣仪式。当地人献上鲜花、爆米花、蜡烛和香，祈求繁荣和好运。'
    },
    fullDate: { th: 'เดือนพฤษภาคม - มิถุนายน ของทุกปี', en: 'May - June Annually', zh: '每年 5月 - 6月' },
    shortDate: { th: 'พ.ค.', en: 'May', zh: '5月' }
  },
  {
    id: '02',
    day: '14',
    image: '/Event/umbrella-borsang.jpg',
    href: '/events/02',
    titleMain: { th: 'ร่มบ่อสร้าง', en: 'Bo Sang', zh: '博桑伞节' },
    titleFull: { th: 'เทศกาลร่มบ่อสร้าง', en: 'Bo Sang Umbrella Festival', zh: '博桑油纸伞节' },
    subtitle: { th: 'ประเพณีล้านนา - เชียงใหม่', en: 'Lanna Tradition - Chiang Mai', zh: '兰纳传统 - 清迈' },
    desc: {
      th: 'ประเพณีเฉลิมฉลองของหมู่บ้านทำร่มที่สืบทอดกันมานับร้อยปี ชมความงามของร่มกระดาษสาที่เพ้นท์ลวดลายวิจิตรตระการตา',
      en: 'An annual celebration of the centuries-old umbrella-making village. Marvel at the beauty of exquisitely hand-painted Sa paper umbrellas.',
      zh: '拥有百年历史的制伞村的年度庆典。欣赏精美的纯手工绘制纸伞。'
    },
    fullDate: { th: 'สัปดาห์ที่ 3 ของเดือนมกราคม', en: '3rd Week of January', zh: '1月第三周' },
    shortDate: { th: 'ม.ค.', en: 'Jan', zh: '1月' }
  },
  {
    id: '03',
    day: '15',
    image: '/Event/woodflower.jpg',
    href: '/events/03',
    titleMain: { th: 'ไม้ดอกไม้ประดับ', en: 'Flower Fest', zh: '花卉节' },
    titleFull: { th: 'มหกรรมไม้ดอก', en: 'Chiang Mai Flower Festival', zh: '清迈鲜花节' },
    subtitle: { th: 'เทศกาลประจำปี - เชียงใหม่', en: 'Annual Festival - Chiang Mai', zh: '年度节日 - 清迈' },
    desc: {
      th: 'เทศกาลที่เนรมิตทั้งเมืองเชียงใหม่ให้กลายเป็นสวนดอกไม้ ไฮไลท์คือขบวนรถบุปผชาติที่ตกแต่งด้วยดอกไม้สดนับแสนดอก',
      en: 'A festival that transforms Chiang Mai into a floral paradise. The highlight is the spectacular parade of floats decorated with hundreds of thousands of fresh flowers.',
      zh: '将清迈变成人间花海的节日。最大的亮点是装饰有成千上万朵鲜花的壮观花车游行。'
    },
    fullDate: { th: 'สัปดาห์แรกของเดือนกุมภาพันธ์', en: '1st Week of February', zh: '2月第一周' },
    shortDate: { th: 'ก.พ.', en: 'Feb', zh: '2月' }
  },
  {
    id: '04',
    day: '20',
    image: '/Event/yipeung.jpg',
    href: '/events/04',
    titleMain: { th: 'ยี่เป็ง', en: 'Yee Peng', zh: '天灯节' },
    titleFull: { th: 'ยี่เป็งล้านนา', en: 'Yee Peng Lanna', zh: '兰纳天灯节' },
    subtitle: { th: 'ประเพณีล้านนา - เชียงใหม่', en: 'Lanna Tradition - Chiang Mai', zh: '兰纳传统 - 清迈' },
    desc: {
      th: 'โดดเด่นด้วยการประดับโคมล้านนาทั่วเมือง การตั้งธรรมหลวง และการปล่อยโคมลอยขึ้นสู่ท้องฟ้าเพื่อบูชาพระเกศแก้วจุฬามณี',
      en: 'Characterized by Lanna lanterns adorning the city, grand sermons, and the release of sky lanterns to worship the Chulamanee Pagoda in heaven.',
      zh: '以装饰满城的兰纳灯笼、盛大的讲道和放飞天灯祭拜天堂的朱拉玛尼佛塔为特色。'
    },
    fullDate: { th: 'วันเพ็ญเดือน 12 - ประมาณเดือนพฤศจิกายน', en: 'Full Moon of the 12th Lunar Month (Nov)', zh: '泰历12月满月 (约11月)' },
    shortDate: { th: 'พ.ย.', en: 'Nov', zh: '11月' }
  }
];