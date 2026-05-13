import { Restaurant, Tip } from './type';

export const restaurantData: Restaurant[] = [
    {
        id: 'r1', 
        slug: 'Tong-Tem-Toh', 
        image: 'https://f.ptcdn.info/566/082/000/s5a2t263uvf0T1FebJR7-o.png', 
        mapLink: 'https://www.google.com/maps/place/ต๋องเต็มโต๊ะ+ซอย+17/@18.7960567,98.96462,17z/data=!4m10!1m2!2m1!1z4LiV4LmL4Lit4LiH4LmA4LiV4LmH4Lih4LmC4LiV4LmK4Liw!3m6!1s0x30da3beb273b0405:0x6c823a3eb6f90cd3!8m2!3d18.7954627!4d98.9666633!15sCiTguJXguYvguK3guIfguYDguJXguYfguKHguYLguJXguYrguLBaKSIn4LiV4LmLIOC4reC4hyDguYDguJXguYfguKEg4LmC4LiV4LmK4LiwkgEPdGhhaV9yZXN0YXVyYW504AEA!16s%2Fg%2F11scv1870t?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D', 
        coords: { lat: 18.7957519708061 , lng: 98.96663166636775 },
        rating: 4.5, 
        priceLevel: '฿฿',
        openHours: '11:00 - 21:00',
        tel: '053-894-701',
        locales: {
            th: { 
                name: 'ต๋องเต็มโต๊ะ', 
                desc: 'ร้านอาหารเหนือใจกลางนิมมานเหมินท์ ให้บริการอาหารพื้นเมืองสูตรดั้งเดิมและฟิวชั่น บรรยากาศร้านเปิดโล่งตกแต่งสไตล์ล้านนาประยุกต์', 
                location: 'นิมมานเหมินท์ ซอย 13',
                tags: ['อาหารเหนือ', 'ยอดนิยม', 'สำหรับครอบครัว'], 
                recommended: ['ออเดิร์ฟเมือง', 'แกงฮังเล', 'หมูสามชั้นทอดน้ำปลา'] 
            },
            en: { 
                name: 'Tong Tem Toh', 
                desc: 'A well-known Northern Thai restaurant in Nimman offering traditional and modern Lanna cuisine in an open-air setting.', 
                location: 'Nimman Soi 13',
                tags: ['Northern Thai', 'Popular', 'Family'],
                recommended: ['Northern Hors d\'oeuvres', 'Hung Lay Curry', 'Fried Pork Belly']
            },
            zh: { 
                name: 'Tong Tem Toh', 
                desc: '位于宁曼路的知名泰北餐厅，提供传统与现代结合的兰纳美食，采用半露天就餐环境。', 
                location: '宁曼路 13 巷',
                tags: ['泰北菜', '热门', '家庭聚餐'],
                recommended: ['泰北拼盘', '泰北咖喱猪肉', '鱼露炸五花肉']
            }
        }
    },
    {
        id: 'r2', 
        slug: 'Khao-Soi-Samer-Jai', 
        image: 'https://www.lemon8-app.com/seo/image?item_id=7589899127882842632&index=1&sign=5cfb4ec0869e87ffa9772623709a830f', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ข้าวซอยเสมอใจ+ฟ้าฮ่าม', 
        coords: { lat: 18.804855391646264 , lng: 99.00550604907475 },
        rating: 4.2,
        priceLevel: '฿',
        openHours: '08:00 - 17:00',
        tel: '081-884-3659',
        locales: {
            th: { 
                name: 'ข้าวซอยเสมอใจ', 
                desc: 'ร้านข้าวซอยเก่าแก่คู่เมืองเชียงใหม่ โดดเด่นด้วยน้ำแกงข้าวซอยรสชาติเข้มข้นถึงเครื่องแกง พร้อมเมนูเคียงอย่างหมูสะเต๊ะ', 
                location: 'ฟ้าฮ่าม',
                tags: ['ข้าวซอย', 'ตำนาน', 'อาหารจานเดียว'],
                recommended: ['ข้าวซอยเนื้อ', 'ข้าวซอยไก่', 'หมูสะเต๊ะ']
            },
            en: { 
                name: 'Khao Soi Samer Jai', 
                desc: 'A long-established restaurant famous for its rich, heavily-spiced Khao Soi broth and side dishes like pork satay.', 
                location: 'Fa Ham',
                tags: ['Khao Soi', 'Legendary', 'Quick Bite'],
                recommended: ['Beef Khao Soi', 'Chicken Khao Soi', 'Pork Satay']
            },
            zh: { 
                name: 'Samer Jai 泰北金面', 
                desc: '清迈历史悠久的老店，以浓郁的咖喱汤底金面和烤猪肉沙爹串而闻名。', 
                location: 'Fa Ham 区',
                tags: ['金面', '老字号', '简餐'],
                recommended: ['牛肉金面', '鸡肉金面', '沙爹猪肉串']
            }
        }
    },
    {
        id: 'r3', 
        slug: 'Huen-Tueng-Chiang-Mai', 
        image: 'https://img.wongnai.com/p/1920x0/2022/04/16/cc2ef175eb3f4dba959b04f9dc5e35a7.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ฮ้านถึงเจียงใหม่',
        coords: { lat: 18.78916514208597 , lng: 98.95482093743256 },
        rating: 4.4,
        priceLevel: '฿฿',
        openHours: '09:00 - 21:00',
        tel: '083-204-6334',
        locales: {
            th: { 
                name: 'ฮ้านถึงเจียงใหม่', 
                desc: 'ร้านอาหารพื้นเมืองเหนือแท้ๆ การันตีคุณภาพด้วยรางวัลมิชลิน บิบ กูร์มองด์ เสิร์ฟเมนูหายากในราคาที่เข้าถึงได้', 
                location: 'หลัง มช.',
                tags: ['อาหารเหนือ', 'มิชลินไกด์', 'คุ้มค่า'],
                recommended: ['ปูอ่อง', 'แกงปูใบชะพลู', 'เชียงดาผัดไข่']
            },
            en: { 
                name: 'Huen Tueng Chiang Mai', 
                desc: 'Authentic Northern cuisine awarded with a Michelin Bib Gourmand. Offers rare local dishes at accessible prices.', 
                location: 'Behind CMU',
                tags: ['Northern Thai', 'Michelin Guide', 'Value'],
                recommended: ['Ong Pu (Crab Paste)', 'Crab Curry with Betel Leaves', 'Stir-fried Chiang Da Leaves']
            },
            zh: { 
                name: 'Huen Tueng Chiang Mai', 
                desc: '荣获米其林必比登推介的地道泰北餐厅，提供高性价比的罕见地方特色菜。', 
                location: '清迈大学后门',
                tags: ['泰北菜', '米其林', '高性价比'],
                recommended: ['蟹膏', '槟榔叶咖喱蟹', '炒清达叶']
            }
        }
    },
    {
        id: 'r4', 
        slug: 'Huen-Phen', 
        image: 'https://img.wongnai.com/p/400x0/2022/12/23/6e493a0f00b049a6b391ea48962c3e9b.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=เฮือนเพ็ญ+เชียงใหม่', 
        coords: { lat: 18.787127890129845 , lng: 98.98605410443376 },
        rating: 4.0,
        priceLevel: '฿฿',
        openHours: '08:30 - 16:00 / 17:00 - 22:00',
        tel: '053-814-548',
        locales: {
            th: { 
                name: 'เฮือนเพ็ญ', 
                desc: 'ร้านอาหารเก่าแก่ใจกลางเมืองเก่า ช่วงกลางวันเน้นให้บริการอาหารจานเดียวเช่นข้าวซอยและขนมจีน ส่วนช่วงเย็นจัดเสิร์ฟเป็นอาหารเหนือชุดใหญ่ตกแต่งสไตล์โบราณ', 
                location: 'เมืองเก่า',
                tags: ['อาหารเหนือ', 'เมืองเก่า', 'ดั้งเดิม'],
                recommended: ['น้ำพริกหนุ่ม', 'ไส้อั่ว', 'แกงโฮะ']
            },
            en: { 
                name: 'Huen Phen', 
                desc: 'A classic establishment in the Old City. Serves quick meals like Khao Soi by day, and elaborate traditional Lanna dinner spreads by night.', 
                location: 'Old City',
                tags: ['Northern Thai', 'Old City', 'Traditional'],
                recommended: ['Nam Phrik Num', 'Sai Oua (Northern Sausage)', 'Kaeng Hoe']
            },
            zh: { 
                name: 'Huen Phen', 
                desc: '古城内的经典餐厅。白天主要供应金面等简餐，晚间则提供丰盛的泰北传统风味正餐。', 
                location: '古城区',
                tags: ['泰北菜', '古城', '传统'],
                recommended: ['青椒酱', '泰北香肠', '泰北杂烩咖喱']
            }
        }
    },
    {
        id: 'r5', 
        slug: 'Khao-Soi-Mae-Sai', 
        image: 'https://pbs.twimg.com/media/D2FI0QlUwAAR5Rv.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ข้าวซอยแม่สาย+สันติธรรม',
        coords: { lat: 18.79977155987976 , lng: 98.97528323743258 },
        rating: 4.5,
        priceLevel: '฿',
        openHours: '08:00 - 16:00',
        tel: '053-213-284',
        locales: {
            th: { 
                name: 'ข้าวซอยแม่สาย', 
                desc: 'ร้านสตรีทฟู้ดยอดนิยมในย่านสันติธรรม มีเมนูเด็ดคือข้าวซอยเนื้อนุ่มละมุนและน้ำเงี้ยวรสชาติจัดจ้าน', 
                location: 'สันติธรรม',
                tags: ['ข้าวซอย', 'สตรีทฟู้ด', 'อาหารจานเดียว'],
                recommended: ['ข้าวซอยเนื้อ', 'ขนมจีนน้ำเงี้ยว', 'ก๋วยเตี๋ยวหมู']
            },
            en: { 
                name: 'Khao Soi Mae Sai', 
                desc: 'A popular local eatery in Santitham known for its tender beef Khao Soi and intensely flavored Nam Ngiao.', 
                location: 'Santitham',
                tags: ['Khao Soi', 'Street Food', 'Quick Bite'],
                recommended: ['Beef Khao Soi', 'Nam Ngiao Noodles', 'Pork Noodle Soup']
            },
            zh: { 
                name: 'Mae Sai 泰北金面', 
                desc: 'Santitham 区的人气街头小吃店，以软嫩的牛肉金面和风味浓郁的酸辣汤粉为特色。', 
                location: 'Santitham 区',
                tags: ['金面', '街头小吃', '简餐'],
                recommended: ['牛肉金面', '泰北米线', '猪肉汤面']
            }
        }
    },
    {
        id: 'r6', 
        slug: 'Kua-Kai-Nimman', 
        image: 'https://cms.dmpcdn.com/travel/2018/05/09/da8cc785-fc27-4201-a5a3-f8314065f897.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=คั่วไก่นิมมาน',
        coords: { lat: 18.794475222100882 , lng: 98.96947613743258 },
        rating: 4.3,
        priceLevel: '฿฿',
        openHours: '09:00 - 21:00',
        tel: '082-180-1177',
        locales: {
            th: { 
                name: 'คั่วไก่นิมมาน', 
                desc: 'ร้านก๋วยเตี๋ยวคั่วไก่ที่เสิร์ฟมาบนกระทะร้อน ทำให้ได้กลิ่นหอมของการคั่วเส้นและคงความร้อนได้นาน', 
                location: 'นิมมาน ซอย 17',
                tags: ['จานด่วน', 'กระทะร้อน', 'ยอดนิยม'],
                recommended: ['ก๋วยเตี๋ยวคั่วไก่กระทะร้อน', 'สุกี้แห้ง', 'คั่วทะเล']
            },
            en: { 
                name: 'Kua Kai Nimman', 
                desc: 'Stir-fried noodles with chicken served on a sizzling hot plate, ensuring an aromatic and lasting hot meal.', 
                location: 'Nimman Soi 17',
                tags: ['Quick Bite', 'Hot Plate', 'Popular'],
                recommended: ['Sizzling Chicken Noodles', 'Dry Sukiyaki', 'Seafood Stir-fried Noodles']
            },
            zh: { 
                name: '宁曼路炒鸡面', 
                desc: '特色在于使用热铁板上菜，使炒面保持焦香和温度。', 
                location: '宁曼路 17 巷',
                tags: ['简餐', '铁板', '热门'],
                recommended: ['铁板炒鸡面', '干炒寿喜烧', '海鲜炒面']
            }
        }
    },
    {
        id: 'r7', 
        slug: 'Kai-Yang-Cherng-Doi', 
        image: 'https://img.wongnai.com/p/400x0/2014/10/23/7541572782324809813b87b96e384065.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ไก่ย่างเชิงดอย',
        coords: { lat: 18.799330595409415 , lng: 98.96609759325368 },
        rating: 4.4,
        priceLevel: '฿฿',
        openHours: '11:00 - 20:00 (ปิดวันจันทร์)',
        tel: '081-881-1407',
        locales: {
            th: { 
                name: 'ไก่ย่างเชิงดอย', 
                desc: 'ร้านอาหารอีสานในเชียงใหม่ที่มีจุดเด่นคือไก่ย่างหนังกรอบเนื้อนุ่ม เสิร์ฟคู่กับน้ำจิ้มมะขามรสเด็ด', 
                location: 'นิมมาน ซอย 2',
                tags: ['อาหารอีสาน', 'ไก่ย่าง', 'ส้มตำ'],
                recommended: ['ไก่ย่างหนังกรอบ', 'ส้มตำไทย', 'ต้มแซ่บกระดูกอ่อน']
            },
            en: { 
                name: 'Kai Yang Cherng Doi', 
                desc: 'An Isan restaurant in Chiang Mai renowned for its crispy-skinned grilled chicken and tangy tamarind dipping sauce.', 
                location: 'Nimman Soi 2',
                tags: ['Isan Food', 'Grilled Chicken', 'Papaya Salad'],
                recommended: ['Crispy Skin Grilled Chicken', 'Thai Papaya Salad', 'Spicy Pork Rib Soup']
            },
            zh: { 
                name: 'Kai Yang Cherng Doi', 
                desc: '清迈的泰国东北菜馆，以皮脆肉嫩的烤鸡配特制酸角蘸酱闻名。', 
                location: '宁曼路 2 巷',
                tags: ['东北菜', '烤鸡', '木瓜沙拉'],
                recommended: ['脆皮烤鸡', '泰式木瓜沙拉', '酸辣排骨汤']
            }
        }
    },
    {
        id: 'r8', 
        slug: 'Ohkajhu', 
        image: 'https://api.tourismthailand.org/upload/live/business_content_thumbnail/14394/P08012273.jpeg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=โอ้กะจู๋+สันทราย',
        coords: { lat: 18.84073157181133, lng: 99.0245854914032 },
        rating: 4.6,
        priceLevel: '฿฿฿',
        openHours: '09:30 - 21:30',
        tel: '052-080-744',
        locales: {
            th: { 
                name: 'โอ้กะจู๋', 
                desc: 'ร้านอาหารเพื่อสุขภาพที่ปลูกผักเองแบบออร์แกนิก เสิร์ฟเมนูสลัดจานใหญ่ สเต็ก และอาหารสไตล์เวสเทิร์น', 
                location: 'สันทราย / นิมมาน',
                tags: ['ออร์แกนิก', 'สุขภาพ', 'สเต็ก'],
                recommended: ['สเต็กซี่โครงสะพานโค้ง', 'สลัดผลไม้', 'สปาเก็ตตี้ขี้เมาทะเล']
            },
            en: { 
                name: 'Ohkajhu', 
                desc: 'A health-conscious restaurant using homegrown organic vegetables. Known for massive salad portions and western-style steaks.', 
                location: 'Sansai / Nimman',
                tags: ['Organic', 'Healthy', 'Steak'],
                recommended: ['Barbecue Ribs', 'Fruit Salad', 'Spicy Seafood Spaghetti']
            },
            zh: { 
                name: 'Ohkajhu', 
                desc: '自家种植有机蔬菜的健康主题餐厅，提供超大份量的沙拉、牛排和西式菜肴。', 
                location: '三赛 / 宁曼路',
                tags: ['有机', '健康', '牛排'],
                recommended: ['招牌烤排骨', '水果沙拉', '海鲜意面']
            }
        }
    },
    {
        id: 'r9', 
        slug: 'Pongyang-Angdoi', 
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/6e/3b/2d/signage-in-front-of-pongyang.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=โป่งแยงแอ่งดอย',
        coords: { lat: 18.89836165647252, lng: 98.85447022579041 },
        rating: 4.3,
        priceLevel: '฿฿฿',
        openHours: '10:30 - 20:30',
        tel: '085-618-8885',
        locales: {
            th: { 
                name: 'โป่งแยงแอ่งดอย', 
                desc: 'ร้านอาหารไทยตั้งอยู่ริมน้ำตกกลางขุนเขา บรรยากาศร่มรื่นเย็นสบายตลอดปี เหมาะสำหรับการพักผ่อน', 
                location: 'แม่ริม',
                tags: ['วิวธรรมชาติ', 'อาหารไทย', 'ครอบครัว'],
                recommended: ['หมูดำย่าง', 'แกงรัญจวน', 'ยำหัวปลี']
            },
            en: { 
                name: 'Pongyang Angdoi', 
                desc: 'A Thai restaurant situated beside a mountain waterfall. Offers a cool, relaxing atmosphere year-round.', 
                location: 'Mae Rim',
                tags: ['Nature View', 'Thai Food', 'Family'],
                recommended: ['Grilled Kurobuta Pork', 'Kaeng Ranjuan (Traditional Curry)', 'Banana Blossom Salad']
            },
            zh: { 
                name: 'Pongyang Angdoi', 
                desc: '位于山林瀑布旁的泰国餐厅，全年气候凉爽，非常适合休闲放松。', 
                location: '美林',
                tags: ['自然景观', '泰国菜', '家庭'],
                recommended: ['烤黑猪肉', '传统香料咖喱', '凉拌香蕉花']
            }
        }
    },
    {
        id: 'r10', 
        slug: 'Anchan-Noodle', 
        image: 'https://api.tourismthailand.org/upload/live/business_content_thumbnail/14098/P08001939.jpeg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ก๋วยเตี๋ยวอัญชัน+เชียงใหม่',
        coords: { lat: 18.79439135181284 , lng: 98.97258099325367 },
        rating: 4.3,
        priceLevel: '฿',
        openHours: '08:00 - 16:00',
        tel: '084-949-2828',
        locales: {
            th: { 
                name: 'ก๋วยเตี๋ยวอัญชัน', 
                desc: 'เอกลักษณ์อยู่ที่การนำดอกอัญชันมาสกัดสีผสมในเส้นก๋วยเตี๋ยวและข้าว ทำให้ได้อาหารสีฟ้าและม่วงที่สวยงาม', 
                location: 'ศิริมังคลาจารย์',
                tags: ['ก๋วยเตี๋ยว', 'เอกลักษณ์', 'สตรีทฟู้ด'],
                recommended: ['ก๋วยเตี๋ยวอัญชันหมูนุ่ม', 'ข้าวอัญชันหมูกรอบ', 'น้ำอัญชันมะนาว']
            },
            en: { 
                name: 'Anchan Noodle', 
                desc: 'Famous for using butterfly pea flowers to naturally dye their noodles and rice into beautiful blue and purple hues.', 
                location: 'Sirimangkalajarn',
                tags: ['Noodles', 'Unique', 'Street Food'],
                recommended: ['Butterfly Pea Noodles with Pork', 'Crispy Pork with Blue Rice', 'Butterfly Pea Lemonade']
            },
            zh: { 
                name: '蝶豆花面', 
                desc: '特色在于使用蝶豆花提取物将面条和米饭染成美丽的蓝色和紫色。', 
                location: 'Sirimangkalajarn 路',
                tags: ['面条', '特色', '街头小吃'],
                recommended: ['蓝面条配软猪肉', '脆皮猪肉配蓝米饭', '蝶豆花柠檬茶']
            }
        }
    },
    {
        id: 'r11', 
        slug: 'Palaad-Tawanron', 
        image: 'https://cdn-th.orstatic.com/userphoto/doorphoto/2/223/00EMU40CBD94ECF2935670lv.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ผาลาดตะวันรอน',
        coords: { lat: 18.801151447920553, lng: 98.94226991784916 },
        rating: 4.1,
        priceLevel: '฿฿฿',
        openHours: '11:30 - 23:00',
        tel: '053-216-039',
        locales: {
            th: { 
                name: 'ผาลาดตะวันรอน', 
                desc: 'ร้านอาหารบนเนินเขาทางขึ้นดอยสุเทพ มีลานระเบียงกว้างขวางสำหรับชมวิวเมืองเชียงใหม่มุมสูงแบบพาโนรามา', 
                location: 'ทางขึ้นดอยสุเทพ',
                tags: ['จุดชมวิว', 'โรแมนติก', 'ดินเนอร์'],
                recommended: ['ขาหมูเยอรมัน', 'ปลากะพงทอดน้ำปลา', 'ต้มยำกุ้ง']
            },
            en: { 
                name: 'Palaad Tawanron', 
                desc: 'Located on the hill leading up to Doi Suthep, offering a spacious terrace with a panoramic view of Chiang Mai city.', 
                location: 'Suthep Road',
                tags: ['Scenic View', 'Romantic', 'Dinner'],
                recommended: ['German Pork Knuckle', 'Fried Sea Bass with Fish Sauce', 'Tom Yum Goong']
            },
            zh: { 
                name: 'Palaad Tawanron', 
                desc: '位于前往素贴山途中的半山腰餐厅，拥有宽敞的露台，可鸟瞰清迈全景。', 
                location: '素贴山脚',
                tags: ['观景', '浪漫', '晚餐'],
                recommended: ['德国猪肘', '鱼露炸鲈鱼', '冬阴功汤']
            }
        }
    },
    {
        id: 'r12', 
        slug: 'Meena-Rice-Based-Cuisine', 
        image: 'https://www.chillpainai.com/src/wewakeup/scoop/img_scoop/Hits/rote/Jan59/meena/mn06.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=มีนามีข้าว+สันกำแพง',
        coords: { lat: 18.784889634091584, lng: 99.04589676441788 },
        rating: 4.5,
        priceLevel: '฿฿',
        openHours: '10:00 - 17:00 (ปิดวันพุธ)',
        tel: '087-177-0523',
        locales: {
            th: { 
                name: 'มีนา มีข้าว', 
                desc: 'ร้านอาหารไทยร่วมสมัยในบรรยากาศโรงนาเก่า นำเสนอเมนูที่เน้นข้าวพันธุ์ท้องถิ่น โดยเฉพาะข้าว 5 สีปั้นเป็นรูปดอกไม้', 
                location: 'สันกำแพง',
                tags: ['เพื่อสุขภาพ', 'ข้าว 5 สี', 'บรรยากาศดี'],
                recommended: ['ข้าว 5 สี', 'แกงเลียงกุ้งสด', 'ปลาทอดสมุนไพร']
            },
            en: { 
                name: 'Meena Rice Based Cuisine', 
                desc: 'Contemporary Thai dining in a converted barn. Focuses on local rice varieties, beautifully plating 5-colored rice in flower shapes.', 
                location: 'San Kamphaeng',
                tags: ['Healthy', '5-Color Rice', 'Great Ambiance'],
                recommended: ['5-Color Rice', 'Spicy Prawn Soup with Herbs', 'Fried Fish with Herbs']
            },
            zh: { 
                name: 'Meena 有米餐厅', 
                desc: '位于旧谷仓内的现代泰国餐厅。以当地大米为主打，特色是将五色米饭捏成花朵形状。', 
                location: '山甘烹',
                tags: ['健康', '五色米', '环境优美'],
                recommended: ['五色米饭', '泰式药膳虾汤', '香草炸鱼']
            }
        }
    },
    {
        id: 'r13', 
        slug: 'Khanom-Jeen-San-Pa-Khoi', 
        image: 'https://www.hungryfatguy.com/wp-content/uploads/2016/03/4fe56ed013f84b668dbd867f1f842345.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ขนมจีนสันป่าข่อย',
        coords: { lat: 18.78605117730895, lng: 99.00849737606008 },
        rating: 4.4,
        priceLevel: '฿',
        openHours: '11:00 - 23:00 (ปิดวันอาทิตย์)',
        tel: '089-192-3264',
        locales: {
            th: { 
                name: 'ขนมจีนสันป่าข่อย', 
                desc: 'ร้านขนมจีนรสเด็ดซ่อนตัวอยู่ในตลาดทองคำ มีน้ำยาให้เลือกหลากหลาย เช่น น้ำเงี้ยว แกงเขียวหวาน และน้ำเนื้อ', 
                location: 'ตลาดทองคำ',
                tags: ['ขนมจีน', 'สตรีทฟู้ด', 'อาหารท้องถิ่น'],
                recommended: ['ขนมจีนน้ำเนื้อ', 'ขนมจีนน้ำเงี้ยว', 'ขนมจีนแกงเขียวหวานไก่']
            },
            en: { 
                name: 'Khanom Jeen San Pa Khoi', 
                desc: 'A hidden gem in Thong Kham Market serving a variety of curries over rice noodles, including beef curry and green curry.', 
                location: 'Thong Kham Market',
                tags: ['Rice Noodles', 'Street Food', 'Local'],
                recommended: ['Beef Curry Noodles', 'Nam Ngiao', 'Green Curry Chicken Noodles']
            },
            zh: { 
                name: 'San Pa Khoi 泰式米粉', 
                desc: '隐藏在Thong Kham市场内的美味米粉店，提供泰北酸辣汤、绿咖喱和牛肉咖喱等多种汤底。', 
                location: 'San Pa Khoi 市场',
                tags: ['泰式米粉', '街头小吃', '本地美食'],
                recommended: ['牛肉咖喱米粉', '泰北米线', '绿咖喱鸡肉米粉']
            }
        }
    },
    {
        id: 'r14', 
        slug: 'Ajarn-Saiyud-Kitchen', 
        image: 'https://pratuneung.com/storage/%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B8%A7%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94/%E0%B8%AD%E0%B8%B2%E0%B8%88%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B9%8C%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0xB8%942.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ครัวอาจารย์สายหยุด',
        coords: { lat: 18.822079375564567 , lng: 98.9875927583271 },
        rating: 4.6,
        priceLevel: '฿฿฿',
        openHours: '10:30 - 21:00 (ปิดวันพุธ)',
        tel: '081-530-1172',
        locales: {
            th: { 
                name: 'ครัวอาจารย์สายหยุด', 
                desc: 'เสิร์ฟอาหารไทยชาววังและอาหารโบราณที่หาทานยาก โดดเด่นด้วยงานแกะสลักผักผลไม้ที่ประณีตงดงามบนทุกจาน', 
                location: 'สันทราย',
                tags: ['อาหารไทยโบราณ', 'ประณีต', 'ชาววัง'],
                recommended: ['ช่อม่วง', 'มัสมั่นเนื้อ', 'แสร้งว่ากุ้ง']
            },
            en: { 
                name: 'Ajarn Saiyud Kitchen', 
                desc: 'Serves rare traditional and royal Thai recipes. Outstanding for its meticulous fruit and vegetable carvings on every dish.', 
                location: 'Sansai',
                tags: ['Traditional Thai', 'Exquisite', 'Royal Thai'],
                recommended: ['Chor Muang (Flower Dumplings)', 'Beef Massaman', 'Saeng Wa (Herbal Prawn Salad)']
            },
            zh: { 
                name: '阿赞赛育厨房', 
                desc: '提供罕见的古代泰国宫廷菜肴。每道菜都配有精美细腻的果蔬雕刻艺术。', 
                location: '三赛',
                tags: ['古代泰国菜', '精致', '宫廷风味'],
                recommended: ['紫花饺子', '马沙曼牛肉', '古法鲜虾沙拉']
            }
        }
    },
    {
        id: 'r15', 
        slug: 'Suki-Chang-Phueak', 
        image: 'https://f.ptcdn.info/579/044/000/oapj97fbiU9DWrN6ZQA-o.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=สุกี้ช้างเผือก',
        coords: { lat: 18.811649778457912, lng: 99.01950928587266 },
        rating: 4.4,
        priceLevel: '฿',
        openHours: '17:30 - 23:30',
        tel: '086-420-5232',
        locales: {
            th: { 
                name: 'สุกี้ช้างเผือก', 
                desc: 'ร้านสตรีทฟู้ดคิวยาวที่ตลาดโต้รุ่งประตูช้างเผือก ใช้ไฟแรงในการผัดสุกี้แห้งจนมีกลิ่นหอมกระทะ พร้อมน้ำจิ้มสุกี้สูตรเฉพาะ', 
                location: 'ประตูช้างเผือก',
                tags: ['สตรีทฟู้ด', 'คิวยาว', 'มื้อดึก'],
                recommended: ['สุกี้แห้งหมู', 'สุกี้แห้งเนื้อ', 'สุกี้น้ำรวมมิตร']
            },
            en: { 
                name: 'Suki Chang Phueak', 
                desc: 'A massively popular street food stall at Chang Phueak Gate. Known for its high-heat stir-fried dry sukiyaki with a smoky flavor.', 
                location: 'Chang Phueak Gate',
                tags: ['Street Food', 'Long Queue', 'Late Night'],
                recommended: ['Dry Pork Sukiyaki', 'Dry Beef Sukiyaki', 'Mixed Sukiyaki Soup']
            },
            zh: { 
                name: '白象街头寿喜烧', 
                desc: '位于白象门夜市的超人气大排档。以猛火翻炒的干拌寿喜烧闻名，锅气十足。', 
                location: '北门夜市',
                tags: ['街头小吃', '排队王', '宵夜'],
                recommended: ['猪肉干拌寿喜烧', '牛肉干拌寿喜烧', '什锦寿喜烧汤']
            }
        }
    },
    {
        id: 'r16', 
        slug: 'Midnight-Fried-Chicken', 
        image: 'https://down-th.img.susercontent.com/file/de81de560cb50898bf0b94e5ba171cec', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=หมูทอดเที่ยงคืน+กำแพงดิน',
        coords: { lat: 18.780168325897183, lng: 98.99806093373165 },
        rating: 4.2,
        priceLevel: '฿฿',
        openHours: '21:00 - 05:00',
        tel: '081-882-3161',
        locales: {
            th: { 
                name: 'หมูทอดเที่ยงคืน', 
                desc: 'ร้านอาหารรอบดึกที่เปิดขายยามค่ำคืน เมนูหลักคือหมูสามชั้นทอด ไส้ทอด และข้าวเหนียว ทานคู่กับน้ำพริกตาแดงหรือน้ำพริกหนุ่ม', 
                location: 'กำแพงดิน',
                tags: ['รอบดึก', 'สตรีทฟู้ด', 'หมูทอด'],
                recommended: ['หมูสามชั้นทอด', 'ไส้ทอด', 'ไข่ต้มยางมะตูม']
            },
            en: { 
                name: 'Midnight Fried Pork', 
                desc: 'A late-night institution opening in the evening. Serves deep-fried pork belly, fried intestines, and sticky rice with chili dip.', 
                location: 'Kamphaeng Din',
                tags: ['Late Night', 'Street Food', 'Fried Pork'],
                recommended: ['Fried Pork Belly', 'Fried Intestines', 'Soft-boiled Eggs']
            },
            zh: { 
                name: '午夜炸猪肉', 
                desc: '深夜才营业的餐厅。主打炸五花肉、炸猪肠和糯米饭，搭配泰北辣椒酱风味绝佳。', 
                location: '甘烹丁路',
                tags: ['深夜', '街头小吃', '炸猪肉'],
                recommended: ['炸五花肉', '炸大肠', '半熟水煮蛋']
            }
        }
    },
    {
        id: 'r17', 
        slug: 'Mont-Nomsod', 
        image: 'https://www.chillpainai.com/src/wewakeup/scoop/images/599ff1bf4cbc57a22179a8a6848904ce63ee5daa.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=มนต์นมสด+เชียงใหม่',
        coords: { lat: 18.798123018139346, lng: 98.96668199140318 },
        rating: 4.3,
        priceLevel: '฿',
        openHours: '15:00 - 23:00',
        tel: '053-214-410',
        locales: {
            th: { 
                name: 'มนต์นมสด', 
                desc: 'ร้านนมสดและขนมปังปิ้งชื่อดังสาขาเชียงใหม่ ให้บริการขนมปังปิ้งราดหน้าต่างๆ ทั้งสังขยา ช็อกโกแลต และนมสดร้อน-เย็น', 
                location: 'นิมมานเหมินท์',
                tags: ['ของหวาน', 'นมสด', 'ขนมปังปิ้ง'],
                recommended: ['ขนมปังปิ้งสังขยาใบเตย', 'นมสดร้อน', 'ขนมปังนึ่งสังขยา']
            },
            en: { 
                name: 'Mont Nomsod', 
                desc: 'The Chiang Mai branch of the famous fresh milk and toast cafe. Offers thick toast with various sweet toppings like pandan custard.', 
                location: 'Nimman Road',
                tags: ['Dessert', 'Fresh Milk', 'Toast'],
                recommended: ['Toast with Pandan Custard', 'Hot Fresh Milk', 'Steamed Bread with Custard']
            },
            zh: { 
                name: 'Mont Nomsod', 
                desc: '著名鲜奶和厚吐司咖啡馆的清迈分店。提供各种甜面酱的厚吐司（如斑斓叶咖椰酱）和新鲜牛奶。', 
                location: '宁曼路',
                tags: ['甜品', '鲜奶', '吐司'],
                recommended: ['斑斓酱烤吐司', '热鲜奶', '蒸面包配咖椰酱']
            }
        }
    },
    {
        id: 'r19', 
        slug: 'The-Good-View', 
        image: 'https://www.hungryfatguy.com/wp-content/uploads/2022/01/DSC05616.jpg', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=The+Good+View+เชียงใหม่',
        coords: { lat: 18.790644254345402 , lng: 99.00373389510415 },
        rating: 4.2,
        priceLevel: '฿฿฿',
        openHours: '17:00 - 01:00',
        tel: '053-241-866',
        locales: {
            th: { 
                name: 'The Good View', 
                desc: 'ร้านอาหารและบาร์ริมแม่น้ำปิง มีเมนูอาหารหลากหลายทั้งไทยและนานาชาติ พร้อมวงดนตรีสดที่เล่นตลอดคืน', 
                location: 'ริมแม่น้ำปิง',
                tags: ['ริมน้ำ', 'ดนตรีสด', 'แฮงเอาท์'],
                recommended: ['ขาหมูทอด', 'ออเดิร์ฟเมือง', 'ยำกุ้งฟู']
            },
            en: { 
                name: 'The Good View', 
                desc: 'A lively riverside restaurant and bar on the Ping River. Features a large menu of Thai and international dishes with live music.', 
                location: 'Ping River',
                tags: ['Riverside', 'Live Music', 'Hangout'],
                recommended: ['Deep Fried Pork Knuckle', 'Northern Appetizer Platter', 'Crispy Prawn Salad']
            },
            zh: { 
                name: 'The Good View', 
                desc: '位于湄滨河畔的热闹餐厅和酒吧。提供丰富的泰国和国际美食，整晚都有现场音乐表演。', 
                location: '湄滨河畔',
                tags: ['河畔', '现场音乐', '聚会'],
                recommended: ['炸猪肘', '泰北拼盘', '酥脆虾沙拉']
            }
        }
    },
    {
        id: 'r20', 
        slug: 'Galae-Restaurant', 
        image: 'https://ak-d.tripcdn.com/images/1mi3i2234bgvb3r8gB28E_W_640_0_R5_Q80.jpg?proc=source/trip', 
        mapLink: 'https://www.google.com/maps/search/?api=1&query=ร้านอาหารกาแล+เชียงใหม่',
        coords: { lat: 18.79352470737188 , lng: 98.94568913743258 },
        rating: 4.3,
        priceLevel: '฿฿',
        openHours: '10:00 - 21:00',
        tel: '053-328-455',
        locales: {
            th: { 
                name: 'ร้านอาหารกาแล', 
                desc: 'ร้านอาหารริมอ่างเก็บน้ำตกแต่งด้วยดอกไม้เมืองหนาวนานาพันธุ์ ให้บริการอาหารไทยและอาหารเหนือในบรรยากาศร่มรื่น', 
                location: 'อ่างแก้ว มช.',
                tags: ['สวนดอกไม้', 'ริมทะเลสาบ', 'ครอบครัว'],
                recommended: ['ไก่อบภูเขา', 'แกงฮังเล', 'ปลาทับทิมทอดกระเทียม']
            },
            en: { 
                name: 'Galae Restaurant', 
                desc: 'A restaurant set by a reservoir, abundantly decorated with temperate flowers. Serves Thai and Northern dishes in a lush setting.', 
                location: 'Ang Kaew, CMU',
                tags: ['Flower Garden', 'Lakeside', 'Family'],
                recommended: ['Mountain Baked Chicken', 'Hung Lay Curry', 'Deep Fried Tubtim Fish with Garlic']
            },
            zh: { 
                name: 'Galae 餐厅', 
                desc: '位于水库旁边的餐厅，以大量温带花卉装饰。在郁郁葱葱的环境中提供泰国菜和泰北菜。', 
                location: '清迈大学静心湖',
                tags: ['花海', '湖畔', '家庭'],
                recommended: ['高山烤鸡', '泰北咖喱猪肉', '蒜香炸鱼']
            }
        }
    }
];

