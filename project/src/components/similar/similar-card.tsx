import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useEffect } from 'react';

import { Camera } from '../../types/camera';
import { useAppSelector } from '../../hooks';
import { getBasketItems, getSimilarCameras } from '../../store/app-data/selectors';
import { AppRoute, SimilarListVisibleSetttings } from '../../consts';
import Stars from '../stars/stars';
import { getCameraTitle } from '../../utils/utils';


type SimilarCardProps = {
  camera: Camera;
  firstVisibleSimilarState: [SimilarListVisibleSetttings, React.Dispatch<React.SetStateAction<SimilarListVisibleSetttings>>];
  setIsActiveAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  addToBasketCamera: React.MutableRefObject<Camera | null>;
}

function SimilarCard(props: SimilarCardProps): JSX.Element {
  const [firstVisibleSimilarElement, setFirstVisibleSimilarElement] = props.firstVisibleSimilarState;
  const smilarCameras = useAppSelector(getSimilarCameras);
  const basketItems = useAppSelector(getBasketItems);
  const visibleSmilarCamerasIDs = Array.from({
    length: smilarCameras.length < SimilarListVisibleSetttings.VisibleCount ? smilarCameras.length : SimilarListVisibleSetttings.VisibleCount
  },
  (_, index) => smilarCameras[index + firstVisibleSimilarElement].id);

  const handleCatalogAddItem = () => {
    props.setIsActiveAddItem(true);
    props.addToBasketCamera.current = props.camera;
  };

  useEffect(() => {
    setFirstVisibleSimilarElement(SimilarListVisibleSetttings.FirstElement);
  }, [setFirstVisibleSimilarElement]);


  const getVisibleClassname = () =>
    classnames(
      'product-card ',
      { 'is-active': visibleSmilarCamerasIDs.includes(props.camera.id, 0) }
    );

  return (
    <div className={getVisibleClassname()}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${props.camera.previewImgWebp}, /${props.camera.previewImgWebp2x}, 2x`} />
          <img src={`/${props.camera.previewImg}`} srcSet={`/${props.camera.previewImg2x}, 2x`} width="280" height="240" alt={props.camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            <Stars rating={props.camera.rating} />
          }
          <p className="visually-hidden">Рейтинг: {props.camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{props.camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{getCameraTitle(props.camera)}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{props.camera.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {
          basketItems.some((item) => props.camera.id === item.id) ?
            <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>В корзине
            </Link>
            :
            <button
              className="btn btn--purple product-card__btn"
              type="button"
              onClick={handleCatalogAddItem}
            >Купить
            </button>
        }
        <Link className="btn btn--transparent" to={`/catalog/${props.camera.id}/description`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default SimilarCard;
