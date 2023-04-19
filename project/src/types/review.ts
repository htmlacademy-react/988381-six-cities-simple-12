import {Image} from './image';

export type Review = {
  id: number;
  image: Image;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export type Reviews = Review[];
