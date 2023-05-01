import {render, screen} from '@testing-library/react';
import Map from './map';
import {makeFakeOffers} from '../../utils/mocks';

describe('Component Map', () => {
  it('should render correctly', () => {
    const fakeOffers = makeFakeOffers();

    render(
      <Map className={'cities__map map'} offers={fakeOffers} activeCardId={fakeOffers[0].id} />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
