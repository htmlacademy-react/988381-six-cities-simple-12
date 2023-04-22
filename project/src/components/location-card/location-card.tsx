import {useAppDispatch} from '../../hooks';
import {setLocation} from '../../store/action';

type LocationCardProps = {
  location: string;
  isActive: boolean;
}

function LocationCard({location, isActive} : LocationCardProps) : JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#todo" onClick={() => dispatch(setLocation(location))}>
        <span>{location}</span>
      </a>
    </li>
  );
}

export default LocationCard;
