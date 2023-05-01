import {renderHook} from '@testing-library/react';
import useMap from './use-map';
import {makeFakeCity} from '../utils/mocks';

const fakeCity = makeFakeCity();

describe('Hook useMap', () => {
  it('should return map object', () => {
    const mapWrapper = document.createElement('div');
    document.body.appendChild(mapWrapper);

    const mapRef = {
      current: mapWrapper
    };

    const {result} = renderHook(() => useMap(mapRef, fakeCity));

    const map = result.current;

    expect(map).toBeInstanceOf(Object);
  });
});
