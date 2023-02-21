import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, } from 'react';

import Banner from '../../components/banner/banner';
import FilterForm from '../../components/filter-form/filter-form';
import SortForm from '../../components/sort-form/sort-form';
import ProductCard from '../../components/product-card/product-card';
import PaginationList from '../../components/pagination-list/pagination-list';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCamerasAmount } from '../../store/app-data/selectors';
import { CAMERAS_AMOUNT_SHOW_BY_PAGE } from '../../consts';
import { fetchCamerasAction } from '../../store/api-actions';
import NotFound from '../../components/not-found/not-found';
import './catalog.css';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams,] = useSearchParams();

  const { page } = useParams();
  const cameras = useAppSelector(getCameras);
  const camerasAmount = useAppSelector(getCamerasAmount);
  const pageCount = Math.ceil(camerasAmount / CAMERAS_AMOUNT_SHOW_BY_PAGE);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  useEffect(() => {

    let isMounted = true;
    const startItem = CAMERAS_AMOUNT_SHOW_BY_PAGE * Number(page) - CAMERAS_AMOUNT_SHOW_BY_PAGE;
    if (isMounted) {
      dispatch(fetchCamerasAction([startItem, searchParams]));
    }
    return () => {
      isMounted = false;

    };
  }, [dispatch, page, searchParams]);

  if (pages.length !== 0 && !pages.includes(Number(page))) {
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
                  {
                    cameras.length === 0 &&
                    <div className="outer">
                      <div className="inner">
                        <h4>Странно, но ничего нет</h4>
                        <p>Попробуйте изменить критерии фильтра</p>
                      </div>
                    </div>
                  }
                  {
                    cameras.length > 0 &&
                    <div className="cards catalog__cards">
                      {
                        cameras.map((camera) => <ProductCard key={camera.id} camera={camera} />)
                      }
                    </div>
                  }
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
