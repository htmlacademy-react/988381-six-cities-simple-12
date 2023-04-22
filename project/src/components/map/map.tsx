import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {Offers} from '../../types/offer';
import {Icon, Marker} from 'leaflet';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  className: string;
  offers: Offers;
  activeCardId: number | null;
}

function Map({className, offers, activeCardId} : MapProps) : JSX.Element {
  const mapRef = useRef(null);
  const city = offers[0].city;
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
          lat: offer.point.lat,
          lng: offer.point.lng,
        });

        marker.setIcon((offer.id === activeCardId) ? currentCustomIcon : defaultCustomIcon).addTo(map);
      });

      map.setView([city.lat, city.lng], city.zoom);
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
