import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BasketItem from '../../components/basket-Item/basket-Item';

import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import { AppRoute } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPostCouponAction } from '../../store/api-actions';
import { getBasketItems, getBasketItemsDiscountSum, getBasketItemsSum } from '../../store/app-data/selectors';

function Basket(): JSX.Element {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(getBasketItems);
  const basketItemsSum = useAppSelector(getBasketItemsSum());
  const basketItemsDiscountSum = useAppSelector(getBasketItemsDiscountSum());
  const sumToPay = basketItemsDiscountSum && basketItemsSum ? basketItemsSum - basketItemsDiscountSum : basketItemsSum;

  const [isCoupon, setCoupon] = useState('');

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      window.scrollTo(0, 0);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChangeCouponString = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(evt.target.value);
    localStorage.setItem('couponString', evt.target.value);
  };

  const handleApplyCoupon = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(fetchPostCouponAction(isCoupon));
  };

  const getCouponString = isCoupon === '' && localStorage.getItem('couponString') !== null ? localStorage.getItem('couponString') : isCoupon;

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
                  basketItems.length === 0 &&
                  <div style={{ textAlign: 'center' }}>
                    <p>Ваша корзина пуста, перейдите в каталог чтобы начать покупки</p>
                    <p>
                      <Link className="btn btn--purple" type="submit" to={AppRoute.DefaultCatalog}>
                        В каталог
                      </Link>
                    </p>
                  </div>
                }
                {
                  basketItems?.map((item) => <BasketItem key={item.id} item={item} />)
                }

              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" value={getCouponString !== null && basketItemsDiscountSum && basketItems.length !== 0 ? getCouponString : isCoupon} onChange={(evt) => handleChangeCouponString(evt)} disabled={basketItems.length === 0} />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit" onClick={(evt) => handleApplyCoupon(evt)} disabled={basketItems.length === 0}>Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{basketItems.length === 0 ? 0 : basketItemsSum?.toLocaleString()} ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">{basketItems.length === 0 || !basketItemsDiscountSum ? 0 : basketItemsDiscountSum?.toLocaleString()} ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{basketItems.length === 0 ? 0 : sumToPay?.toLocaleString()}  ₽</span></p>
                  <button className="btn btn--purple" type="submit" disabled={basketItems.length === 0}>Оформить заказ
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
