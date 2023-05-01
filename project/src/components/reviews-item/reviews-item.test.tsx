import {render, screen} from '@testing-library/react';
import ReviewsItem from './reviews-item';
import {makeFakeReview} from '../../utils/mocks';

describe('Component ReviewsItem', () => {
  it('should render correctly', () => {
    const fakeReview = makeFakeReview();

    render(
      <ReviewsItem review={fakeReview} />
    );

    const date = new Date(fakeReview.date);
    const formattedDate = date.toLocaleString('en', {month: 'long', year: 'numeric'});

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
