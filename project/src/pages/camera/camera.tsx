/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraInfoAction, fetchCameraReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCameraInfo, getCamerasIds, getSimilarCameras } from '../../store/app-data/selectors';
import classnames from 'classnames';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import SimilarList from '../../components/similar/similar-list';
import Stars from '../../components/stars/stars';
import ReviewList from '../../components/review/review-list';
import { scrollUp } from '../../utils';
import { ReviewListSetttings } from '../../consts';
import ReviewAdd from '../../components/review/review-add';
import NotFound from '../../components/not-found/not-found';
import { Helmet } from 'react-helmet-async';

const aboutCameraTabsTitle = {
  specifications: 'Характеристики',
  description: 'Описание',
};

const scrollToOptions: ScrollToOptions = {
  top: 0,
  behavior: 'smooth'
};

function Camera(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id, about } = useParams();
  const cameraInfo = useAppSelector(getCameraInfo);
  const similarCameras = useAppSelector(getSimilarCameras);
  const availableCamerasIDs = useAppSelector(getCamerasIds);
  const visibleReviewsCountState = useState(ReviewListSetttings.VisibleCount);
  const activeReviewAddState = useState(false);
  const [, setVisibleReviewsCount] = visibleReviewsCountState;
  const [specificationsTab, descriptionTab] = Object.keys(aboutCameraTabsTitle);

  const isCameraIdFound = id && !availableCamerasIDs.includes(id);
  const isAboutTitleFound = about as keyof typeof aboutCameraTabsTitle in aboutCameraTabsTitle;

  useEffect(() => {
    let isMounted = true;
    if (isMounted && !isCameraIdFound) {
      dispatch(fetchCameraInfoAction(id));
      dispatch(fetchCameraReviewsAction(id));
      dispatch(fetchSimilarCamerasAction(id));
      setVisibleReviewsCount(ReviewListSetttings.VisibleCount);
      window.scrollTo(0, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, id, isCameraIdFound, setVisibleReviewsCount]);

  if (isCameraIdFound || !isAboutTitleFound) {
    return <NotFound />;
  }

  const getProductTabsClassName = (aboutTabsTitle: string) => classnames(
    'tabs__element',
    { 'is-active': about === aboutTabsTitle }
  );

  const getProductTabsControlClassName = (aboutTabsTitle: string) => classnames(
    'tabs__control',
    { 'is-active': about === aboutTabsTitle }
  );

  return (
    <>
      <Helmet>
        <title>{cameraInfo && about ? `${aboutCameraTabsTitle[about as keyof typeof aboutCameraTabsTitle]} товара - ${cameraInfo?.category} ${cameraInfo?.name}` : ''}</title>
      </Helmet>
      <main>
        <div className="page-content">
          <BreadcrumbsList />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={cameraInfo ? `/${cameraInfo.previewImgWebp}, /${cameraInfo.previewImgWebp2x}, 2x` : ''} />
                    <img src={cameraInfo ? `/${cameraInfo.previewImg}` : ''} srcSet={cameraInfo ? `/${cameraInfo.previewImg2x}, 2x` : ''} width="560" height="480" alt={cameraInfo?.name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{cameraInfo?.name}</h1>
                  <div className="rate product__rate">
                    {
                      <Stars rating={cameraInfo?.rating} />
                    }
                    <p className="visually-hidden">Рейтинг: {cameraInfo?.rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{cameraInfo?.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{cameraInfo?.price} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <Link
                        to={id ? `/catalog/${id}/${specificationsTab}` : '/'}
                      >
                        <button
                          className={getProductTabsControlClassName(specificationsTab)}
                          type="button"
                        >Характеристики
                        </button>
                      </Link>
                      <Link
                        to={id ? `/catalog/${id}/${descriptionTab}` : '/'}
                      >
                        <button
                          className={getProductTabsControlClassName(descriptionTab)}
                          type="button"
                        >Описание
                        </button>
                      </Link>
                    </div>
                    <div className="tabs__content">
                      <div className={getProductTabsClassName(specificationsTab)}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text">{cameraInfo?.vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{cameraInfo?.category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{cameraInfo?.type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{cameraInfo?.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={getProductTabsClassName(descriptionTab)}>
                        <div className="product__tabs-text">
                          <p>{cameraInfo?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {
            similarCameras.length !== 0 &&
            <div className="page-content__section">
              <section className="product-similar">
                <div className="container">
                  <SimilarList />
                </div>
              </section>
            </div>
          }
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <ReviewList
                  visibleReviewsCountState={visibleReviewsCountState}
                  activeReviewAddState={activeReviewAddState}
                />
              </div>
            </section>
          </div>
        </div>
        <button className="up-btn" onClick={() => scrollUp(scrollToOptions)}>
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </button>
      </main>
      <ReviewAdd activeReviewAddState={activeReviewAddState} />
    </>
  );
}

export default Camera;
