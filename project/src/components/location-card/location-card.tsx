import {useAppDispatch} from '../../hooks';
import {setCurrentLocation} from '../../store/offer-data/offer-data';


type LocationCardProps = {
  location: string;
  isActive: boolean;
}

function LocationCard({location, isActive} : LocationCardProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const handleLocationClick = () => {
    dispatch(setCurrentLocation(location));
  };

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#todo" onClick={handleLocationClick}>
        <span>{location}</span>
      </a>
    </li>
  );
}

export default LocationCard;
