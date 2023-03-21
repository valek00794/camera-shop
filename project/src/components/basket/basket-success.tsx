import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

type BasketSuccessProps = {
  onCloseModal: () => void;
}

function BasketSuccess(props: BasketSuccessProps): JSX.Element {
  return (
    <div className="modal__content">
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" type="button" to={AppRoute.DefaultCatalog}>Вернуться к покупкам
        </Link>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={props.onCloseModal}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default BasketSuccess;
