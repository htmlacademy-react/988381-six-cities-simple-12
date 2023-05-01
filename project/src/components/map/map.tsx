import {useEffect, useRef} from 'react';
import useMap from '../../hooks/use-map';
import {Offer, Offers} from '../../types/offer';
import {Icon, Marker} from 'leaflet';
import {Markers} from '../../consts';

type MapProps = {
  className: string;
  offers: Offers;
  currentOffer?: Offer;
  activeCardId: number | null;
}

function Map({className, offers, currentOffer, activeCardId} : MapProps) : JSX.Element {
  const mapRef = useRef(null);
  const city = offers[0].city;
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl: Markers.URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [20, 39],
  });

  const currentCustomIcon = new Icon({
    iconUrl: Markers.URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [20, 39],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon((offer.id === activeCardId) ? currentCustomIcon : defaultCustomIcon).addTo(map);
      });

      if (currentOffer) {
        const marker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });

        marker.setIcon(currentCustomIcon).addTo(map);
      }

      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  });

  return (
    <section
      className={`${className}__map map`}
      ref={mapRef}
      data-testid='map'
    >

    </section>
  );
}

export default Map;
