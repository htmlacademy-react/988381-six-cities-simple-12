import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import NearPlacesList from './near-places-list';
import {makeFakeOffers} from '../../utils/mocks';

const history = createMemoryHistory();

describe('Component NearPlacesList', () => {
  it('should render correctly', () => {
    const fakeOffers = makeFakeOffers();

    render(
      <HistoryRouter history={history}>
        <NearPlacesList places={fakeOffers} currentId={fakeOffers[0].id} />
      </HistoryRouter>
    );

    expect(screen.getAllByRole('article').length).toBe(fakeOffers.length - 1);
  });
});
