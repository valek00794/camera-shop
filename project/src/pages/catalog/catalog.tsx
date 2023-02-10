/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Banner from '../../components/banner/banner';
import FilterForm from '../../components/filter-form/filter-form';
import SortForm from '../../components/sort-form/sort-form';
import ProductCard from '../../components/product-card/product-card';
import PaginationList from '../../components/pagination-list/pagination-list';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import { useAppSelector } from '../../hooks';
import { getCamerasAmount, getCamerasByPage, getCamerasDataLoading, getPromoDataLoading } from '../../store/app-data/selectors';
import NotFound from '../../components/not-found/not-found';
import { CAMERAS_AMOUNT_SHOW_BY_PAGE } from '../../consts';
import Loading from '../../components/loading/loading';

function Catalog(): JSX.Element {
  const { page } = useParams();
  const sliceCameras = useAppSelector(getCamerasByPage(Number(page)));
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoading);
  const isPromoDataLoading = useAppSelector(getPromoDataLoading);

  const camerasAmount = useAppSelector(getCamerasAmount);
  const pageCount = Math.ceil(camerasAmount / CAMERAS_AMOUNT_SHOW_BY_PAGE);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  if (isCamerasDataLoading) {
    return <Loading />;
  }

  if (!pages.includes(Number(page))) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{page ? `Каталог фото- и видеотехники - страница ${page}` : ''}</title>
      </Helmet>
      <main>
        <Banner />
        <div className="page-content">
          <BreadcrumbsList />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <FilterForm />
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <SortForm />
                  </div>
                  <div className="cards catalog__cards">
                    {sliceCameras.map((camera) => <ProductCard key={camera.id} camera={camera} />)}
                  </div>
                  <PaginationList
                    pageCount={pageCount}
                    pages={pages}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Catalog;
