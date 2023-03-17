import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BasketItem from '../../components/basket-Item/basket-Item';

import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import { AppRoute } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPostCouponAction } from '../../store/api-actions';
import { getBasketItems, getBasketItemsDiscountSum, getBasketItemsSum, getCouponCkeckStatus, getCouponString, getValidCouponStatus } from '../../store/app-data/selectors';

const DEFAULT_SUM = 0;

function Basket(): JSX.Element {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(getBasketItems);
  const isValidCopupon = useAppSelector(getValidCouponStatus);
  const isCouponCheck = useAppSelector(getCouponCkeckStatus);
  const couponString = useAppSelector(getCouponString);
  const basketItemsSum = useAppSelector(getBasketItemsSum());
  const basketItemsDiscountSum = useAppSelector(getBasketItemsDiscountSum());
  const sumToPay = basketItemsDiscountSum && basketItemsSum ? basketItemsSum - basketItemsDiscountSum : basketItemsSum;
  const isEpmtyBasket = basketItems.length === 0;

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
  };

  const handleApplyCoupon = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(fetchPostCouponAction(isCoupon === '' ? couponString : isCoupon));
  };

  const getDiscountFieldClassName = classnames(
    'basket__summary-value ',
    { 'basket__summary-value--bonus': isValidCopupon },
  );

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
                  isEpmtyBasket &&
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
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                            value={isCoupon === '' ? couponString : isCoupon}
                            onChange={(evt) => handleChangeCouponString(evt)}
                            disabled={isEpmtyBasket}
                          />
                        </label>
                        {
                          !isValidCopupon && isCouponCheck && !isEpmtyBasket && isCoupon !== '' &&
                          <p className="custom-input__error">Промокод неверный</p>
                        }
                        {
                          isValidCopupon && isCouponCheck && !isEpmtyBasket &&
                          <p className="custom-input__success">Промокод принят!</p>
                        }
                      </div>
                      <button className="btn" type="submit" onClick={(evt) => handleApplyCoupon(evt)} disabled={isEpmtyBasket || (isCoupon === '' && couponString === '')}>Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{isEpmtyBasket ? DEFAULT_SUM : basketItemsSum?.toLocaleString()} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className={getDiscountFieldClassName}>{isEpmtyBasket || !basketItemsDiscountSum || !isValidCopupon ? DEFAULT_SUM : basketItemsDiscountSum?.toLocaleString()} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">{isEpmtyBasket ? DEFAULT_SUM : sumToPay?.toLocaleString()}  ₽</span>
                  </p>
                  <button className="btn btn--purple" type="submit" disabled={isEpmtyBasket}>Оформить заказ
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
