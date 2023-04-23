import {createAction} from '@reduxjs/toolkit';
import {Offer, Offers} from '../types/offer';
import {AuthorizationStatus} from '../const';
import {Review, Reviews} from '../types/review';

export const setLocation = createAction<string>('location/setLocation');
export const sortOffers = createAction<string>('offers/updateOffers');
export const loadOffer = createAction<Offer>('data/loadOffer');
export const loadOffers = createAction<Offers>('data/loadOffers');
export const loadNearbyOffers = createAction<Offers>('data/loadNearbyOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setOffersStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setNearbyOffersStatus = createAction<boolean>('data/setNearbyOffersDataLoadingStatus');
export const loadReviews = createAction<Reviews>('reviews/loadReviews');
export const setReview = createAction<Review>('review/setReview');
