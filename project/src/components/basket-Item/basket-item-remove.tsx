import { useDispatch } from 'react-redux';
import { removeFromBasketAction } from '../../store/action';
import { BasketCamera } from '../../types/camera';
import { getCameraTitle } from '../../utils/utils';

type BasketItemRemoveProps = {
  item: BasketCamera;
  onCloseModal: () => void;
}
function BasketItemRemove(props: BasketItemRemoveProps): JSX.Element {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeFromBasketAction(props.item.id));
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${props.item.previewImgWebp}, /${props.item.previewImgWebp2x}, 2x`}
            />
            <img
              src={`/${props.item.previewImg}`}
              srcSet={`/${props.item.previewImg2x}, 2x`} width="140" height="120" alt={props.item.name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{getCameraTitle(props.item)}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{props.item.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{`${props.item.type} ${props.item.category}`}</li>
            <li className="basket-item__list-item">{props.item.level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleRemoveItem}>Удалить
        </button>
        <button className="btn btn--transparent modal__btn modal__btn--half-width" onClick={props.onCloseModal}>Продолжить покупки
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>

  );
}

export default BasketItemRemove;
