import {Images} from './image';
import {Host} from './host';
import {Reviews} from './review';
import {City} from './city';
import {Point} from './point';


export type Offer = {
  id: number;
  images: Images;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium : boolean;
  bedrooms: string;
  adults: string;
  features: string[];
  host: Host;
  description: string[];
  reviews: Reviews;
  city: City;
  point: Point;
}

export type Offers = Offer[];
