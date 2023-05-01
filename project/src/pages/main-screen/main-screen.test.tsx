import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {LOCATIONS, SortTypes} from '../../consts';
import {render, screen} from '@testing-library/react';
import MainScreen from './main-screen';
import {makeFakeOffers} from '../../utils/mocks';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const activeLocation = LOCATIONS[0];
const fakeOffers = makeFakeOffers();
const filteredFakeOffers = fakeOffers.filter((fakeOffer) => fakeOffer.city.name === activeLocation);

const store = mockStore({
  DATA: {
    location: LOCATIONS[0],
    offer: null,
    offers: fakeOffers,
    nearbyOffers: [],
    isOfferDataLoading: false,
    hasError: false,
    sortType: SortTypes.DEFAULT
  }
});

describe('Component MainScreen', () => {
  it('should render correctly when offers is not null', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen offers={fakeOffers} />
        </HistoryRouter>
      </Provider>
    );

    const offers = screen.getAllByRole('article');

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(`${filteredFakeOffers.length} places to stay in Paris`)).toBeInTheDocument();
    expect(offers.length).toBe(filteredFakeOffers.length);
  });

  it('should render correctly when offers is null', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen offers={[]} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Dusseldorf/i)).toBeInTheDocument();
  });
});
