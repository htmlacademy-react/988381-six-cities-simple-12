import LocationCard from '../location-card/location-card';

type LocationsListProps = {
  locations: string[];
  activeLocation: string;
}

function LocationsList({locations, activeLocation} : LocationsListProps) : JSX.Element {
  const list = locations.map((location) => (
    <LocationCard key={location} location={location} isActive={activeLocation === location} />
  ));

  return (
    <ul className="locations__list tabs__list">
      {list}
    </ul>
  );
}

export default LocationsList;
