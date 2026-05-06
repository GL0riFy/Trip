export interface FoodItem {
    id: string;
    image: string;
    locales: Record<'th' | 'en' | 'zh', {
        name: string;
        shortDesc: string;
        history: string;
        taste: string;
    }>;
}

export interface Restaurant {
    id: string;
    image: string;
    mapLink: string;
    locales: Record<'th' | 'en' | 'zh', {
        name: string;
        desc: string;
        location: string;
    }>;
}

export interface Tip {
    id: number;
    locales: Record<'th' | 'en' | 'zh', {
        title: string;
        desc: string;
    }>;
}

export const foodData: FoodItem[] = [
    {
        id: 'f1', image: 'https://www.pholfoodmafia.com/wp-content/uploads/2021/01/7Chicken-Khao-Soi.jpg', 
        locales: {
            th: { name: 'ข้าวซอย', shortDesc: 'บะหมี่แกงกะทิรสชาติเข้มข้น', history: 'ได้รับอิทธิพลมาจากชาวจีนฮ่อ (มุสลิม) ที่อพยพมาทางตอนเหนือ เดิมเรียกว่า "ก๋วยเตี๋ยวฮ่อ"', taste: 'น้ำแกงเข้มข้น หอมเครื่องเทศกะทิ หวาน มัน เผ็ดเล็กน้อย ตัดเลี่ยนด้วยผักกาดดอง' },
            en: { name: 'Khao Soi', shortDesc: 'Rich coconut curry noodle soup', history: 'Influenced by Chin Haw Muslims. Originally known as "Khao Haw" noodles.', taste: 'Creamy, aromatic, and slightly spicy curry broth. Perfectly balanced with pickled greens.' },
            zh: { name: '泰北金面', shortDesc: '浓郁椰汁咖喱面', history: '受移居泰北的中国回族（秦和人）影响，最初被称为“回族面”。', taste: '汤头浓郁，充满椰香和香料味，口味圆润，甜中带微辣。' }
        }
    },
    {
        id: 'f2', image: 'https://images.aws.nestle.recipes/original/c603d386b22d1b84131ab1aeea0f18ce_%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B8%B8%E0%B9%88%E0%B8%A1.png', 
        locales: {
            th: { name: 'น้ำพริกหนุ่ม', shortDesc: 'น้ำพริกจากพริกหนุ่มย่าง', history: 'ภูมิปัญญาการถนอมอาหารของชาวล้านนาโดยการนำพริกสดมาย่างไฟให้หอม', taste: 'เผ็ดปานกลาง หอมกลิ่นย่างไฟ เค็มกลมกล่อม นิยมทานคู่กับแคบหมู' },
            en: { name: 'Nam Prik Num', shortDesc: 'Roasted green chili dip', history: 'Traditional Lanna wisdom of preserving food by roasting fresh young green chilies.', taste: 'Medium spicy with a smoky aroma. Savory and best paired with pork cracklings.' },
            zh: { name: '泰北青椒蘸酱', shortDesc: '烤青椒制成的蘸酱', history: '兰纳地区的传统智慧，通过烤制新鲜青椒来制作风味蘸酱。', taste: '中等辣度，带有独特的焦香味，通常搭配炸猪皮食用。' }
        }
    },
    {
        id: 'f3', image: 'https://www.maggi.co.th/sites/default/files/srh_recipes/ecac40a7e1e5b963d649f20d5c07b6d7.jpg', 
        locales: {
            th: { name: 'น้ำพริกอ่อง', shortDesc: 'น้ำพริกหมูสับมะเขือเทศ', history: 'สะท้อนความอุดมสมบูรณ์ของมะเขือเทศในภาคเหนือ สีแดงมาจากมะเขือส้ม', taste: 'เปรี้ยวอมหวานจากมะเขือเทศ เผ็ดน้อยมาก ทานง่ายสำหรับทุกวัย' },
            en: { name: 'Nam Prik Ong', shortDesc: 'Minced pork and tomato dip', history: 'Reflects the abundance of local cherry tomatoes. The red color is natural, not spicy.', taste: 'Sweet and tangy like a Thai-style Bolognese. Very mild and easy to eat.' },
            zh: { name: '番茄肉末蘸酱', shortDesc: '鲜红色番茄肉末蘸酱', history: '体现了泰北丰富的番茄资源，红色来自番茄而非辣椒。', taste: '酸甜口，咸鲜适中，辣度极低，非常适合儿童食用。' }
        }
    },
    {
        id: 'f4', image: 'https://food.mthai.com/app/uploads/2016/01/%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%A1-1.jpg', 
        locales: {
            th: { name: 'ไข่ป่าม', shortDesc: 'ไข่ย่างในกระทงใบตอง', history: 'การทำให้สุกด้วยความร้อนต่ำบนใบตอง เพื่อให้ได้กลิ่นหอมจากธรรมชาติ', taste: 'เนื้อสัมผัสนุ่มคล้ายไข่ตุ๋น หอมกลิ่นใบตองย่างที่เป็นเอกลักษณ์' },
            en: { name: 'Khai Pam', shortDesc: 'Grilled egg in banana leaf', history: 'Slow-cooked in a banana leaf cup over charcoal for a natural aroma.', taste: 'Soft texture similar to steamed eggs with a distinct smoky banana leaf scent.' },
            zh: { name: '芭蕉叶烤蛋', shortDesc: '在芭蕉叶中烤制的鸡蛋', history: '在芭蕉叶容器中低温慢烤，旨在吸收自然的清香。', taste: '口感类似蒸蛋，带有芭蕉叶被火烤后渗入的独特香味。' }
        }
    },
    {
        id: 'f5', image: 'https://s359.kapook.com/pagebuilder/2259284a-b2d7-464b-b672-f0f4e70751a9.jpg', 
        locales: {
            th: { name: 'ไส้อั่ว', shortDesc: 'ไส้กรอกสมุนไพรภาคเหนือ', history: 'การนำเนื้อหมูสับคลุกพริกแกงและสมุนไพรยัดใส่ไส้แล้วนำไปย่าง', taste: 'รสชาติจัดจ้าน เผ็ดร้อน หอมกลิ่นสมุนไพรเน้นๆ เช่น ตะไคร้ ใบมะกรูด' },
            en: { name: 'Sai Oua', shortDesc: 'Northern Thai herb sausage', history: 'Minced pork mixed with curry paste and herbs, stuffed into casings and grilled.', taste: 'Robust and spicy flavor, packed with aromatic herbs like lemongrass and kaffir lime.' },
            zh: { name: '泰北香肠', shortDesc: '草本香料猪肉肠', history: '将猪肉末与咖喱酱和香料混合灌入肠衣后烤制，是兰纳传统美食。', taste: '味道浓郁辛辣，充满了香茅和柠檬叶的草本芬芳。' }
        }
    },
    {
        id: 'f6', image: 'https://s359.kapook.com/pagebuilder/ac62b45a-f9e4-47c9-a02b-d13302cd2dae.jpg', 
        locales: {
            th: { name: 'ขนมจีนน้ำเงี้ยว', shortDesc: 'ขนมจีนซุปกระดูกหมูใส่ดอกงิ้ว', history: 'อาหารของชาวไทใหญ่ เอกลักษณ์คือการใส่ดอกงิ้วตากแห้งและมะเขือส้ม', taste: 'น้ำซุปสีแดงรสชาติเปรี้ยวเค็มกลมกล่อม มีเท็กซ์เจอร์หนึบๆ ของดอกงิ้ว' },
            en: { name: 'Nam Ngiao', shortDesc: 'Spicy pork noodle soup with dried flowers', history: 'A Shan (Tai Yai) specialty featuring dried red cotton flowers (Dok Ngiao).', taste: 'Savory and tangy red broth with a unique chewy texture from the dried flowers.' },
            zh: { name: '泰北酸辣汤粉', shortDesc: '猪骨汤底配干木棉花', history: '源自掸族饮食，其灵魂是加入当地特有的干木棉花。', taste: '汤色红亮，味道酸咸适度，干木棉花和猪血块增加了口感层次。' }
        }
    },
    {
        id: 'f7', image: 'https://i0.wp.com/archives.mju.ac.th/localfood/wp-content/uploads/2024/11/curry-cat.png?resize=1140%2C694&ssl=1', 
        locales: {
            th: { name: 'แกงฮังเล', shortDesc: 'แกงเนื้อสัตว์รสเข้มข้น ไม่มีกะทิ', history: 'ได้รับอิทธิพลมาจากพม่า มีส่วนประกอบหลักคือผงฮังเลและขิง', taste: 'รสชาติเปรี้ยวอมหวาน หอมกลิ่นเครื่องเทศเข้มข้น เนื้อหมูนุ่มละลาย' },
            en: { name: 'Gaeng Hung Ley', shortDesc: 'Rich pork curry without coconut milk', history: 'Influenced by Burmese cuisine, using ginger and "Hung Ley" spice powder.', taste: 'Sweet and sour profile with deep aromatic spice notes. Tender, slow-cooked meat.' },
            zh: { name: '杭莱咖喱', shortDesc: '浓郁无椰奶猪肉咖喱', history: '受缅甸影响的传统炖菜，主要调料为杭莱粉和生姜。', taste: '口味酸甜，香料味极浓，猪肉炖至酥烂入味。' }
        }
    },
    {
        id: 'f8', image: 'https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/makro-event/%E0%B8%A5%E0%B8%B2%E0%B8%9A%E0%B8%84%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B8%A5%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%88%E0%B8%B5%E0%B9%88_header.jpg', 
        locales: {
            th: { name: 'ลาบคั่ว', shortDesc: 'ลาบเนื้อคั่วสุก หอมพริกลาบ', history: 'ลาบแบบทางเหนือที่เน้นเครื่องเทศแห้ง โดยเฉพาะมะแขว่น', taste: 'หอมเครื่องเทศจัดจ้าน รสชาติเค็มเผ็ด และมีความซ่าจากมะแขว่น' },
            en: { name: 'Laab Kua', history: 'Northern-style minced meat salad seasoned with dried spices and prickly ash.', shortDesc: 'Fried minced meat with Northern spices', taste: 'Intensely aromatic and savory with a unique numbing zing from prickly ash.' },
            zh: { name: '泰北炒腊', shortDesc: '马告风味熟炒肉末', history: '不同于东北部，泰北腊肉使用多种干香料，尤其是马告。', taste: '香气扑鼻，咸辣开胃，带有马告特有的麻味。' }
        }
    },
    {
        id: 'f9', image: 'https://inwfile.com/s-gd/zs4j6n.jpg', 
        locales: {
            th: { name: 'ข้าวกันจิ๊น', shortDesc: 'ข้าวคลุกเลือดนึ่งใบตอง', history: 'อาหารชาวเงี้ยว นำข้าวสวยคลุกเลือดหมูและน้ำมันกระเทียมเจียวแล้วนำไปนึ่ง', taste: 'หอมกลิ่นใบตองและกระเทียมเจียว รสชาติเค็มมันนัวๆ ไม่คาว' },
            en: { name: 'Khao Kan Jin', shortDesc: 'Steamed blood rice in banana leaf', history: 'A Shan specialty of rice mixed with pork blood and garlic oil, then steamed.', taste: 'Savory and nutty with a rich garlic aroma. Surprisingly delicate, not fishy.' },
            zh: { name: '血汁蒸饭', shortDesc: '芭蕉叶包裹的猪血拌饭', history: '掸族传统菜，将米饭与猪血、炸蒜油混合后蒸熟。', taste: '带有芭蕉叶和炸蒜的清香，味道醇厚咸鲜，完全没有腥味。' }
        }
    },
    {
        id: 'f10', image: 'https://img.wongnai.com/p/1920x0/2017/07/15/178e4e4a4b414e9bacae3903045a3040.jpg', 
        locales: {
            th: { name: 'จิ๊นส้มหมกไข่', shortDesc: 'แหนมเหนือย่างหมกไข่', history: 'การนำแหนม (จิ๊นส้ม) มาห่อใบตองแล้วใส่ไข่ลงไปย่างให้สุกพร้อมกัน', taste: 'เปรี้ยวนำจากตัวแหนม มีความมันและนุ่มจากไข่ หอมใบตอง' },
            en: { name: 'Jin Som Mok Kai', shortDesc: 'Grilled fermented pork with egg', history: 'Fermented pork (Jin Som) wrapped in banana leaf with an egg and grilled.', taste: 'Tantalizingly sour from the pork, balanced by the rich, creamy egg.' },
            zh: { name: '烤酸肉蛋', shortDesc: '芭蕉叶烤酸肉拌蛋', history: '将泰北酸肉包裹在芭蕉叶中，打入鸡蛋后一起炭火慢烤。', taste: '酸肉的酸爽与鸡蛋的香嫩完美融合，带有木炭和叶子的香味。' }
        }
    },
    {
        id: 'f11', image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Kaeng_ho.jpg', 
        locales: {
            th: { name: 'แกงโฮะ', shortDesc: 'แกงรวมมิตรใส่วุ้นเส้น', history: 'เกิดจากการนำอาหารเหลือจากงานบุญหลายอย่างมาคั่วรวมกัน (โฮะ แปลว่า รวม)', taste: 'รสชาติเข้มข้น มีความเปรี้ยวเล็กๆ จากหน่อไม้ดองและนัวเครื่องแกง' },
            en: { name: 'Gaeng Ho', shortDesc: 'Stir-fried mixed curry with noodles', history: 'Traditionally made by combining leftovers from ceremonies ("Ho" means to mix).', taste: 'Complex and savory with a slight tang from pickled bamboo shoots.' },
            zh: { name: '杂菜咖喱', shortDesc: '混合什锦炒咖喱', history: '“Ho”意为聚合。源自将祭祀剩下的各种菜肴重新混合炒制的传统。', taste: '味道浓郁丰富，酸笋的微酸使整体口感更加清爽不油腻。' }
        }
    },
    {
        id: 'f12', image: 'https://media-cdn.tripadvisor.com/media/photo-s/14/66/0d/2a/caption.jpg', 
        locales: {
            th: { name: 'ผักเชียงดาผัดไข่', shortDesc: 'ผัดผักพื้นเมืองเพื่อสุขภาพ', history: 'ผักเชียงดาเป็นสมุนไพรพื้นถิ่นทางเหนือ มีสรรพคุณช่วยลดน้ำตาลในเลือด', taste: 'รสชาติกลมกล่อม ผักมีความมันและขมปลายลิ้นนิดๆ' },
            en: { name: 'Phak Chiang Da with Egg', shortDesc: 'Stir-fried local medicinal greens', history: 'Phak Chiang Da is a Northern herb known for its health benefits.', taste: 'Buttery and savory with a characteristic pleasant slight bitterness.' },
            zh: { name: '千金藤炒蛋', shortDesc: '泰北健康野菜炒蛋', history: '千金藤是泰北特有的草本植物，具有调节血糖的健康功效。', taste: '味道鲜美，蔬菜质地柔嫩，带有非常细微的苦后回甘。' }
        }
    },
    {
        id: 'f13', image: 'https://lh6.googleusercontent.com/proxy/onyPxp4-mBz18xfIVp2NtpG8IBFJbbzyq5isIXEo7T7pYFuCHvzSKttg8YcqCSoszMpujDrPdlPKJ8jDo3liCDPP0jGbC4vGu5cpe8og2LWzqIIUWA', 
        locales: {
            th: { name: 'ตำขนุน', shortDesc: 'ยำขนุนอ่อนต้มสุก', history: 'นิยมกินในวันปากปี (วันหลังสงกรานต์) เชื่อว่าจะช่วยหนุนนำชีวิตให้ดีขึ้น', taste: 'เผ็ด เค็ม นัว หอมกลิ่นกระเทียมเจียวและใบมะกรูด' },
            en: { name: 'Tam Khanun', shortDesc: 'Pounded young jackfruit salad', history: 'Eaten after Songkran for good luck, symbolizing support and success.', taste: 'Spicy and savory with a fibrous texture similar to pulled meat.' },
            zh: { name: '凉拌菠萝蜜', shortDesc: '泰北式凉拌嫩菠萝蜜', history: '清迈人在宋干节后必吃，寓意生活有贵人相助（支持）。', taste: '咸香微辣，口感奇特（类似肉丝），带有炸蒜的焦香。' }
        }
    },
    {
        id: 'f14', image: 'https://assets.unileversolutions.com/recipes-v2/218526.jpg', 
        locales: {
            th: { name: 'แกงแค', shortDesc: 'แกงผักรวมพื้นบ้าน ไม่ใส่กะทิ', history: 'แกงที่ใส่ผักพื้นเมืองหลายชนิดและใช้พริกแกงที่เน้นความเผ็ดร้อน', taste: 'หอมกลิ่นผักสมุนไพรนานาชนิด รสชาติเผ็ดร้อนสดชื่น' },
            en: { name: 'Gaeng Khae', shortDesc: 'Northern mixed vegetable soup', history: 'A healthy, non-coconut curry featuring diverse seasonal local vegetables.', taste: 'Aromatic and spicy with a refreshing explosion of herbal flavors.' },
            zh: { name: '泰北什锦菜汤', shortDesc: '无椰奶家常野菜汤', history: '一种非常健康的传统汤品，放入大量当季生产的野菜和草本。', taste: '草本香气极其浓郁，口感辛辣清凉，非常开胃。' }
        }
    },
    {
        id: 'f15', image: 'https://www.silpa-mag.com/wp-content/uploads/2025/02/app.jpg', 
        locales: {
            th: { name: 'แอ็บหมู', shortDesc: 'หมูสับคลุกพริกแกงย่างใบตอง', history: 'การนำเนื้อสัตว์มาผสมพริกแกง ห่อใบตองแล้วนำไปย่าง (แอ็บ คือ การหมกย่าง)', taste: 'เผ็ดร้อน หอมกลิ่นเครื่องแกงล้านนาและใบตองย่าง' },
            en: { name: 'Ab Moo', shortDesc: 'Grilled minced pork in banana leaf', history: 'Seasoned minced meat wrapped in banana leaf and grilled over charcoal.', taste: 'Spicy and intensely flavorful with authentic Lanna curry aromas.' },
            zh: { name: '芭蕉叶烤肉酱', shortDesc: '咖喱味烤猪肉末', history: '将猪肉末与兰纳咖喱酱混合，包裹在芭蕉叶中烤制而成。', taste: '辛辣芬芳，充满了地道的泰北调料味和芭蕉叶熏香。' }
        }
    }
];

