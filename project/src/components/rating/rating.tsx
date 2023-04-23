import React from 'react';

type RatingProps = {
  value: string;
  title: string;
  onChangeEvent: ((evt: React.ChangeEvent<HTMLInputElement>) => void);
}

function Rating(props: RatingProps) : JSX.Element {
  const {value, title, onChangeEvent} = props;

  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" onChange={onChangeEvent} />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default Rating;
