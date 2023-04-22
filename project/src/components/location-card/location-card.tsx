type LocationCardProps = {
  location: string;
  isActive: boolean;
  onClickLocation: (location: string) => void;
}

function LocationCard({location, isActive, onClickLocation} : LocationCardProps) : JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#todo" onClick={() => onClickLocation(location)}>
        <span>{location}</span>
      </a>
    </li>
  );
}

export default LocationCard;
