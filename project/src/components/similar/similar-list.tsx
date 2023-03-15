import { useState } from 'react';

import { SimilarListVisibleSetttings } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/app-data/selectors';
import { Camera } from '../../types/camera';
import SimilarCard from './similar-card';

type SimilarListProps = {
  setIsActiveAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  addToBasketCamera: React.MutableRefObject<Camera | null>;
}

function SimilarList(props: SimilarListProps): JSX.Element {
  const firstVisibleSimilarState = useState(SimilarListVisibleSetttings.FirstElement);
  const [firstVisibleSimilarElement, setFirstVisibleSimilarElement] = firstVisibleSimilarState;
  const similarCameras = useAppSelector(getSimilarCameras);

  const handlePrev = () => setFirstVisibleSimilarElement(firstVisibleSimilarElement - 1);
  const handleNext = () => setFirstVisibleSimilarElement(firstVisibleSimilarElement + 1);

  return (
    <>
      <h2 className="title title--h3">Похожие товары</h2>
      <div className="product-similar__slider">
        <div className="product-similar__slider-list">
          {
            similarCameras.map((camera) => camera &&
              <SimilarCard
                firstVisibleSimilarState={firstVisibleSimilarState}
                key={camera.id}
                camera={camera}
                setIsActiveAddItem={props.setIsActiveAddItem}
                addToBasketCamera={props.addToBasketCamera}
              />)
          }
        </div>
        <button
          className="slider-controls slider-controls--prev"
          type="button"
          aria-label="Предыдущий слайд"
          onClick={handlePrev}
          data-testid="handle-prev"
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
          data-testid="handle-next"
          disabled={
            similarCameras.length < SimilarListVisibleSetttings.VisibleCount ||
            firstVisibleSimilarElement === similarCameras.length - SimilarListVisibleSetttings.VisibleCount
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
