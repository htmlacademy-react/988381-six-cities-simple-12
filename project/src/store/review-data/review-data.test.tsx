import {makeFakeReviews} from '../../utils/mocks';
import {ReviewData} from '../../types/state';
import {reviewData} from './review-data';
import {fetchReviewsAction, sendReviewAction} from '../api-action';

const fakeReviews = makeFakeReviews();

describe('Reducer reviewData', () => {
  let state: ReviewData;

  beforeEach(() => {
    state = {
      reviews: [],
      hasError: false,
      isReviewSending: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('sendReviewAction test', () => {
    it('should update reviews after load', () => {
      state.reviews = fakeReviews;
      expect(reviewData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
        .toEqual(state);
    });

    it('should pending send review if sendReviewAction status is pending', () => {
      state.hasError = false;
      state.isReviewSending = true;
      expect(reviewData.reducer(state, {type: sendReviewAction.pending.type}))
        .toEqual(state);
    });

    it('should send review if sendReviewAction status is fulfilled', () => {
      state.reviews = fakeReviews;
      state.hasError = false;
      state.isReviewSending = false;
      expect(reviewData.reducer(state, {type: sendReviewAction.fulfilled.type, payload: fakeReviews}))
        .toEqual(state);
    });

    it('should reject send review if sendReviewAction status is rejected', () => {
      state.reviews = [];
      state.hasError = true;
      state.isReviewSending = false;
      expect(reviewData.reducer(state, {type: sendReviewAction.rejected.type}))
        .toEqual(state);
    });
  });
});
