import { useRef, useState } from 'react';

import { ReviewListSetttings, scrollToReviewOptions } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getSortCameraReviews } from '../../store/app-data/selectors';
import { scrollUp } from '../../utils/utils';
import Modal from '../modal/modal';
import ReviewAdd from './review-add';
import ReviewAddSuccess from './review-add-success';
import ReviewCard from './review-card';

type ReviewsListProps = {
  visibleReviewsCountState: [ReviewListSetttings, React.Dispatch<React.SetStateAction<ReviewListSetttings>>];
}

function ReviewsList(props: ReviewsListProps): JSX.Element {
  const [visibleReviewsCount, setVisibleReviewsCount] = props.visibleReviewsCountState;
  const activeReviewAddState = useState(false);
  const [isActiveReviewAdd, setIsActiveReviewAdd] = activeReviewAddState;
  const cameraSortReviews = useAppSelector(getSortCameraReviews());
  const cameraReviewsByCount = cameraSortReviews?.slice(0, visibleReviewsCount);
  const activeReviewAddSuccessState = useState(false);
  const [isActiveReviewAddSuccess, setIsActiveReviewAddSuccess] = activeReviewAddSuccessState;
  const isModalOpenRewiew = isActiveReviewAdd || isActiveReviewAddSuccess;
  const modalWindowRef = useRef<JSX.Element | null>(null);

  const handleShowMoreReviews = () => setVisibleReviewsCount(visibleReviewsCount + ReviewListSetttings.VisibleCount);

  if (isActiveReviewAdd) {
    modalWindowRef.current = <ReviewAdd activeReviewAddState={activeReviewAddState} activeReviewAddSuccessState={activeReviewAddSuccessState} />;
  }
  if (isActiveReviewAddSuccess) {
    modalWindowRef.current = <ReviewAddSuccess activeReviewAddSuccessState={activeReviewAddSuccessState} />;
  }


  const handleCloseModalReview = () => {
    setIsActiveReviewAdd(false);
    setIsActiveReviewAddSuccess(false);
    scrollUp(scrollToReviewOptions);
  };

  return (
    <>
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button
          className="btn"
          type="button"
          onClick={() => setIsActiveReviewAdd(true)}
        >Оставить свой отзыв
        </button>
      </div>
      <ul className="review-block__list">
        {
          cameraReviewsByCount?.map((review) => <ReviewCard key={review.id} review={review} />)
        }
      </ul>
      {
        cameraSortReviews && cameraSortReviews.length > visibleReviewsCount &&
        <div className="review-block__buttons">
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleShowMoreReviews}
          >Показать больше отзывов
          </button>
        </div>
      }
      <Modal isModalOpen={isModalOpenRewiew} onCloseModal={handleCloseModalReview}>
        {modalWindowRef.current}
      </Modal>
    </>
  );
}

export default ReviewsList;
