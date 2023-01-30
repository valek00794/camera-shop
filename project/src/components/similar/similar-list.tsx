import { useState } from 'react';
import { SimilarListVisibleSetttings } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/app-data/selectors';
import SimilarCard from './similar-card';

function SimilarList(): JSX.Element {
  const firstVisibleSimilarState = useState(SimilarListVisibleSetttings.FirstElement);
  const [firstVisibleSimilarElement, setFirstVisibleSimilarElement] = firstVisibleSimilarState;
  const smilarCameras = useAppSelector(getSimilarCameras);

  const handlePrev = () => setFirstVisibleSimilarElement(firstVisibleSimilarElement - 1);
  const handleNext = () => setFirstVisibleSimilarElement(firstVisibleSimilarElement + 1);

  return (
    <>
      <h2 className="title title--h3">Похожие товары</h2>
      <div className="product-similar__slider">
        <div className="product-similar__slider-list">
          {
            smilarCameras.map((camera) => camera &&
              <SimilarCard
                firstVisibleSimilarState={firstVisibleSimilarState}
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
          disabled={
            smilarCameras.length < SimilarListVisibleSetttings.VisibleCount ||
            firstVisibleSimilarElement === smilarCameras.length - SimilarListVisibleSetttings.VisibleCount
          }
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
    </>
  );
}

export default SimilarList;
