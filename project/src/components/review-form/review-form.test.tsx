import {fireEvent, render, screen} from '@testing-library/react';
import ReviewForm from './review-form';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeOffer, makeFakeReviews} from '../../utils/mocks';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {RATING_DATA} from '../../consts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();

const store = mockStore({
  DATA: {
    offer: fakeOffer
  },
  REVIEW: {
    review: fakeReviews,
    hasError: false,
    isReviewSending: false
  }
});

const fakeReviewForm = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ReviewForm />
    </HistoryRouter>
  </Provider>
);

describe('Component ReviewForm', () => {
  it('should render correctly', () => {
    render(fakeReviewForm);

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });

  it('should send data to the server', () => {
    render(fakeReviewForm);

    const star = screen.getByTitle(RATING_DATA[0].title);
    const textarea = screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i);
    const submit = screen.getByRole('button');

    expect(submit).toBeDisabled();

    fireEvent.click(star);
    fireEvent.change(textarea, {target: {value: fakeReviews[0].comment}});
    expect(submit).toBeEnabled();
  });
});