export const tipsData: Tip[] = [
    {
        id: 1,
        locales: {
            th: { title: 'เวลาที่ดีที่สุด', desc: 'มื้อเช้า 7-9 น. และมื้อเที่ยง 11-13 น. เพื่อความสดใหม่' },
            en: { title: 'Best Time', desc: 'Breakfast (7-9 AM) and Lunch (11 AM-1 PM) for the freshest dishes.' },
            zh: { title: '最佳用餐时间', desc: '早餐 7-9 点，午餐 11-13 点。此时食材最新鲜。' }
        }
    },
    {
        id: 2,
        locales: {
            th: { title: 'ระดับความเผ็ด', desc: 'น้ำพริกหนุ่มมักจะเผ็ดที่สุด ส่วนข้าวซอยจะเผ็ดน้อยทานง่าย' },
            en: { title: 'Spice Level', desc: 'Nam Prik Num is usually the spiciest, while Khao Soi is quite mild.' },
            zh: { title: '辣度说明', desc: '青椒蘸酱通常最辣，而金面辣度较低，容易接受。' }
        }
    },
    {
        id: 3,
        locales: {
            th: { title: 'งบประมาณ', desc: 'สตรีทฟู้ด 50-100 บาท ส่วนร้านอาหารจะอยู่ที่ 150-400 บาทต่อคน' },
            en: { title: 'Budget', desc: 'Street food: 50-100 THB. Restaurants: 150-400 THB per person.' },
            zh: { title: '预算参考', desc: '街头小吃 50-100 铢，餐厅人均 150-400 铢左右。' }
        }
    },
    {
        id: 4,
        locales: {
            th: { title: 'โซนกินอาหาร', desc: 'ย่านนิมมานเน้นคาเฟ่เก๋ๆ เมืองเก่าเน้นอาหารท้องถิ่นดั้งเดิม' },
            en: { title: 'Dining Zones', desc: 'Nimman for trendy cafes; Old City for traditional Lanna eats.' },
            zh: { title: '美食区域', desc: '宁曼路多为网红咖啡店；古城区则保留更多传统味道。' }
        }
    },
    {
        id: 5,
        locales: {
            th: { title: 'การเดินทาง', desc: 'เช่าสกู๊ตเตอร์หรือใช้รถแดง (Songthaew) สะดวกที่สุดในการตะลอนกิน' },
            en: { title: 'Transport', desc: 'Rent a scooter or use a Red Truck (Songthaew) for food hopping.' },
            zh: { title: '交通建议', desc: '租借摩托车或乘坐双条车是穿梭城市寻找美食的最佳方式。' }
        }
    },
    {
        id: 6,
        locales: {
            th: { title: 'วัตถุดิบท้องถิ่น', desc: 'ลองสังเกต "มะแขว่น" และ "ดอกงิ้ว" ซึ่งเป็นเอกลักษณ์ของอาหารเหนือ' },
            en: { title: 'Local Ingredients', desc: 'Look out for "Prickly Ash" and "Dried Cotton Flowers" in your food.' },
            zh: { title: '当地食材', desc: '留意“马告”和“木棉花”，它们是泰北料理的灵魂。' }
        }
    }
];
