import {fireEvent, render, screen} from '@testing-library/react';
import {makeFakeOffer} from '../../utils/mocks';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import OfferCard from './offer-card';
import {AppRoute} from '../../consts';
import {generatePath} from 'react-router-dom';

const history = createMemoryHistory();

const fakeOffer = makeFakeOffer();
const onMouseEnterHandler = jest.fn();
const onMouseLeaveHandler = jest.fn();

const fakeOfferCard = (
  <HistoryRouter history={history}>
    <OfferCard offer={fakeOffer} onMouseEnterHandler={onMouseEnterHandler} onMouseLeaveHandler={onMouseLeaveHandler} />
  </HistoryRouter>
);

describe('Component OfferCard', () => {
  it('should render correctly', () => {
    render(fakeOfferCard);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

  it('should redirect to "PropertyScreen" after click on "OfferCard"', () => {
    render(fakeOfferCard);

    fireEvent.click(screen.getAllByRole('link')[0]);
    expect(history.location.pathname).toBe(generatePath(AppRoute.Offer, {id: `${fakeOffer.id}`}));
  });

  it('should set active offer after mouse enter', () => {
    render(fakeOfferCard);

    fireEvent.mouseEnter(screen.getByRole('article'));
    expect(onMouseEnterHandler).toBeCalledTimes(1);
  });
});
