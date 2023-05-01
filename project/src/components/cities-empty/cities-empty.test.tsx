import {render, screen} from '@testing-library/react';
import CitiesEmpty from './cities-empty';

describe('Component CitiesEmpty', () => {
  it('should render correctly', () => {
    render(
      <CitiesEmpty />
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Dusseldorf/i)).toBeInTheDocument();
  });
});
