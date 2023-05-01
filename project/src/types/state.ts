import {store} from '../store';
import {AuthorizationStatus} from '../consts';
import {Offer, Offers} from './offer';
import {Reviews} from './review';
import {UserData} from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
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
  reviews: Reviews;
  hasError: boolean;
  isReviewSending: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
