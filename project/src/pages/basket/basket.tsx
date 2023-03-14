import { Helmet } from 'react-helmet-async';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/app-data/selectors';
import { getCameraTitle } from '../../utils/utils';

function Basket(): JSX.Element {
  const basketItems = useAppSelector(getBasketItems);
  return (
    <>
      <Helmet>
        <title>{'Basket'}</title>
      </Helmet>
      <main>
        <div className="page-content">
          <BreadcrumbsList />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {
                  basketItems?.map((item) => (
                    <li className="basket-item" key={item.id}>
                      <div className="basket-item__img">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={`/${item.previewImgWebp}, /${item.previewImgWebp2x}, 2x`}
                          />
                          <img
                            src={`/${item.previewImg}`}
                            srcSet={`/${item.previewImg2x}, 2x`} width="140" height="120" alt={item.name}
                          />
                        </picture>
                      </div>
                      <div className="basket-item__description">
                        <p className="basket-item__title">{getCameraTitle(item)}</p>
                        <ul className="basket-item__list">
                          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{item.vendorCode}</span>
                          </li>
                          <li className="basket-item__list-item">{`${item.type} ${item.category}`}</li>
                          <li className="basket-item__list-item">{item.level} уровень</li>
                        </ul>
                      </div>
                      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{item.price}₽</p>
                      <div className="quantity">
                        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
                          <svg width="7" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-arrow"></use>
                          </svg>
                        </button>
                        <label className="visually-hidden" htmlFor="counter1"></label>
                        <input type="number" id="counter1" min="1" max="99" aria-label="количество товара" />
                        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
                          <svg width="7" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-arrow"></use>
                          </svg>
                        </button>
                      </div>
                      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>37 940 ₽</div>
                      <button className="cross-btn" type="button" aria-label="Удалить товар">
                        <svg width="10" height="10" aria-hidden="true">
                          <use xlinkHref="#icon-close"></use>
                        </svg>
                      </button>
                    </li>
                  ))
                }

              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

    </>
  );
}

export default Basket;
