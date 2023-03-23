import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../consts';

type BasketAddItemSuccessModalProps = {
  setIsActiveAddItemSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

function BasketAddItemSuccessModal(props: BasketAddItemSuccessModalProps): JSX.Element {
  const { page } = useParams();
  return (
    <div className="modal__content">
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link
          className="btn btn--transparent modal__btn"
          onClick={() => props.setIsActiveAddItemSuccess(false)}
          to={page ? `/catalog/page_${page}` : AppRoute.DefaultCatalog}
        >
          Продолжить покупки
        </Link>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>Перейти в корзину</Link>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => props.setIsActiveAddItemSuccess(false)}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default BasketAddItemSuccessModal;
