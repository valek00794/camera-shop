/* eslint-disable no-console */
import Banner from '../../components/banner/banner';
import FilterForm from '../../components/filter-form/filter-form';
import SortForm from '../../components/sort-form/sort-form';
import ProductCard from '../../components/product-card/product-card';
import PaginationList from '../../components/pagination-list/pagination-list';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/app-data/selectors';

function Catalog(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  return (
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
              </div>
              <PaginationList />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Catalog;
