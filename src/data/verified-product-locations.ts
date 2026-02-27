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
      shopName: "Chai Prakan OTOP Center",
      shopNameCN: "Chai Prakan OTOP Center",
      address: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      addressCN: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      mapsQuery: "Chai Prakan OTOP Center Sri Dong Yen Chai Prakan Chiang Mai",
    },
    {
      shopName: "Ko Lak Date Palm",
      shopNameCN: "Ko Lak Date Palm",
      address: "91 Moo 14, Si Dong Yen, Chai Prakan District, Chiang Mai 50320",
      addressCN: "91 Moo 14, Si Dong Yen, Chai Prakan District, Chiang Mai 50320",
      mapsQuery: "Ko Lak Date Palm Chai Prakan Chiang Mai",
    },
    {
      shopName: "Sri Dong Yen Beekeeping Farms",
      shopNameCN: "Sri Dong Yen Beekeeping Farms",
      address: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      addressCN: "Sri Dong Yen, Chai Prakan District, Chiang Mai",
      mapsQuery: "Local beekeeping farms Sri Dong Yen Chai Prakan Chiang Mai",
    },
  ],
  "Chiang Dao": [
    {
      shopName: "Chiang Dao Highland Coffee Farmers Co-op",
      shopNameCN: "Chiang Dao Highland Coffee Farmers Co-op",
      address: "Chiang Dao District, Chiang Mai 50170",
      addressCN: "Chiang Dao District, Chiang Mai 50170",
      mapsQuery: "Chiang Dao Highland Coffee Farmers Co-op Chiang Dao Chiang Mai",
    },
    {
      shopName: "Chiang Dao Hill Tribe Craft Centers",
      shopNameCN: "Chiang Dao Hill Tribe Craft Centers",
      address: "Chiang Dao Subdistrict, Chiang Dao, Chiang Mai",
      addressCN: "Chiang Dao Subdistrict, Chiang Dao, Chiang Mai",
      mapsQuery: "Hill Tribe Craft Centers Chiang Dao Subdistrict Chiang Mai",
    },
    {
      shopName: "Chiang Dao Forest Beekeeping Sites",
      shopNameCN: "Chiang Dao Forest Beekeeping Sites",
      address: "Chiang Dao District, Chiang Mai",
      addressCN: "Chiang Dao District, Chiang Mai",
      mapsQuery: "Forest beekeeping sites Chiang Dao District Chiang Mai",
    },
  ],
  "Chom Thong": [
    {
      shopName: "Chom Thong OTOP Market",
      shopNameCN: "Chom Thong OTOP Market",
      address: "Ban Luang, Chom Thong District, Chiang Mai 50160",
      addressCN: "Ban Luang, Chom Thong District, Chiang Mai 50160",
      mapsQuery: "Chom Thong OTOP Market Ban Luang Chiang Mai",
    },
    {
      shopName: "Chom Thong Traditional Weaving Centers",
      shopNameCN: "Chom Thong Traditional Weaving Centers",
      address: "Chom Thong District, Chiang Mai",
      addressCN: "Chom Thong District, Chiang Mai",
      mapsQuery: "Traditional weaving centers Chom Thong District Chiang Mai",
    },
    {
      shopName: "Ban Luang Highland Farms",
      shopNameCN: "Ban Luang Highland Farms",
      address: "Ban Luang, Chom Thong District, Chiang Mai",
      addressCN: "Ban Luang, Chom Thong District, Chiang Mai",
      mapsQuery: "Highland farms Ban Luang Chom Thong Chiang Mai",
    },
  ],
  "Doi Saket": [
    {
      shopName: "Doi Saket Orchid Farms",
      shopNameCN: "Doi Saket Orchid Farms",
      address: "Choeng Doi Subdistrict, Doi Saket, Chiang Mai",
      addressCN: "Choeng Doi Subdistrict, Doi Saket, Chiang Mai",
      mapsQuery: "Orchid farms Choeng Doi Doi Saket Chiang Mai",
    },
    {
      shopName: "Doi Saket Herb Cultivation Centers",
      shopNameCN: "Doi Saket Herb Cultivation Centers",
      address: "Doi Saket District, Chiang Mai 50220",
      addressCN: "Doi Saket District, Chiang Mai 50220",
      mapsQuery: "Herb cultivation centers Doi Saket District Chiang Mai",
    },
    {
      shopName: "Pa Miang Flower Craft Workshops",
      shopNameCN: "Pa Miang Flower Craft Workshops",
      address: "Pa Miang, Doi Saket District, Chiang Mai",
      addressCN: "Pa Miang, Doi Saket District, Chiang Mai",
      mapsQuery: "Flower craft workshops Pa Miang Doi Saket Chiang Mai",
    },
  ],
  Fang: [
    {
      shopName: "Fang Coffee Cooperative",
      shopNameCN: "Fang Coffee Cooperative",
      address: "Pong Nam Ron, Fang District, Chiang Mai",
      addressCN: "Pong Nam Ron, Fang District, Chiang Mai",
      mapsQuery: "Fang Coffee Cooperative Pong Nam Ron Fang Chiang Mai",
    },
    {
      shopName: "Fang Beekeeping Farms",
      shopNameCN: "Fang Beekeeping Farms",
      address: "Pong Nam Ron, Fang District, Chiang Mai",
      addressCN: "Pong Nam Ron, Fang District, Chiang Mai",
      mapsQuery: "Fang beekeeping farms Pong Nam Ron Fang Chiang Mai",
    },
    {
      shopName: "Fang Herbal Medicine Centers",
      shopNameCN: "Fang Herbal Medicine Centers",
      address: "Fang District, Chiang Mai",
      addressCN: "Fang District, Chiang Mai",
      mapsQuery: "Herbal medicine centers Fang District Chiang Mai",
    },
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
      shopName: "Hang Dong Lacquerware Workshops",
      shopNameCN: "Hang Dong Lacquerware Workshops",
      address: "Hang Dong District, Chiang Mai",
      addressCN: "Hang Dong District, Chiang Mai",
      mapsQuery: "Lacquerware workshops Hang Dong District Chiang Mai",
    },
    {
      shopName: "Hang Dong Local Markets",
      shopNameCN: "Hang Dong Local Markets",
      address: "Hang Dong District, Chiang Mai",
      addressCN: "Hang Dong District, Chiang Mai",
      mapsQuery: "Local markets Hang Dong District Chiang Mai",
    },
  ],
  "Mae Ai": [
    {
      shopName: "Mae Ai Hill Tribe Craft Centers",
      shopNameCN: "Mae Ai Hill Tribe Craft Centers",
      address: "Mae Ai District, Chiang Mai 50280",
      addressCN: "Mae Ai District, Chiang Mai 50280",
      mapsQuery: "Hill tribe craft centers Mae Ai District Chiang Mai",
    },
    {
      shopName: "Mae Ai Herbal Collection Centers",
      shopNameCN: "Mae Ai Herbal Collection Centers",
      address: "Mae Ai District, Chiang Mai 50280",
      addressCN: "Mae Ai District, Chiang Mai 50280",
      mapsQuery: "Herbal collection centers Mae Ai District Chiang Mai",
    },
    {
      shopName: "Mae Ai Highland Farms",
      shopNameCN: "Mae Ai Highland Farms",
      address: "Mae Ai District, Chiang Mai 50280",
      addressCN: "Mae Ai District, Chiang Mai 50280",
      mapsQuery: "Highland farms Mae Ai District Chiang Mai",
    },
  ],
  "Mae On": [
    {
      shopName: "Mae On Ornamental Plant Nurseries",
      shopNameCN: "Mae On Ornamental Plant Nurseries",
      address: "Mae On District, Chiang Mai 50130",
      addressCN: "Mae On District, Chiang Mai 50130",
      mapsQuery: "Ornamental plant nurseries Mae On District Chiang Mai",
    },
    {
      shopName: "Mae On Beekeeping Farms",
      shopNameCN: "Mae On Beekeeping Farms",
      address: "Mae On District, Chiang Mai 50130",
      addressCN: "Mae On District, Chiang Mai 50130",
      mapsQuery: "Beekeeping farms Mae On District Chiang Mai",
    },
    {
      shopName: "Teen Tok Royal Project Center",
      shopNameCN: "Teen Tok Royal Project Center",
      address: "Huai Kaeo, Mae On District, Chiang Mai 50130",
      addressCN: "Huai Kaeo, Mae On District, Chiang Mai 50130",
      mapsQuery: "Royal Project centers Mae On District Chiang Mai",
    },
  ],
  "Mae Rim": [
    {
      shopName: "Mae Rim Orchid Nurseries",
      shopNameCN: "Mae Rim Orchid Nurseries",
      address: "Mae Rim District, Chiang Mai 50180",
      addressCN: "Mae Rim District, Chiang Mai 50180",
      mapsQuery: "Orchid nurseries Mae Rim District Chiang Mai",
    },
    {
      shopName: "Mae Rim Community Gardens",
      shopNameCN: "Mae Rim Community Gardens",
      address: "Mae Rim District, Chiang Mai 50180",
      addressCN: "Mae Rim District, Chiang Mai 50180",
      mapsQuery: "Community gardens Mae Rim District Chiang Mai",
    },
    {
      shopName: "Mae Rim Honey & Herbal Centers",
      shopNameCN: "Mae Rim Honey & Herbal Centers",
      address: "Mae Rim District, Chiang Mai 50180",
      addressCN: "Mae Rim District, Chiang Mai 50180",
      mapsQuery: "Honey producers herbal centers Mae Rim Chiang Mai",
    },
  ],
  "Mae Taeng": [
    {
      shopName: "Mae Taeng Silk Weaving Centers",
      shopNameCN: "Mae Taeng Silk Weaving Centers",
      address: "Mae Taeng District, Chiang Mai 50150",
      addressCN: "Mae Taeng District, Chiang Mai 50150",
      mapsQuery: "Silk weaving centers Mae Taeng District Chiang Mai",
    },
    {
      shopName: "Mae Taeng Craft Centers",
      shopNameCN: "Mae Taeng Craft Centers",
      address: "Mae Taeng District, Chiang Mai 50150",
      addressCN: "Mae Taeng District, Chiang Mai 50150",
      mapsQuery: "Craft centers Mae Taeng District Chiang Mai",
    },
    {
      shopName: "Mae Taeng Local Farms",
      shopNameCN: "Mae Taeng Local Farms",
      address: "Mae Taeng District, Chiang Mai 50150",
      addressCN: "Mae Taeng District, Chiang Mai 50150",
      mapsQuery: "Local farms Mae Taeng District Chiang Mai",
    },
  ],
  "Mueang Chiang Mai": [
    {
      shopName: "Mueang Chiang Mai Silk & Lacquerware Workshops",
      shopNameCN: "Mueang Chiang Mai Silk & Lacquerware Workshops",
      address: "Mueang Chiang Mai District, Chiang Mai 50200",
      addressCN: "Mueang Chiang Mai District, Chiang Mai 50200",
      mapsQuery: "Silk lacquerware workshops Mueang Chiang Mai",
    },
    {
      shopName: "Mueang Chiang Mai Craft Markets & Workshops",
      shopNameCN: "Mueang Chiang Mai Craft Markets & Workshops",
      address: "Mueang Chiang Mai District, Chiang Mai 50200",
      addressCN: "Mueang Chiang Mai District, Chiang Mai 50200",
      mapsQuery: "Craft markets workshops Mueang Chiang Mai",
    },
    {
      shopName: "Chiang Mai Night Bazaar",
      shopNameCN: "Chiang Mai Night Bazaar",
      address: "Chang Khlan Road, Mueang Chiang Mai District, Chiang Mai 50100",
      addressCN: "Chang Khlan Road, Mueang Chiang Mai District, Chiang Mai 50100",
      mapsQuery: "Chiang Mai Night Bazaar Chang Khlan Road Chiang Mai",
    },
  ],
  "San Kamphaeng": [
    {
      shopName: "San Kamphaeng Ceramic Pottery Centers",
      shopNameCN: "San Kamphaeng Ceramic Pottery Centers",
      address: "San Kamphaeng District, Chiang Mai 50130",
      addressCN: "San Kamphaeng District, Chiang Mai 50130",
      mapsQuery: "Ceramic pottery centers San Kamphaeng District Chiang Mai",
    },
    {
      shopName: "Bo Sang Umbrella Village Workshops",
      shopNameCN: "Bo Sang Umbrella Village Workshops",
      address: "Ton Pao, San Kamphaeng District, Chiang Mai 50130",
      addressCN: "Ton Pao, San Kamphaeng District, Chiang Mai 50130",
      mapsQuery: "Bo Sang Umbrella Village workshops San Kamphaeng Chiang Mai",
    },
    {
      shopName: "San Kamphaeng Silk Weaving Factories",
      shopNameCN: "San Kamphaeng Silk Weaving Factories",
      address: "San Kamphaeng District, Chiang Mai 50130",
      addressCN: "San Kamphaeng District, Chiang Mai 50130",
      mapsQuery: "Silk weaving factories San Kamphaeng District Chiang Mai",
    },
    {
      shopName: "San Kamphaeng Lacquerware Workshops",
      shopNameCN: "San Kamphaeng Lacquerware Workshops",
      address: "San Kamphaeng District, Chiang Mai 50130",
      addressCN: "San Kamphaeng District, Chiang Mai 50130",
      mapsQuery: "Lacquerware workshops San Kamphaeng Chiang Mai",
    },
  ],
};
