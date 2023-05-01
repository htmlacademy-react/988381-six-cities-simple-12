import {render, screen} from '@testing-library/react';
import OfferCardList from './offer-card-list';
import {makeFakeOffers} from '../../utils/mocks';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {SortTypes} from '../../consts';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component OfferCardList', () => {
  it('should render correctly', () => {
    const fakeOffers = makeFakeOffers();
    const onChangeActiveCard = jest.fn();

    const store = mockStore({
      DATA: {
        sortType: SortTypes.DEFAULT
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferCardList offers={fakeOffers} onChangeActiveCard={onChangeActiveCard} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('article').length).toBe(fakeOffers.length);
  });
});
