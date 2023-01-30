import { ReviewListSetttings } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getSortCameraReviews } from '../../store/app-data/selectors';
import ReviewCard from './review-card';

type ReviewListProps = {
  visibleReviewsCountState: [ReviewListSetttings, React.Dispatch<React.SetStateAction<ReviewListSetttings>>];
  activeReviewAddState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function ReviewList(props: ReviewListProps): JSX.Element {
  const [visibleReviewsCount, setVisibleReviewsCount] = props.visibleReviewsCountState;
  const [, setIsActiveReviewAdd] = props.activeReviewAddState;
  const cameraSortReviews = useAppSelector(getSortCameraReviews());
  const cameraReviewsByCount = cameraSortReviews.slice(0, visibleReviewsCount);

  const handleShowMoreReviews = () => setVisibleReviewsCount(visibleReviewsCount + ReviewListSetttings.VisibleCount);

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
          cameraReviewsByCount.map((review) => <ReviewCard key={review.id} review={review} />)
        }
      </ul>
      {
        cameraSortReviews.length >= visibleReviewsCount &&
        <div className="review-block__buttons">
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleShowMoreReviews}
            disabled={cameraSortReviews.length <= visibleReviewsCount}
          >Показать больше отзывов
          </button>
        </div>
      }
    </>
  );
}

export default ReviewList;
