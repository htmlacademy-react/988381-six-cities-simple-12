import ReviewsItem from '../reviews-item/reviews-item';
import {Reviews} from '../../types/review';

type ReviewListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews} : ReviewListProps) : JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
