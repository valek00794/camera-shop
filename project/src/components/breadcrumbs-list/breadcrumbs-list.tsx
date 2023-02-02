import { NavLink, useLocation, useParams, } from 'react-router-dom';
import { matchPath } from 'react-router';
import { useAppSelector } from '../../hooks';
import { getCameraInfo } from '../../store/app-data/selectors';
import { CameraNameIncludes } from '../../consts';

const crumbTitles = {
  '/': 'Главная',
  '/catalog': 'Каталог',
  '/catalog/page_:page': 'Страница',
  '/catalog/:id/': 'Товар',
  '/catalog/:id/description/': 'Описание',
  '/catalog/:id/specifications/': 'Характеристики',
};

const getCrumbTitle = (link: string) => {
  const patterns = Object.keys(crumbTitles);
  const findPattern = patterns.find((pattern) => matchPath(pattern, link) !== null);
  const match = findPattern && matchPath(findPattern, link);
  return match && `${crumbTitles[match?.pattern.path as keyof typeof crumbTitles]}`;
};


function BreadcrumbsList(): JSX.Element {
  const location = useLocation();
  const { page } = useParams();
  const cameraInfo = useAppSelector(getCameraInfo);

  const getCrumbsLinks = () => {
    const crumbs = location.pathname.split('/')
      .filter((crumb) => crumb !== '');
    crumbs.unshift('/');

    const crumbsLinks = [];
    const linkSum = crumbs.reduce((sum, item) => {
      crumbsLinks.push(sum);
      return `${sum}${item}/`;
    });
    crumbsLinks.push(linkSum);

    return crumbsLinks;
  };
  const crumbsLinks = getCrumbsLinks();

  const cameraTitle = cameraInfo && (cameraInfo.name.includes(CameraNameIncludes.SearchString) ? cameraInfo.name : `${cameraInfo.category} ${cameraInfo.name}`);


  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {
            crumbsLinks.map((crumb, index) => {
              const crumbTitle = getCrumbTitle(crumb);
              return index !== crumbsLinks.length - 1 ?
                <li key={crumb} className="breadcrumbs__item">
                  <NavLink relative="path" className="breadcrumbs__link" to={crumb} >
                    {cameraInfo && crumbTitle === crumbTitles['/catalog/:id/'] ? cameraTitle : crumbTitle}
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </NavLink>
                </li> :
                <li key={crumb} className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {page && crumbTitle === crumbTitles['/catalog/page_:page'] ? `${crumbTitle} ${page}` : crumbTitle}
                  </span>
                </li>;
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default BreadcrumbsList;
