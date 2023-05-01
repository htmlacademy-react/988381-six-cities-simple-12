import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {RATING_DATA, CommentParameters} from '../../consts';
import Rating from '../rating/rating';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ReviewData} from '../../types/review-data';
import {sendReviewAction} from '../../store/api-action';
import {Offer} from '../../types/offer';
import {getOffer} from '../../store/offer-data/selectors';
import {getErrorStatus, getReviewSendingStatus} from '../../store/review-data/selectors';

function ReviewForm() : JSX.Element {
  const dispatch = useAppDispatch();

  const reviewRef = useRef<HTMLTextAreaElement | null>(null);

  const [formData, setFormData] = useState({
    rating: 0,
    review: ''
  });
  const [submitButton, setSubmitButton] = useState(false);

  const hasError = useAppSelector(getErrorStatus);
  const isReviewSending = useAppSelector(getReviewSendingStatus);

  useEffect(() => {
    const isDisabled = (formData.review.length < CommentParameters.MIN_COMMENT_LENGTH || formData.review.length > CommentParameters.MAX_COMMENT_LENGTH || formData.rating === 0);
    setSubmitButton(isDisabled);
  }, [formData.review.length, formData.rating]);

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = (reviewData: ReviewData) => {
    dispatch(sendReviewAction(reviewData));
    if (!hasError) {
      clearForm();
    }
  };

  const offer = useAppSelector(getOffer) as Offer;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      id: offer.id,
      comment: formData.review,
      rating: formData.rating
    });
  };

  const clearForm = () => {
    if (formData.rating) {
      const ratingElement = document.getElementById(`${formData.rating}-stars`);
      if (ratingElement) {
        (ratingElement as HTMLInputElement).checked = false;
      }
    }

    if (reviewRef.current !== null) {
      reviewRef.current.value = '';
    }

    setFormData({rating: 0, review: ''});
    setSubmitButton(false);
  };

  return (
    <form className="reviews__form form" action="" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_DATA.map((rating) => (
          <Rating key={rating.value} value={rating.value} title={rating.title} onChangeEvent={handleFieldChange} />
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" ref={reviewRef} value={formData.review} disabled={isReviewSending} onChange={handleFieldChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={submitButton}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
