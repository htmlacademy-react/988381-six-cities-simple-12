import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../consts';
import {fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction} from '../../store/api-action';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {getReviews} from '../../store/review-data/selectors';
import {getErrorStatus, getNearbyOffers, getOffer} from '../../store/offer-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

function PropertyScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const hasError = useAppSelector(getErrorStatus);

  const params = useParams();
  const currentId = Number(params.id);

  useEffect(() => {
    dispatch(fetchOfferAction(currentId));
    dispatch(fetchReviewsAction(currentId));
    dispatch(fetchNearbyOffersAction(currentId));
  }, [currentId, dispatch]);

  const reviews = useAppSelector(getReviews);

  const offer = useAppSelector(getOffer);

  const nearbyOffers = useAppSelector(getNearbyOffers);

  if (!offer && hasError) {
    return <NotFoundScreen />;
  }

  if (!offer || !nearbyOffers.length) {
    return <LoadingScreen />;
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offer.isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${20 * Math.floor(offer.rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                {offer.maxAdults}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good) => (
                  <li key={good} className="property__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro && (
                  <span className="property__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="property__description">
                <p className="property__text">{offer.description}</p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{Object.keys(reviews).length}</span></h2>
              <ReviewsList reviews={reviews} />
              {authorizationStatus && <ReviewForm />}
            </section>
          </div>
        </div>
        <Map className="property" offers={nearbyOffers} currentOffer={offer} activeCardId={currentId}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearPlacesList places={nearbyOffers} currentId={currentId}/>
        </section>
      </div>
    </main>
  );
}

export default PropertyScreen;
