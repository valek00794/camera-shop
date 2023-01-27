/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Link, useLocation } from 'react-router-dom';

function BreadcrumbsList(): JSX.Element {
  const location = useLocation();
  let currntLink = [];

  const crumbs = location.pathname.split('/')
    .filter((crumb) => crumb !== '');
  //console.log(crumbs);

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/catalog/page_1">Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BreadcrumbsList;
