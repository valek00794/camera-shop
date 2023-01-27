import { Link } from 'react-router-dom';
import { stars } from '../../consts';
import { Camera } from '../../types/camera';

type ProductCardProps = {
  camera: Camera;
}

function ProductCard(proops: ProductCardProps): JSX.Element {

  const getFullStar = (star : number) => star <= proops.camera.rating ? '#icon-full-star' : '#icon-star';

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${proops.camera.previewImgWebp}, /${proops.camera.previewImgWebp2x}, 2x`} />
          <img src={`/${proops.camera.previewImg}`} srcSet={`/${proops.camera.previewImg2x}, 2x`} width="280" height="240" alt={proops.camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            stars.map((star) => (
              <svg key={star} width="17" height="16" aria-hidden="true">
                <use xlinkHref={getFullStar(star)}></use>
              </svg>
            ))
          }
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
        <Link className="btn btn--transparent" to={`/catalog/${proops.camera.id}/description`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
