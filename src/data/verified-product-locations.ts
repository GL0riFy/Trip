export type DistrictLocationOverride = {
  shopName: string;
  shopNameCN: string;
  address: string;
  addressCN: string;
  mapsQuery: string;
  mapRating?: number;
  phone?: string;
};

// Multiple verified local selling points per district.
// Products in the same district are assigned different entries in order.
export const verifiedDistrictLocationOverrides: Record<string, DistrictLocationOverride[]> = {
  "Chai Prakan": [
    {
      shopName: "Ko Lak Date Palm",
      shopNameCN: "Ko Lak Date Palm",
      address: "91 Moo 14, Si Dong Yen, Chai Prakan District, Chiang Mai 50320",
      addressCN: "91 Moo 14, Si Dong Yen, Chai Prakan District, Chiang Mai 50320",
      mapsQuery: "Ko Lak Date Palm Chai Prakan Chiang Mai",
    }
    ,
    {
      shopName: "Sri Dong Yen Beekeeping Farms",
      shopNameCN: "Sri Dong Yen Beekeeping Farms",
      address: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      addressCN: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      mapsQuery: "Local beekeeping farms Sri Dong Yen Chai Prakan Chiang Mai",
    },
    {
      shopName: "Dr. Chatree Herbal Medicine Centers",
      shopNameCN: "Dr. Chatree Herbal Medicine Centers",
      address: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      addressCN: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      mapsQuery: "Dr. Chatree Herbal Medicine Centers Sri Dong Yen Chai Prakan Chiang Mai",
    }
  ],
  "Chiang Dao": [
    {
      shopName: "TATA Chiang Dao Cafe and Farm",
      shopNameCN: "TATA Chiang Dao Cafe and Farm",
      address: "501 Moo 1, Chiang Dao Subdistrict, Chiang Dao District, Chiang Mai 50170",
      addressCN: "501 Moo 1, Chiang Dao Subdistrict, Chiang Dao District, Chiang Mai 50170",
      mapsQuery: "https://www.google.com/maps?q=501+TaTa+Chiang+Dao+Cafe,+Restaurant,+and+Farm+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%94%E0%B8%B2%E0%B8%A7+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%94%E0%B8%B2%E0%B8%A7+%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88+50170&ftid=0x30d0a7004a701d13:0x675fdc38a4ad5945&entry=gps&lucs=,94212782,47071704,47069508,47084304,94208458,94208447&g_ep=CAISDTYuMTA3LjMuNDk1NDAYACCenQoqNiw5NDIxMjc4Miw0NzA3MTcwNCw0NzA2OTUwOCw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICVEg%3D&g_st=ic",
    },
    {
      shopName: "Chiang Dao Hill Tribe Craft Centers",
      shopNameCN: "Chiang Dao Hill Tribe Craft Centers",
      address: "82XM+7W5, Chiang Dao, Chiang Dao District, Chiang Mai 50170",
      addressCN: "82XM+7W5, Chiang Dao, Chiang Dao District, Chiang Mai 50170",
      mapsQuery: "82XM+7W5, Chiang Dao, Chiang Dao District, Chiang Mai 50170",
    }
  ],
  "Chom Thong": [
    {
      shopName: "Thai Hmong Community Market",
      shopNameCN: "Thai Hmong Community Market",
      address: "GGJC+CPH, Ban Luang, Chom Thong District, Chiang Mai 50160, Thailand",
      addressCN: "GGJC+CPH, Ban Luang, Chom Thong District, Chiang Mai 50160, Thailand",
      mapsQuery: "Thai Hmong Community Market Ban Luang Chiang Mai",
    }
    
    
  ],
  "Doi Saket": [
    
    {
      shopName: "Celadol Ceramic Pottery",
      shopNameCN: "Celadol Ceramic Pottery",
      address: "135/4 Doi Saket Road, Pa Pong Subdistrict, Doi Saket District, Chiang Mai 50220, Thailand",
      addressCN: "135/4 堆沙革路，帕蓬分区，堆沙革县，清迈府 50220，泰国",
      mapsQuery: "Celadol Ceramic Pottery Doi Saket Chiang Mai",
    }
  ],
  Fang: [
    
  
  ],
  "Hang Dong": [
    {
      shopName: "Ban Tawai Woodcarving Village",
      shopNameCN: "Ban Tawai Woodcarving Village",
      address: "Khun Khong, Hang Dong District, Chiang Mai 50230",
      addressCN: "Khun Khong, Hang Dong District, Chiang Mai 50230",
      mapsQuery: "Ban Tawai Woodcarving Village Hang Dong Chiang Mai",
      mapRating: 4.5,
    },
    {
      shopName: "Hang Dong Baan Muang Kung Lacquerware",
      shopNameCN: "Hang Dong Baan Muang Kung Lacquerware",
      address: "259 Ban Mueang Kung, Nong Kwai Subdistrict, Hang Dong District, Chiang Mai 50230, Thailand",
      addressCN: "259 孟功村，农快分区，杭东县，清迈府 50230，泰国",
      mapsQuery: "Baan Muang Kung Lacquerware Hang Dong Chiang Mai",
    }
  ],
  "Mae Ai": [
    
  
  ],
  "Mae On": [
    
    {
      shopName: "Teen Tok Royal Project Center",
      shopNameCN: "Teen Tok Royal Project Center",
      address: "Huai Kaeo, Mae On District, Chiang Mai 50130",
      addressCN: "Huai Kaeo, Mae On District, Chiang Mai 50130",
      mapsQuery: "Teen Tok Royal Project centers Mae On District Chiang Mai",
    },
  ],
  "Mae Rim": [
    
    
    {
      shopName: "Mae Rim Honey & Herbal Centers",
      shopNameCN: "Mae Rim Honey & Herbal Centers",
      address: "Mae Rim District, Chiang Mai 50180",
      addressCN: "Mae Rim District, Chiang Mai 50180",
      mapsQuery: "Honey producers herbal centers Mae Rim Chiang Mai",
    }
  ],
  "Mae Taeng": [
    

    
  ],
  "Mueang Chiang Mai": [
    {
      shopName: "One Nimman Shopping Complex",
      shopNameCN: "One Nimman Shopping Complex",
      address: "Mueang Chiang Mai District, Chiang Mai 50200",
      addressCN: "Mueang Chiang Mai District, Chiang Mai 50200",
      mapsQuery: "One Nimman Shopping Complex Mueang Chiang Mai",
    },
    {
      shopName: "Warorot Market (Kad Luang)",
      shopNameCN: "Warorot Market (Kad Luang)",
      address: "Mueang Chiang Mai District, Chiang Mai 50200",
      addressCN: "Mueang Chiang Mai District, Chiang Mai 50200",
      mapsQuery: "Warorot Market Kad Luang Mueang Chiang Mai",
    },
    {
      shopName: "Central Chiangmai Airport",
      shopNameCN: "Central Chiangmai Airport",
      address: "Chang Khlan Road, Mueang Chiang Mai District, Chiang Mai 50100",
      addressCN: "Chang Khlan Road, Mueang Chiang Mai District, Chiang Mai 50100",
      mapsQuery: "Central Chiangmai Airport Chang Khlan Road Chiang Mai",
    }
  ],
  "San Kamphaeng": [
    {
      shopName: "Chiang Mai OTOP Center",
      shopNameCN: "Chiang Mai OTOP Center",
      address: "San Kamphaeng District, Chiang Mai 50130",
      addressCN: "San Kamphaeng District, Chiang Mai 50130",
      mapsQuery: "Chiang Mai OTOP Center San Kamphaeng District Chiang Mai",
    },
    {
      shopName: "Bo Sang Umbrella Village Workshops",
      shopNameCN: "Bo Sang Umbrella Village Workshops",
      address: "Ton Pao, San Kamphaeng District, Chiang Mai 50130",
      addressCN: "Ton Pao, San Kamphaeng District, Chiang Mai 50130",
      mapsQuery: "Bo Sang Umbrella Village workshops San Kamphaeng Chiang Mai",
    }
    
  ],
};
