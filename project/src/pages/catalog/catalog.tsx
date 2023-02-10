import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Banner from '../../components/banner/banner';
import FilterForm from '../../components/filter-form/filter-form';
import SortForm from '../../components/sort-form/sort-form';
import ProductCard from '../../components/product-card/product-card';
import PaginationList from '../../components/pagination-list/pagination-list';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, } from '../../store/app-data/selectors';
import { CAMERAS_AMOUNT_SHOW_BY_PAGE } from '../../consts';
import { fetchCamerasAction } from '../../store/api-actions';
import { useEffect } from 'react';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();

  const { page } = useParams();
  const cameras = useAppSelector(getCameras);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchCamerasAction([CAMERAS_AMOUNT_SHOW_BY_PAGE * Number(page) - CAMERAS_AMOUNT_SHOW_BY_PAGE, CAMERAS_AMOUNT_SHOW_BY_PAGE]));
    }
    return () => {
      isMounted = false;

    };
  }, [dispatch, page]);

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
                    {cameras.map((camera) => <ProductCard key={camera.id} camera={camera} />)}
                  </div>
                  <PaginationList />
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
