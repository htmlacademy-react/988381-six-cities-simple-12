import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {City} from '../../types/city';
import {Offers} from '../../types/offer';
import {Icon, Marker} from 'leaflet';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  className: string;
  city: City;
  offers: Offers;
  activeCardId: number | null;
}

function Map({className, city, offers, activeCardId} : MapProps) : JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [20, 39],
  });

  const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [20, 39],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.lat,
          lng: offer.city.lng,
        });

        marker.setIcon((offer.id === activeCardId) ? currentCustomIcon : defaultCustomIcon).addTo(map);
      });
    }
  });

  return (
    <section
      className={`${className}__map map`}
      ref={mapRef}
    >

    </section>
  );
}

export default Map;