export const restaurantData: Restaurant[] = [
    {
        id: 'r1', image: 'https://f.ptcdn.info/566/082/000/s5a2t263uvf0T1FebJR7-o.png', mapLink: 'https://www.google.com/maps/search/?api=1&query=ต๋องเต็มโต๊ะ+นิมมาน',
        locales: {
            th: { name: 'ต๋องเต็มโต๊ะ', desc: 'ร้านยอดฮิตย่านนิมมาน เมนูอาหารเหนือฟิวชั่นและดั้งเดิม', location: 'นิมมานเหมินท์ ซอย 13' },
            en: { name: 'Tong Tem Toh', desc: 'A must-visit in Nimman for both modern and traditional Lanna dishes.', location: 'Nimman Soi 13' },
            zh: { name: 'Tong Tem Toh', desc: '宁曼路最受欢迎的餐厅之一，主打新派与传统结合的泰北菜。', location: '宁曼路 13 巷' }
        }
    },
    {
        id: 'r2', image: 'https://www.lemon8-app.com/seo/image?item_id=7589899127882842632&index=1&sign=5cfb4ec0869e87ffa9772623709a830f', mapLink: 'https://www.google.com/maps/search/?api=1&query=ข้าวซอยเสมอใจ+ฟ้าฮ่าม',
        locales: {
            th: { name: 'ข้าวซอยเสมอใจ', desc: 'ร้านข้าวซอยระดับตำนานย่านฟ้าฮ่าม รสชาติเข้มข้น', location: 'ฟ้าฮ่าม' },
            en: { name: 'Khao Soi Samer Jai', desc: 'A legendary spot famous for its incredibly rich and creamy Khao Soi.', location: 'Fa Ham' },
            zh: { name: 'Samer Jai 泰北金面', desc: '清迈历史悠久的名店，以汤头浓郁的金面而闻名。', location: 'Fa Ham 区' }
        }
    },
    {
        id: 'r3', image: 'https://img.wongnai.com/p/1920x0/2022/04/16/cc2ef175eb3f4dba959b04f9dc5e35a7.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=ฮ้านถึงเจียงใหม่',
        locales: {
            th: { name: 'ฮ้านถึงเจียงใหม่', desc: 'อาหารเหนือรสชาติดั้งเดิม ราคามิตรภาพ การันตีโดยมิชลิน', location: 'หลัง มช.' },
            en: { name: 'Huen Tueng Chiang Mai', desc: 'Authentic flavors at friendly prices. Michelin Bib Gourmand recommended.', location: 'Behind CMU' },
            zh: { name: 'Huen Tueng Chiang Mai', desc: '获得米其林推荐的地道泰北餐厅，性价比极高。', location: '清迈大学后门' }
        }
    },
    {
        id: 'r4', image: 'https://img.wongnai.com/p/400x0/2022/12/23/6e493a0f00b049a6b391ea48962c3e9b.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=เฮือนเพ็ญ+เชียงใหม่',
        locales: {
            th: { name: 'เฮือนเพ็ญ', desc: 'ร้านเก่าแก่ใจกลางเมืองเก่า กลางวันขายข้าวซอย กลางคืนขายอาหารเมือง', location: 'เมืองเก่า' },
            en: { name: 'Huen Phen', desc: 'A long-standing favorite in the Old City. Khao Soi by day, Lanna feast by night.', location: 'Old City' },
            zh: { name: 'Huen Phen', desc: '古城内的老牌餐厅。白天供应金面，晚上则提供正宗的泰北全席。', location: '古城区' }
        }
    },
    {
        id: 'r5', image: 'https://pbs.twimg.com/media/D2FI0QlUwAAR5Rv.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=ข้าวซอยแม่สาย+สันติธรรม',
        locales: {
            th: { name: 'ข้าวซอยแม่สาย', desc: 'ร้านโปรดของคนท้องถิ่น ข้าวซอยเนื้อและน้ำเงี้ยวเด็ดมาก', location: 'สันติธรรม' },
            en: { name: 'Khao Soi Mae Sai', desc: 'A local favorite known for its stellar beef Khao Soi and Nam Ngiao.', location: 'Santitham' },
            zh: { name: 'Mae Sai 泰北金面', desc: '当地人的心头好，其牛肉金面和酸辣汤粉极具人气。', location: 'Santitham 区' }
        }
    },
    {
        id: 'r6', image: 'https://cms.dmpcdn.com/travel/2018/05/09/da8cc785-fc27-4201-a5a3-f8314065f897.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=คั่วไก่นิมมาน',
        locales: {
            th: { name: 'คั่วไก่นิมมาน', desc: 'ก๋วยเตี๋ยวคั่วไก่กระทะร้อน หอมกลิ่นคั่วกระทะสุดๆ', location: 'นิมมาน ซอย 17' },
            en: { name: 'Kua Kai Nimman', desc: 'Famous stir-fried chicken noodles served on a sizzling hot plate.', location: 'Nimman Soi 17' },
            zh: { name: '宁曼路炒鸡面', desc: '主打热铁板炒鸡面，焦香味十足，是宁曼路的明星店。', location: '宁曼路 17 巷' }
        }
    },
    {
        id: 'r7', image: 'https://img.wongnai.com/p/400x0/2014/10/23/7541572782324809813b87b96e384065.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=ไก่ย่างเชิงดอย',
        locales: {
            th: { name: 'ไก่ย่างเชิงดอย', desc: 'ไก่ย่างหนังกรอบที่เป็นเอกลักษณ์ ทานคู่กับส้มตำ', location: 'นิมมาน ซอย 2' },
            en: { name: 'Kai Yang Cherng Doi', desc: 'Famous for its signature crispy-skinned grilled chicken and papaya salad.', location: 'Nimman Soi 2' },
            zh: { name: 'Kai Yang Cherng Doi', desc: '以独特的脆皮烤鸡闻名，搭配凉拌木瓜丝风味绝佳。', location: '宁曼路 2 巷' }
        }
    },
    {
        id: 'r8', image: 'https://api.tourismthailand.org/upload/live/business_content_thumbnail/14394/P08012273.jpeg', mapLink: 'https://www.google.com/maps/search/?api=1&query=โอ้กะจู๋+สันทราย',
        locales: {
            th: { name: 'โอ้กะจู๋', desc: 'ร้านสลัดออร์แกนิกและสเต็กจานยักษ์จากฟาร์มสู่โต๊ะ', location: 'สันทราย / นิมมาน' },
            en: { name: 'Ohkajhu', desc: 'Farm-to-table organic salads and massive steaks for health enthusiasts.', location: 'Sansai / Nimman' },
            zh: { name: 'Ohkajhu', desc: '清迈著名的有机农场餐厅，提供超大份的沙拉和牛排。', location: '三赛 / 宁曼路' }
        }
    },
    {
        id: 'r9', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/6e/3b/2d/signage-in-front-of-pongyang.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=โป่งแยงแอ่งดอย',
        locales: {
            th: { name: 'โป่งแยงแอ่งดอย', desc: 'ร้านอาหารริมน้ำตก บรรยากาศหลักล้าน อาหารไทยรสเลิศ', location: 'แม่ริม' },
            en: { name: 'Pongyang Angdoi', desc: 'Dine by a waterfall. Stunning atmosphere with premium Thai cuisine.', location: 'Mae Rim' },
            zh: { name: 'Pongyang Angdoi', desc: '位于溪流瀑布旁的景观餐厅，环境极美，提供高品质泰国菜。', location: '美林' }
        }
    },
    {
        id: 'r10', image: 'https://api.tourismthailand.org/upload/live/business_content_thumbnail/14098/P08001939.jpeg', mapLink: 'https://www.google.com/maps/search/?api=1&query=ก๋วยเตี๋ยวอัญชัน+เชียงใหม่',
        locales: {
            th: { name: 'ก๋วยเตี๋ยวอัญชัน', desc: 'ก๋วยเตี๋ยวเส้นสีม่วงจากดอกอัญชันและหมูนุ่มน้ำจิ้มแจ่ว', location: 'ศิริมังคลาจารย์' },
            en: { name: 'Anchan Noodle', desc: 'Vibrant blue/purple noodles naturally colored by Butterfly Pea flowers.', location: 'Sirimangkalajarn' },
            zh: { name: '蝶豆花面', desc: '使用天然蝶豆花染色的紫色面条，视觉和味觉双重享受。', location: 'Sirimangkalajarn 路' }
        }
    },
    {
        id: 'r11', image: 'https://cdn-th.orstatic.com/userphoto/doorphoto/2/223/00EMU40CBD94ECF2935670lv.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=ผาลาดตะวันรอน',
        locales: {
            th: { name: 'ผาลาดตะวันรอน', desc: 'ร้านอาหารวิวสวยที่สุด เห็นเมืองเชียงใหม่จากมุมสูง', location: 'ทางขึ้นดอยสุเทพ' },
            en: { name: 'Palaad Tawanron', desc: 'Best city view in Chiang Mai. Perfect for a romantic sunset dinner.', location: 'Suthep Road' },
            zh: { name: 'Palaad Tawanron', desc: '清迈景观极佳的餐厅，可以俯瞰整个城市，适合欣赏日落。', location: '素贴山脚' }
        }
    },
    {
        id: 'r12', image: 'https://www.chillpainai.com/src/wewakeup/scoop/img_scoop/Hits/rote/Jan59/meena/mn06.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=มีนามีข้าว+สันกำแพง',
        locales: {
            th: { name: 'มีนา มีข้าว', desc: 'อาหารไทยสุขภาพ โดดเด่นด้วยข้าว 5 สีและงานฝีมือ', location: 'สันกำแพง' },
            en: { name: 'Meena Rice Based Cuisine', desc: 'Beautifully presented healthy food featuring iconic 5-colored rice.', location: 'San Kamphaeng' },
            zh: { name: 'Meena 有米餐厅', desc: '主打健康的五色米饭，位于清幽的田园风光中。', location: '山甘烹' }
        }
    },
    {
        id: 'r13', image: 'https://www.hungryfatguy.com/wp-content/uploads/2016/03/4fe56ed013f84b668dbd867f1f842345.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=ขนมจีนสันป่าข่อย',
        locales: {
            th: { name: 'ขนมจีนสันป่าข่อย', desc: 'ขนมจีนเจ้าดังเปิดดึก ขวัญใจคนนอนดึกในตลาดทองคำ', location: 'ตลาดทองคำ' },
            en: { name: 'Khanom Jeen San Pa Khoi', desc: 'A late-night favorite for spicy curried noodles in the market.', location: 'Thong Kham Market' },
            zh: { name: 'San Pa Khoi 泰式米粉', desc: '清迈著名的深夜美食，位于市场内，以浓郁的咖喱闻名。', location: 'San Pa Khoi 市场' }
        }
    },
    {
        id: 'r14', image: 'https://pratuneung.com/storage/%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B8%A7%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94/%E0%B8%AD%E0%B8%B2%E0%B8%88%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B9%8C%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%942.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=ครัวอาจารย์สายหยุด',
        locales: {
            th: { name: 'ครัวอาจารย์สายหยุด', desc: 'ประณีตศิลป์แห่งอาหารไทยโบราณ รสชาติและหน้าตาสวยงาม', location: 'สันทราย' },
            en: { name: 'Ajarn Saiyud Kitchen', desc: 'Exquisite royal Thai cuisine with stunning food carvings.', location: 'Sansai' },
            zh: { name: '阿赞赛育厨房', desc: '精致的古代泰国料理，以精湛的雕刻艺术和细腻味道著称。', location: '三赛' }
        }
    },
    {
        id: 'r15', image: 'https://f.ptcdn.info/579/044/000/oapj97fbiU9DWrN6ZQA-o.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=สุกี้ช้างเผือก',
        locales: {
            th: { name: 'สุกี้ช้างเผือก', desc: 'สุกี้เจ้าดังคิวยาว รสชาติเข้มข้น หอมกลิ่นคั่วกระทะ', location: 'ประตูช้างเผือก' },
            en: { name: 'Suki Chang Phueak', desc: 'Iconic street food sukiyaki with a massive following and secret sauce.', location: 'Chang Phueak Gate' },
            zh: { name: '白象街头寿喜烧', desc: '超人气的泰式寿喜烧，酱汁独特，锅气十足。', location: '北门夜市' }
        }
    },
    {
        id: 'r16', image: 'https://down-th.img.susercontent.com/file/de81de560cb50898bf0b94e5ba171cec', mapLink: 'https://www.google.com/maps/search/?api=1&query=หมูทอดเที่ยงคืน+กำแพงดิน',
        locales: {
            th: { name: 'หมูทอดเที่ยงคืน', desc: 'เมนูหมูทอดในตำนานสำหรับคนหิวยามดึก ทานคู่กับน้ำพริกหนุ่ม', location: 'กำแพงดิน' },
            en: { name: 'Midnight Fried Pork', desc: 'Legendary late-night fried pork belly served with sticky rice.', location: 'Kamphaeng Din' },
            zh: { name: '午夜炸猪肉', desc: '清迈深夜食堂的代表，香脆炸五花肉搭配青椒酱是经典。', location: '甘烹丁路' }
        }
    },
    {
        id: 'r17', image: 'https://www.chillpainai.com/src/wewakeup/scoop/images/599ff1bf4cbc57a22179a8a6848904ce63ee5daa.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=มนต์นมสด+เชียงใหม่',
        locales: {
            th: { name: 'มนต์นมสด', desc: 'ร้านขนมปังปิ้งและนมสดแท้ดั้งเดิม สาขาเชียงใหม่', location: 'นิมมานเหมินท์' },
            en: { name: 'Mont Nomsod', desc: 'Traditional fresh milk and thick toast. A classic dessert spot.', location: 'Nimman Road' },
            zh: { name: 'Mont Nomsod', desc: '著名的甜品店，以香醇的鲜奶和松软的厚吐司深受喜爱。', location: '宁曼路' }
        }
    },
    {
        id: 'r19', image: 'https://www.hungryfatguy.com/wp-content/uploads/2022/01/DSC05616.jpg', mapLink: 'https://www.google.com/maps/search/?api=1&query=The+Good+View+เชียงใหม่',
        locales: {
            th: { name: 'The Good View', desc: 'ร้านอาหารริมน้ำปิง บรรยากาศดี ดนตรีสดสนุก อาหารหลากหลาย', location: 'ริมแม่น้ำปิง' },
            en: { name: 'The Good View', desc: 'Riverside dining with great live music and an extensive menu.', location: 'Ping River' },
            zh: { name: 'The Good View', desc: '位于湄滨河畔的标志性餐厅，有现场音乐和丰富的餐点。', location: '湄滨河畔' }
        }
    },
    {
        id: 'r20', image: 'https://ak-d.tripcdn.com/images/1mi3i2234bgvb3r8gB28E_W_640_0_R5_Q80.jpg?proc=source/trip', mapLink: 'https://www.google.com/maps/search/?api=1&query=ร้านอาหารกาแล+เชียงใหม่',
        locales: {
            th: { name: 'ร้านอาหารกาแล', desc: 'ทานอาหารในสวนดอกไม้เมืองหนาวริมอ่างแก้ว บรรยากาศโรแมนติก', location: 'อ่างแก้ว มช.' },
            en: { name: 'Galae Restaurant', desc: 'Dine among blooming flowers by the reservoir. Very romantic.', location: 'Ang Kaew, CMU' },
            zh: { name: 'Galae 餐厅', desc: '湖畔的花园餐厅，四季花团锦簇，氛围极其浪漫。', location: '清迈大学静心湖' }
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
