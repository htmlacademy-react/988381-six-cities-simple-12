import {ReviewData} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {fetchReviewsAction, sendReviewAction} from '../api-action';

const initialState : ReviewData = {
  review: null,
  reviews: [],
  hasError: false,
  isReviewSending: false
};

export const reviewData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.hasError = false;
        state.isReviewSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.review = action.payload;
        state.isReviewSending = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.hasError = true;
        state.isReviewSending = false;
      });
  }
});
