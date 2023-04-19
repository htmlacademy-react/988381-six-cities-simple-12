import React, {Fragment} from 'react';

type RatingProps = {
  value: string;
  title: string;
  onChangeEvent: ((evt: React.ChangeEvent<HTMLInputElement>) => void);
}

function Rating(props: RatingProps) : JSX.Element {
  return (
    <Fragment>
      <input className="form__rating-input visually-hidden" name="rating" value={props.value} id={`${props.value}-stars`} type="radio" onChange={props.onChangeEvent} />
      <label htmlFor={`${props.value}-stars`} className="reviews__rating-label form__rating-label" title={props.title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </Fragment>
  );
}

export default Rating;
