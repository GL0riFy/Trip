import { cityHotels } from './data/city';
import { hotelHotels } from './data/hotel';
import { riversideHotels } from './data/riverside';
import { natureHotels } from './data/nature';

export * from './type';

export const HotelData = [
  ...cityHotels,
  ...hotelHotels,
  ...riversideHotels,
  ...natureHotels,
];