import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/app-data/selectors';

import { Camera } from '../../types/camera';
import { getCameraTitle } from '../../utils/utils';
import Stars from '../stars/stars';

type ProductCardProps = {
  camera: Camera;
  setIsActiveAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  addToBasketCamera: React.MutableRefObject<Camera | null>;
}

function ProductCard(props: ProductCardProps): JSX.Element {
  const basketItems = useAppSelector(getBasketItems);
  console.log(basketItems, props.camera);
  const handleCatalogAddItem = () => {
    props.setIsActiveAddItem(true);
    props.addToBasketCamera.current = props.camera;
  };

  return (
    <div className="product-card">
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
          basketItems.includes(props.camera) ?
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

export default ProductCard;
