import classnames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPostReviewAction } from '../../store/api-actions';
import { getReviewSubmitSuccessful } from '../../store/app-data/selectors';
import { ReviewPost } from '../../types/review';
import { scrollUp } from '../../utils/utils';
import FocusLock from 'react-focus-lock';
import ReviewAddSuccess from './review-add-success';

type ReviewAddProps = {
  activeReviewAddState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const scrollToOptions: ScrollToOptions = {
  top: 1175,
  behavior: 'smooth'
};

const ratingTitle = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично'
};

const DEFAULT_RATING_VALUE = 0;

function ReviewAdd(props: ReviewAddProps): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isActiveReviewAdd, setIsActiveReviewAdd] = props.activeReviewAddState;
  const activeReviewAddSuccessState = useState(false);
  const [isActiveReviewAddSuccess, setIsActiveReviewAddSuccess] = activeReviewAddSuccessState;
  const [ratingValue, setRatingValue] = useState(DEFAULT_RATING_VALUE);
  const isReviewSubmitSuccessful = useAppSelector(getReviewSubmitSuccessful);
  const isModalOpen = isActiveReviewAdd || isActiveReviewAddSuccess;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors }
  } = useForm<ReviewPost>({
    mode: 'onChange'
  });

  useEffect(() => {
    const modalOverlay = document.querySelector('.modal__overlay');
    document.body.classList.toggle('modal-open', isModalOpen);

    const handleCloseModal = () => {
      setIsActiveReviewAdd(false);
      setIsActiveReviewAddSuccess(false);
      scrollUp(scrollToOptions);
      setRatingValue(DEFAULT_RATING_VALUE);
    };

    const onUpEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    };

    let isMounted = true;
    if (isMounted) {
      if (isSubmitSuccessful && isReviewSubmitSuccessful) {
        reset();
        setIsActiveReviewAdd(false);
        setIsActiveReviewAddSuccess(true);
        setRatingValue(DEFAULT_RATING_VALUE);
      }
      window.addEventListener('keyup', onUpEsc);
      modalOverlay && modalOverlay.addEventListener('click', handleCloseModal);
    }
    return () => {
      isMounted = false;
      window.removeEventListener('keyup', onUpEsc);
      modalOverlay && modalOverlay.removeEventListener('click', handleCloseModal);
    };
  }, [isReviewSubmitSuccessful, isSubmitSuccessful, reset, setIsActiveReviewAdd, isModalOpen, setIsActiveReviewAddSuccess]);

  const getModalBlockClassName = classnames(
    'modal',
    { 'is-active': isActiveReviewAdd },
    { 'is-active modal--narrow': isActiveReviewAddSuccess }
  );

  const onSubmit: SubmitHandler<ReviewPost> = (postData) => {
    dispatch(fetchPostReviewAction(postData));
  };


  return (
    <div className={getModalBlockClassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid="close-overlay"></div>
        {
          isActiveReviewAdd &&
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form
                method="post"
                // eslint академии ошибочно выдает предупреждение
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-review__rate">
                  <fieldset className="rate form-review__item">
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        {
                          Object.keys(ratingTitle).reverse().map((rating) => (
                            <Fragment key={rating}>
                              <input
                                className="visually-hidden"
                                id={`star-${rating}`}
                                type="radio"
                                value={rating}
                                {...register('rating', {
                                  required: 'Нужно оценить товар',
                                })}
                                onChange={(evt) => setRatingValue(Number(evt.target.value))}
                              />
                              <label className="rate__label" htmlFor={`star-${rating}`} title={ratingTitle[rating as unknown as keyof typeof ratingTitle]}></label>
                            </Fragment>
                          ))
                        }
                      </div>
                      <div className="rate__progress"><span className="rate__stars">{ratingValue}</span> <span>/</span> <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">{errors?.rating?.message}</p>
                    <input
                      type="hidden"
                      id="cameraId"
                      {...register('cameraId', {
                        value: Number(id),
                        required: 'Id',
                      })}
                    />
                  </fieldset>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Введите ваше имя"
                        aria-label="userName"
                        {...register('userName', {
                          required: 'Нужно указать имя',
                        })}
                      />
                    </label>
                    <p className="custom-input__error">{errors?.userName?.message}</p>
                  </div>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Основные преимущества товара"
                        {...register('advantage', {
                          required: 'Нужно указать достоинства',
                        })}
                      />
                    </label>
                    <p className="custom-input__error">{errors?.advantage?.message}</p>
                  </div>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Главные недостатки товара"
                        {...register('disadvantage', {
                          required: 'Нужно указать недостатки',
                        })}
                      />
                    </label>
                    <p className="custom-input__error">{errors?.disadvantage?.message}</p>
                  </div>
                  <div className="custom-textarea form-review__item">
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea
                        placeholder="Поделитесь своим опытом покупки"
                        {...register('review', {
                          required: 'Нужно добавить комментарий',
                        })}
                      >
                      </textarea>
                    </label>
                    <div className="custom-textarea__error">{errors?.review?.message}</div>
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
              </form>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              data-testid="btn-close-modal"
              onClick={() => {
                setIsActiveReviewAdd(false);
                scrollUp(scrollToOptions);
              }}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        }
        {
          isActiveReviewAddSuccess &&
          <FocusLock>
            <ReviewAddSuccess activeReviewAddSuccessState={activeReviewAddSuccessState} />
          </FocusLock>
        }
      </div>
    </div>
  );
}

export default ReviewAdd;
