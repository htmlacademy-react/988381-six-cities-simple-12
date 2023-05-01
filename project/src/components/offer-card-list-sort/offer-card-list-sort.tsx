import {useState} from 'react';
import {SortTypes} from '../../consts';
import {useAppDispatch} from '../../hooks';
import {setSortType} from '../../store/offer-data/offer-data';

function OfferCardListSort() : JSX.Element {
  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string>(SortTypes.DEFAULT);

  const handleSortTypeClick = () => {
    setIsOpened(!isOpened);
  };

  const handleOptionClick = (value : string) => {
    setActiveOption(value);
    setIsOpened(false);

    dispatch(setSortType(value));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortTypeClick}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortTypes).map((sortType) => (
          <li className="places__option" key={sortType} tabIndex={0} onClick={() => handleOptionClick(sortType)}>{sortType}</li>
        ))}
      </ul>
    </form>
  );
}

export default OfferCardListSort;
