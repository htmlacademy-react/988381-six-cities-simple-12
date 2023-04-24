import {useState} from 'react';
import {SortTypes} from '../../consts';
import {Offers} from '../../types/offer';
import {useAppDispatch} from '../../hooks';
import {sortOffers} from '../../store/offer-data/offer-data';

type OfferCardListSortProps = {
  offers: Offers;
}

function OfferCardListSort({offers} : OfferCardListSortProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string>(SortTypes.DEFAULT);

  const onSortTypeClick = () => {
    setIsOpened(!isOpened);
  };

  const onOptionClick = (value : string) => {
    setActiveOption(value);
    setIsOpened(false);

    dispatch(sortOffers(value));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortTypeClick}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortTypes).map((sortType) => (
          <li className="places__option" key={sortType} tabIndex={0} onClick={() => onOptionClick(sortType)}>{sortType}</li>
        ))}
      </ul>
    </form>
  );
}

export default OfferCardListSort;
