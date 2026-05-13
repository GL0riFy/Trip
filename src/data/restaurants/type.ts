export interface Restaurant {
    id: string;
    slug: string;
    image: string;
    mapLink: string;
    coords: {
        lat: number;
        lng: number;
    };
    rating: number;
    priceLevel: string;
    openHours: string;
    tel: string;
    locales: Record<'th' | 'en' | 'zh', {
        name: string;
        desc: string;
        location: string;
        tags: string[];
        recommended: string[];
    }>;
}

export interface Tip {
    id: number;
    locales: Record<'th' | 'en' | 'zh', {
        title: string;
        desc: string;
    }>;
}
