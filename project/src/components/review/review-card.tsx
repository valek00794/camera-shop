import { Review } from '../../types/review';
import { getHumanizeDateDayMounth } from '../../utils';
import Stars from '../stars/stars';

type ReviewCardProps = {
  review: Review;
}

function ReviewCard(props: ReviewCardProps): JSX.Element {

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{props.review.userName}</p>
        <time className="review-card__data" dateTime={props.review.createAt}>{getHumanizeDateDayMounth(props.review.createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        {
          <Stars rating={props.review.rating} />
        }
        <p className="visually-hidden">Оценка: {props.review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{props.review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{props.review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{props.review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
