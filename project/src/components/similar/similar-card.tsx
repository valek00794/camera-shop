import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import classnames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/app-data/selectors';
import { SimilarListVisibleSetttings } from '../../consts';
import Stars from '../stars/stars';
import { useEffect } from 'react';

type SimilarCardProps = {
  camera: Camera;
  firstVisibleSimilarState: [SimilarListVisibleSetttings, React.Dispatch<React.SetStateAction<SimilarListVisibleSetttings>>];
}

function SimilarCard(proops: SimilarCardProps): JSX.Element {
  const [firstVisibleSimilarElement, setFirstVisibleSimilarElement] = proops.firstVisibleSimilarState;
  const smilarCameras = useAppSelector(getSimilarCameras);
  const visibleSmilarCamerasIDs = Array.from({
    length: smilarCameras.length < SimilarListVisibleSetttings.VisibleCount ? smilarCameras.length : SimilarListVisibleSetttings.VisibleCount
  },
  (_, index) => smilarCameras[index + firstVisibleSimilarElement].id);

  useEffect(() => {
    setFirstVisibleSimilarElement(SimilarListVisibleSetttings.FirstElement);
  }, [setFirstVisibleSimilarElement]);


  const getVisibleClassname = () =>
    classnames(
      'product-card ',
      { 'is-active': visibleSmilarCamerasIDs.includes(proops.camera.id, 0) }
    );

  return (
    <div className={getVisibleClassname()}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${proops.camera.previewImgWebp}, /${proops.camera.previewImgWebp2x}, 2x`} />
          <img src={`/${proops.camera.previewImg}`} srcSet={`/${proops.camera.previewImg2x}, 2x`} width="280" height="240" alt={proops.camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            <Stars rating={proops.camera.rating} />
          }
          <p className="visually-hidden">Рейтинг: {proops.camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{proops.camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{proops.camera.name}</p>
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

export default SimilarCard;
