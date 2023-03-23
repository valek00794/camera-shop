import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { decCountItemBasketAction, addToBasketOrIncCountAction } from '../../store/action';
import { BasketCamera } from '../../types/camera';
import { getCameraTitle, getCameraTypeTitle } from '../../utils/utils';
import Modal from '../modal/modal';
import BasketItemRemoveModal from './basket-item-remove-modal';

type BasketListItemProps = {
  item: BasketCamera;
}

enum ItemsCount {
  Min = 1,
  Max = 99
}

function BasketListItem(props: BasketListItemProps): JSX.Element {
  const dispatch = useDispatch();
  const [isItemCount, setItemCount] = useState(props.item.count);
  const [isModalDelOpen, setModalDelOpen] = useState(false);

  const handleDecCount = () => {
    setItemCount(isItemCount - 1);
    dispatch(decCountItemBasketAction(props.item));
  };
  const handleIncCount = () => {
    setItemCount(isItemCount + 1);
    dispatch(addToBasketOrIncCountAction(props.item));
  };

  const handleChagneCount = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newCountItem = Number(evt.target.value);
    if (newCountItem >= ItemsCount.Min && newCountItem <= ItemsCount.Max) {
      setItemCount(newCountItem);
      dispatch(addToBasketOrIncCountAction(props.item, newCountItem));
    }
  };

  const handleCloseModalRemove = () => {
    setModalDelOpen(false);
  };

  return (
    <>
      <li className="basket-item" key={props.item.id}>
        <div className="basket-item__img">
          <Link to={`/catalog/${props.item.id}`}>
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
          </Link>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title"><Link to={`/catalog/${props.item.id}`}>{getCameraTitle(props.item)}</Link></p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{props.item.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{getCameraTypeTitle(props.item)}</li>
            <li className="basket-item__list-item">{props.item.level} уровень</li>
          </ul>
        </div>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{props.item.price.toLocaleString()}₽</p>
        <div className="quantity">
          <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={handleDecCount} disabled={isItemCount <= ItemsCount.Min}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter1"></label>
          <input type="number" id="counter1" min="1" max="99" aria-label="количество товара" value={isItemCount} onChange={(evt) => handleChagneCount(evt)} />
          <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={handleIncCount} disabled={isItemCount === ItemsCount.Max}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{props.item.count && (props.item.count * props.item.price).toLocaleString()} ₽</div>
        <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={() => setModalDelOpen(true)}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </li>
      <Modal isModalOpen={isModalDelOpen} onCloseModal={handleCloseModalRemove}>
        <BasketItemRemoveModal item={props.item} onCloseModal={handleCloseModalRemove} />
      </Modal>
    </>
  );
}

export default BasketListItem;
