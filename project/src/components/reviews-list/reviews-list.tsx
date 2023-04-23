import ReviewsItem from '../reviews-item/reviews-item';
import {Reviews} from '../../types/review';
import {MAX_COMMENTS_COUNT} from '../../consts';

type ReviewListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews} : ReviewListProps) : JSX.Element {
  const sortReviews = [...reviews];
  sortReviews.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  return (
    <ul className="reviews__list">
      {sortReviews.slice(0, MAX_COMMENTS_COUNT).map((review) => (
        <ReviewsItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
