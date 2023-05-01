import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list';
import {makeFakeReviews} from '../../utils/mocks';

describe('Component ReviewsList', () => {
  it('should render correctly', () => {
    const fakeReviews = makeFakeReviews();

    render(
      <ReviewsList reviews={fakeReviews} />
    );

    const fakeReviewLength = fakeReviews.length > 10 ? 10 : fakeReviews.length;

    expect(screen.getAllByRole('listitem').length).toBe(fakeReviewLength);
    expect(screen.getByText(fakeReviews[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReviews[0].comment)).toBeInTheDocument();
  });
});
