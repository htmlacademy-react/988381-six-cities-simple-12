import LocationCard from '../location-card/location-card';

type LocationsListProps = {
  locations: string[];
  activeLocation: string;
  onChangeActiveLocation: (location: string) => void;
}

function LocationsList({locations, activeLocation, onChangeActiveLocation} : LocationsListProps) : JSX.Element {
  const list = locations.map((location) => (
    <LocationCard key={location} location={location} isActive={activeLocation === location} onClickLocation={onChangeActiveLocation} />
  ));

  return (
    <ul className="locations__list tabs__list">
      {list}
    </ul>
  );
}

export default LocationsList;
