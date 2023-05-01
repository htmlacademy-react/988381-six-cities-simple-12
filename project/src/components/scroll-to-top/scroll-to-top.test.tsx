import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ScrollToTop from './scroll-to-top';
import {render} from '@testing-library/react';

const history = createMemoryHistory();

global.scrollTo = jest.fn();

const fakeScrollToTop = (
  <Router location={history.location} navigator={history}>
    <ScrollToTop />
  </Router>
);

describe('Component ScrollToTop', () => {
  it('should render correctly and call scrollTo', () => {
    render(fakeScrollToTop);

    expect(global.scrollTo).toBeCalledTimes(1);
  });
});
