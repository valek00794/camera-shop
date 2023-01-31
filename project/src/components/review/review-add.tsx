import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPostReviewAction } from '../../store/api-actions';
import { getReviewSubmitSuccessful } from '../../store/app-data/selectors';
import { ReviewPost } from '../../types/review';
import { scrollUp } from '../../utils';

type ReviewAddProps = {
  activeReviewAddState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const scrollToOptions: ScrollToOptions = {
  top: 0,
  behavior: 'smooth'
};

function ReviewAdd(props: ReviewAddProps): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isActiveReviewAdd, setIsActiveReviewAdd] = props.activeReviewAddState;
  const [isActiveReviewAddSuccess, setIsActiveReviewAddSuccess] = useState(false);
  const isReviewSubmitSuccessful = useAppSelector(getReviewSubmitSuccessful);
  const isModalOpen = isActiveReviewAdd || isActiveReviewAddSuccess;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitSuccessful, errors }
  } = useForm<ReviewPost>({
    mode: 'onChange'
  });

  useEffect(() => {
    const modalOverlay = document.querySelector('.modal__overlay');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const main = document.querySelector('main');
    document.body.classList.toggle('modal-open', isModalOpen);

    isModalOpen && header?.setAttribute('inert', 'inert');
    isModalOpen && main?.setAttribute('inert', 'inert');
    isModalOpen && footer?.setAttribute('inert', 'inert');
    !isModalOpen && header?.removeAttribute('inert');
    !isModalOpen && main?.removeAttribute('inert');
    !isModalOpen && footer?.removeAttribute('inert');

    const handleCloseModal = () => {
      setIsActiveReviewAdd(false);
      setIsActiveReviewAddSuccess(false);
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
      }
      window.addEventListener('keyup', onUpEsc);
      modalOverlay && modalOverlay.addEventListener('click', handleCloseModal);
    }
    return () => {
      isMounted = false;
      window.removeEventListener('keyup', onUpEsc);
      modalOverlay && modalOverlay.removeEventListener('click', handleCloseModal);
    };
  }, [isReviewSubmitSuccessful, isSubmitSuccessful, reset, setIsActiveReviewAdd, isModalOpen]);

  const getModalBlockClassName = classnames(
    'modal',
    { 'is-active': isActiveReviewAdd },
    { 'is-active modal--narrow': isActiveReviewAddSuccess }
  );

  const ratingValue = getValues('rating');

  const onSubmit: SubmitHandler<ReviewPost> = (postData) => {
    dispatch(fetchPostReviewAction(postData));
  };


  return (
    <div className={getModalBlockClassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
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
                        <input
                          className="visually-hidden"
                          id="star-5"
                          type="radio"
                          value="5"
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                          })}
                        />
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input
                          className="visually-hidden"
                          id="star-4"
                          type="radio"
                          value="4"
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                          })}
                        />
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input
                          className="visually-hidden"
                          id="star-3"
                          type="radio"
                          value="3"
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                          })}
                        />
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input
                          className="visually-hidden"
                          id="star-2"
                          type="radio"
                          value="52"
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                          })}
                        />
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input
                          className="visually-hidden"
                          id="star-1"
                          type="radio"
                          value="1"
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                          })}
                        />
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
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
                      <input type="text" placeholder="Введите ваше имя"
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
              onClick={() => setIsActiveReviewAdd(false)}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        }
        {
          isActiveReviewAddSuccess &&
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
                    scrollUp(scrollToOptions);
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
              onClick={() => setIsActiveReviewAddSuccess(false)}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default ReviewAdd;
