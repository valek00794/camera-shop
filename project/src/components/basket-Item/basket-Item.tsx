import { useDispatch } from 'react-redux';
import { changeCountInBasketAction } from '../../store/action';
import { BasketCamera } from '../../types/camera';
import { getCameraTitle } from '../../utils/utils';


type BasketItemProps = {
  item: BasketCamera;
}

enum ChangeCountAction {
  Inc = 'inc',
  Dec = 'dec'
}

enum ItemsCount {
  Min = 1,
  Max = 99
}

function BasketItem(props: BasketItemProps): JSX.Element {
  const dispatch = useDispatch();
  const handleChangeCount = (camera: BasketCamera, action: ChangeCountAction) => {
    let newCount = camera.count;
    switch (action) {
      case ChangeCountAction.Dec:
        newCount = camera.count - 1;
        break;
      case ChangeCountAction.Inc:
        newCount = camera.count + 1;
        break;
    }
    dispatch(changeCountInBasketAction({ ...camera, count: newCount }));
  };
  return (
    <li className="basket-item" key={props.item.id}>
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
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{props.item.price}₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={() => handleChangeCount(props.item, ChangeCountAction.Dec)} disabled={props.item.count <= ItemsCount.Min}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" min="1" max="99" aria-label="количество товара" value={props.item.count} />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={() => handleChangeCount(props.item, ChangeCountAction.Inc)} disabled={props.item.count === ItemsCount.Max}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{props.item.count && props.item.count * props.item.price} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
