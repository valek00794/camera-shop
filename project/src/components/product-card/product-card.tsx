import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';

type ProductCardProps = {
  camera: Camera;
}

function ProductCard(proops: ProductCardProps): JSX.Element {

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${proops.camera.previewImgWebp}, ${proops.camera.previewImgWebp2x}, 2x`} />
          <img src="img/content/img1.jpg" srcSet={`${proops.camera.previewImg2x}, 2x`}width="280" height="240" alt="Ретрокамера «Das Auge IV»" />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
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
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {proops.camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{proops.camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{`${proops.camera.category} ${proops.camera.name}`}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{proops.camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`/catalog/${proops.camera.id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
