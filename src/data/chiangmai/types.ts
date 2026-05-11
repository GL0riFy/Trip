export type LocalizedText = {
  en: string;
  zh: string;
  th: string;
};

export type TripDetailMore = {
  location: string;
  lat: number;
  lng: number;
  img: string;
  video: string;
  credit: string;
};

export type TripItem = {
  id: string;
  title: LocalizedText;
  price: LocalizedText;
  hours: LocalizedText;
  detail: LocalizedText;
  detail_more: TripDetailMore;
};

export type OTOPItem = {
  id: string;
  title: LocalizedText;
  price: LocalizedText;
  hours: LocalizedText;
  detail: LocalizedText;
  detail_more: TripDetailMore;
};