import {Reviews} from '../../types/review';
import {State} from '../../types/state';
import {NameSpace} from '../../consts';

export const getReviews = (state: State): Reviews => state[NameSpace.Review].reviews;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Review].hasError;
export const getReviewSendingStatus = (state: State): boolean => state[NameSpace.Review].isReviewSending;
