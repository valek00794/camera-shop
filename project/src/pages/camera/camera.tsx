import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraInfoAction, fetchCameraReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCameraInfo, getSimilarCameras } from '../../store/app-data/selectors';
import { stars } from '../../consts';
import classnames from 'classnames';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import SimilarList from '../../components/similar/similar-list';

enum TabsAbout {
  Specifications = 'specifications',
  Description = 'description',
}

function Camera(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id, about } = useParams();
  const cameraInfo = useAppSelector(getCameraInfo);
  const similarCameras = useAppSelector(getSimilarCameras);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchCameraInfoAction(id));
      dispatch(fetchCameraReviewsAction(id));
      dispatch(fetchSimilarCamerasAction(id));
      window.scrollTo(0, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  const getFullStar = (star: number) => cameraInfo && star <= cameraInfo.rating ? '#icon-full-star' : '#icon-star';

  const getProductTabsClassName = (aboutTabs: string) => classnames(
    'tabs__element',
    { 'is-active': about === aboutTabs }
  );

  const getProductTabsControlClassName = (aboutTabs: string) => classnames(
    'tabs__control',
    { 'is-active': about === aboutTabs }
  );

  return (
    <>
      <main>
        <div className="page-content">
          <BreadcrumbsList />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={cameraInfo ? `/${cameraInfo.previewImgWebp}, /${cameraInfo.previewImgWebp2x}, 2x` : ''} />
                    <img src={cameraInfo ? `/${cameraInfo.previewImg}` : ''} srcSet={cameraInfo ? `/${cameraInfo.previewImg2x}, 2x` : ''} width="560" height="480" alt="Ретрокамера Das Auge IV" />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{cameraInfo?.name}</h1>
                  <div className="rate product__rate">
                    {
                      stars.map((star) => (
                        <svg key={star} width="17" height="16" aria-hidden="true">
                          <use xlinkHref={getFullStar(star)}></use>
                        </svg>
                      ))
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
                      <Link to={id ? `/catalog/${id}/${TabsAbout.Specifications}` : '/'}><button className={getProductTabsControlClassName(TabsAbout.Specifications)} type="button">Характеристики</button></Link>
                      <Link to={id ? `/catalog/${id}/${TabsAbout.Description}` : '/'}><button className={getProductTabsControlClassName(TabsAbout.Description)} type="button">Описание</button></Link>
                    </div>
                    <div className="tabs__content">
                      <div className={getProductTabsClassName(TabsAbout.Specifications)}>
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
                      <div className={getProductTabsClassName(TabsAbout.Description)}>
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
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                {
                  similarCameras &&
                  <div className="product-similar__slider">
                    <h2 className="title title--h3">Похожие товары</h2>
                    <SimilarList />
                  </div>
                }
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ul className="review-block__list">
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Сергей Горский</p>
                      <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 5</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Пётр Матросов</p>
                      <time className="review-card__data" dateTime="2022-03-02">2 марта</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 1</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Хорошее пресс-папье</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Через 3 дня развалилась на куски</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой. Начал настраивать фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал — отломилось несколько лепестков диафрагмы. От злости стукнул камеру об стол, и рукоятка треснула пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Татьяна Кузнецова </p>
                      <time className="review-card__data" dateTime="2021-12-30">30 декабря</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 4</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Редкая</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Высокая цена</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Дорого для портативной видеокамеры, но в моей коллекции как раз не хватало такого экземпляра. Следов использования нет, доставили в заводской упаковке, выглядит шикарно!</p>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </>
  );
}

export default Camera;
