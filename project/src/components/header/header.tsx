import { Link, NavLink, Outlet } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getBasketItemsCount } from '../../store/app-data/selectors';
import FormSearch from '../form-search/form-search';

function Header(): JSX.Element {
  const basketItemsCount = useAppSelector(getBasketItemsCount());

  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <Link
            className="header__logo"
            to="/"
            aria-label="Переход на главную"
            data-testid="logo-link"
          >
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo"></use>
            </svg>
          </Link>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><NavLink className="main-nav__link" to="/catalog/page_1">Каталог</NavLink>
              </li>
              <li className="main-nav__item"><NavLink className="main-nav__link" to="#">Гарантии</NavLink>
              </li>
              <li className="main-nav__item"><NavLink className="main-nav__link" to="#">Доставка</NavLink>
              </li>
              <li className="main-nav__item"><NavLink className="main-nav__link" to="#">О компании</NavLink>
              </li>
            </ul>
          </nav>
          <FormSearch />
          <Link className="header__basket-link" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            {
              basketItemsCount &&
              <span className="header__basket-count">{basketItemsCount}</span>
            }

          </Link>
        </div>
      </header>
      <div style={{ minHeight: '100vh' }}>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
