import React from 'react';
import {RATING_DATA} from '../../const';
import Rating from '../rating/rating';

function ReviewForm() : JSX.Element {
  const [formData, setFormData] = React.useState({
    rating: '',
    review: ''
  });

  const fieldChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_DATA.map((rating) => (
          <Rating key={rating.value} value={rating.value} title={rating.title} onChangeEvent={fieldChangeHandle} />
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.review} onChange={fieldChangeHandle}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
