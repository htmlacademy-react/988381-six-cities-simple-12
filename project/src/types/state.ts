import {store} from '../store';
import {AuthorizationStatus} from '../consts';
import {Offer, Offers} from './offer';
import {Review, Reviews} from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type OfferData = {
  location : string;
  offer: Offer | null;
  offers: Offers;
  nearbyOffers: Offers;
  isOfferDataLoading: boolean;
  hasError: boolean;
  sortType: string;
}

export type ReviewData = {
  review: Review | null;
  reviews: Reviews;
  hasError: boolean;
  isReviewSending: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
