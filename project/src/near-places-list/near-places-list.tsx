import {Offers} from '../types/offer';
import NearPlacesCard from '../components/near-places-card/near-places-card';

type NearPlacesListProps = {
  places: Offers;
  currentId: number;
}
function NearPlacesList({places, currentId} : NearPlacesListProps) : JSX.Element {
  const list = places.map((place) => (
    (place.id !== currentId) && <NearPlacesCard key={place.id} place={place} />
  ));

  return (
    <div className="near-places__list places__list">
      {list}
    </div>
  );
}

export default NearPlacesList;
