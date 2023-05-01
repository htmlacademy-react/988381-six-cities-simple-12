import {State} from '../../types/state';
import {Offer, Offers} from '../../types/offer';
import {NameSpace} from '../../consts';

export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;
export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.Data].nearbyOffers;
export const getOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOfferDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;
export const getCurrentLocation = (state: State): string => state[NameSpace.Data].location;

export const getSortType = (state: State): string => state[NameSpace.Data].sortType;
