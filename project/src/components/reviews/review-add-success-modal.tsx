import { scrollUp } from '../../utils/utils';

const scrollToOptions: ScrollToOptions[] = [
  {
    top: 0,
    behavior: 'smooth'
  },
  {
    top: 1222,
    behavior: 'smooth'
  }
];

  type ReviewAddSuccessModalProps = {
    activeReviewAddSuccessState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  }

function ReviewAddSuccessModal(props: ReviewAddSuccessModalProps): JSX.Element {
  const [, setIsActiveReviewAddSuccess] = props.activeReviewAddSuccessState;
  const [scrollToTop, scrollToReviews] = scrollToOptions;
  return (

    <div className="modal__content">
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={
            () => {
              scrollUp(scrollToTop);
              setIsActiveReviewAddSuccess(false);
            }
          }
        >Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={
          () => {
            scrollUp(scrollToReviews);
            setIsActiveReviewAddSuccess(false);
          }
        }
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default ReviewAddSuccessModal;
