import { useAppSelector } from '../../hooks';
import { getVisibleSimilarCameras } from '../../store/app-data/selectors';
import SimilarCard from './similar-catd';


function SimilarList(): JSX.Element {

  const visibleSimilarCamerasIDs = [0, 1, 2];
  const visibleSimilarCameras = useAppSelector(getVisibleSimilarCameras(visibleSimilarCamerasIDs));
  return (
    <>
      <div className="product-similar__slider-list">
        {
          visibleSimilarCameras.map((camera) => camera && <SimilarCard key={camera.id} camera={camera} />)
        }
      </div>
      <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд">
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </>
  );
}

export default SimilarList;
