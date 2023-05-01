import {City, Offer, Offers} from '../types/offer';
import {datatype, helpers, image, internet} from 'faker';
import {LOCATIONS} from '../consts';
import {Review, Reviews} from '../types/review';
import {UserData} from '../types/user-data';
import {ReviewData} from '../types/review-data';
import {AuthData} from '../types/auth-data';

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(3),
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: helpers.randomize([10, 12])
    },
    name: helpers.randomize(LOCATIONS)
  },
  description: datatype.string(),
  goods: datatype.array(12).map((e) => String(e)),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName()
  },
  id: datatype.number(),
  images: datatype.array(6).map(() => image.imageUrl(640, 480, 'city', true)),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: helpers.randomize([10, 12])
  },
  maxAdults: datatype.number(6),
  previewImage: image.imageUrl(640, 480, 'city', true),
  price: datatype.number(),
  rating: datatype.float({min: 1, max: 5, precision: 0.01}),
  title: datatype.string(),
  type: helpers.randomize(['hotel', 'house', 'room', 'apartment'])
});

export const makeFakeOffers = (): Offers => (
  datatype.array(30).map(() => makeFakeOffer())
);

export const makeFakeNearbyOffers = (): Offers => (
  datatype.array(3).map(() => makeFakeOffer())
);

export const makeFakeReview = (): Review => ({
  comment: datatype.string(60),
  date: datatype.string(),
  id: datatype.number(),
  rating: datatype.float({min: 1, max: 5, precision: 0.01}),
  user: {
    id: datatype.number(),
    name: datatype.string(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean()
  }
});

export const makeFakeReviews = (): Reviews => (
  datatype.array(30).map(() => makeFakeReview())
);

export const makeFakeReviewData = (): ReviewData => ({
  id: datatype.number(),
  comment: datatype.string(60),
  rating: datatype.float({min: 1, max: 5, precision: 0.01})
});

export const makeFakeCity = (): City => ({
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: helpers.randomize([10, 12])
  },
  name: helpers.randomize(LOCATIONS)
});

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  email: internet.email(),
  token: datatype.string()
});

export const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: internet.password()
});
