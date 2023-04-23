import {useEffect, useState} from 'react';
import {Offer, Offers} from '../../types/offer';
import {useParams} from 'react-router-dom';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import NearPlacesList from '../../near-places-list/near-places-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';
import {
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchReviewsAction
} from '../../store/api-action';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';

function PropertyScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;

  const params = useParams();
  const currentId = Number(params.id);

  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [currentNearbyOffers, setCurrentNearbyOffers] = useState<Offers>([]);

  useEffect(() => {
    dispatch(fetchOfferAction(currentId));
    dispatch(fetchReviewsAction(currentId));
    dispatch(fetchNearbyOffersAction(currentId));
  }, [currentId, dispatch]);

  const reviews = useAppSelector((state) => state.reviews);

  const offer = useAppSelector((state) => state.offer);
  useEffect(() => {
    setCurrentOffer(offer);
  }, [offer]);

  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  useEffect(() => {
    setCurrentNearbyOffers(nearbyOffers);
  }, [nearbyOffers]);

  const isNearbyOfferDataLoading = useAppSelector((state) => state.isNearbyOfferDataLoading);

  if (isNearbyOfferDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return currentOffer && currentNearbyOffers.length ? (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {currentOffer.images.map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {currentOffer.isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {currentOffer.title}
              </h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${20 * Math.floor(currentOffer.rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {currentOffer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {currentOffer.bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                {currentOffer.maxAdults}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{currentOffer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {currentOffer.goods.map((good) => (
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
                  <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {currentOffer.host.name}
                </span>
                {currentOffer.host.isPro && (
                  <span className="property__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="property__description">
                <p className="property__text">{currentOffer.description}</p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{Object.keys(reviews).length}</span></h2>
              <ReviewsList reviews={reviews} />
              {authorizationStatus && <ReviewForm />}
            </section>
          </div>
        </div>
        <Map className="property" offers={currentNearbyOffers} currentOffer={currentOffer} activeCardId={currentId}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearPlacesList places={currentNearbyOffers} currentId={currentId}/>
        </section>
      </div>
    </main>
  ) : <NotFoundScreen />;
}

export default PropertyScreen;
