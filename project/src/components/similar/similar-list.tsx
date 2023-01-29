import { useState } from 'react';
import { SimilarCardVisibleSetttings } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/app-data/selectors';
import SimilarCard from './similar-catd';

function SimilarList(): JSX.Element {
  const [firstVisibleSimilarElement, setFirstVisibleSimilarElement] = useState(SimilarCardVisibleSetttings.FirstElement);
  const smilarCameras = useAppSelector(getSimilarCameras);

  const handlePrev = () => setFirstVisibleSimilarElement(firstVisibleSimilarElement - 1);
  const handleNext = () => setFirstVisibleSimilarElement(firstVisibleSimilarElement + 1);

  return (
    <>
      <div className="product-similar__slider-list">
        {
          smilarCameras.map((camera) => camera &&
            <SimilarCard
              firstVisibleSimilarElement={firstVisibleSimilarElement}
              key={camera.id}
              camera={camera}
            />)
        }
      </div>
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        onClick={handlePrev}
        disabled={firstVisibleSimilarElement === 0}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button" aria-label="Следующий слайд"
        onClick={handleNext}
        disabled={firstVisibleSimilarElement === smilarCameras.length - SimilarCardVisibleSetttings.VisibleCount }
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </>
  );
}

export default SimilarList;
