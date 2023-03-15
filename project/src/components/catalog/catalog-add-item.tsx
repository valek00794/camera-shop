import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addToBasketAction } from '../../store/action';
import { Camera } from '../../types/camera';
import { getCameraTitle } from '../../utils/utils';

type CatalogAddItemProps = {
  addToBasketCamera: Camera | null;
  activeAddItemState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  activeAddItemSuccessState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function CatalogAddItem(props: CatalogAddItemProps): JSX.Element {
  const dispatch = useDispatch();
  const camera = props.addToBasketCamera;
  const [, setIsActiveAddItem] = props.activeAddItemState;
  const [, setIsActiveAddItemSuccess] = props.activeAddItemSuccessState;

  const handleAddToBasket = () => {
    if (camera !== null) {
      dispatch(addToBasketAction({ ...camera, count: 1 }));
      setIsActiveAddItem(false);
    }
    setIsActiveAddItemSuccess(true);
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={camera !== null ? `/${camera.previewImgWebp}, /${camera.previewImgWebp2x}, 2x` : ''}
            />
            <img
              src={camera !== null ? `/${camera.previewImg}` : ''}
              srcSet={camera !== null ? `/${camera.previewImg2x}, 2x` : ''} width="140" height="120" alt={camera !== null ? camera.name : ''}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{camera && getCameraTitle(camera)}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>
              <span className="basket-item__number">{camera && camera.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{camera && camera.type} {camera && camera.category}</li>
            <li className="basket-item__list-item">{camera && camera.level} уровень</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera && camera.price.toLocaleString()} ₽</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleAddToBasket}>
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => setIsActiveAddItem(false)}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default CatalogAddItem;
