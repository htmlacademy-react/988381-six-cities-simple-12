import {render, screen} from '@testing-library/react';
import Rating from './rating';
import {RATING_DATA} from '../../consts';

describe('Component Rating', () => {
  it('should render correctly', () => {
    const onChangeEvent = jest.fn();

    render(
      <Rating value={RATING_DATA[0].value} title={RATING_DATA[0].title} onChangeEvent={onChangeEvent} />
    );

    expect(screen.getByTitle(RATING_DATA[0].title)).toBeInTheDocument();
  });
});
