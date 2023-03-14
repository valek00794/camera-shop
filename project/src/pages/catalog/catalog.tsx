import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState, } from 'react';
import FocusLock from 'react-focus-lock';

import Banner from '../../components/banner/banner';
import FilterForm from '../../components/filter-form/filter-form';
import SortForm from '../../components/sort-form/sort-form';
import ProductCard from '../../components/product-card/product-card';
import PaginationList from '../../components/pagination-list/pagination-list';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import NotFound from '../../components/not-found/not-found';
import Loading from '../../components/loading/loading';
import ProductCardSpinner from '../../components/product-card/product-card-spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCamerasAmount, getCamerasDataLoading, getCamerasPriceRange, getPriceRangeDataLoading } from '../../store/app-data/selectors';
import { CAMERAS_AMOUNT_SHOW_BY_PAGE, FilterCategory, FilterLevel, FilterParams, FilterType, SortParams, SortState } from '../../consts';
import { fetchCamerasAction } from '../../store/api-actions';
import './catalog.css';
import CatalogAddItem from '../../components/catalog/catalog-add-item';
import { Camera } from '../../types/camera';

const DEFAULT_PRICE_VALUE = '';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams,] = useSearchParams();
  const priceFromFieldFocusRef = useRef(false);
  const priceToFieldFocusRef = useRef(false);
  const { page } = useParams();
  const activeAddItemState = useState(false);
  const [, setIsActiveAddItem] = activeAddItemState;
  const addToBasketCamera = useRef<Camera | null>(null);

  const cameras = useAppSelector(getCameras);
  const camerasAmount = useAppSelector(getCamerasAmount);
  const priceRange = useAppSelector(getCamerasPriceRange);
  const isPriceRangeLoading = useAppSelector(getPriceRangeDataLoading);
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoading);

  const pageCount = Math.ceil(camerasAmount / CAMERAS_AMOUNT_SHOW_BY_PAGE);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const [serverPriceFrom, serverPriceTo] = [
    priceRange !== null && priceRange.length !== 0 ? String(Math.min(...priceRange)) : DEFAULT_PRICE_VALUE,
    priceRange !== null && priceRange.length !== 0 ? String(Math.max(...priceRange)) : DEFAULT_PRICE_VALUE
  ];

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


  const checkUrlParams = () => {
    const sortParams: string[] = Object.values(SortParams);
    const filterParams: string[] = Object.values(FilterParams);
    const correctParams = filterParams.concat(sortParams);
    const urlParams = Object.keys(Object.fromEntries(searchParams));
    return urlParams.every((param) => correctParams.includes(param));
  };

  const checkParamsValues = () => {
    const sortParamValues = searchParams.getAll(SortParams.Sort);
    const orderParamValues = searchParams.getAll(SortParams.Order);
    const categoryParamValues = searchParams.getAll(FilterParams.Category);
    const levelParamValues = searchParams.getAll(FilterParams.Level);
    const typeParamValues = searchParams.getAll(FilterParams.Type);

    const correctSortParamValues: string[] = [SortState.Price, SortState.Rating];
    const correctOrderParamValues: string[] = [SortState.Asc, SortState.Desc];
    const correctCategoryParamValues: string[] = Object.values(FilterCategory);
    const correctLevelParamValues: string[] = Object.values(FilterLevel);
    const correctTypeParamValues: string[] = Object.values(FilterType);

    return (sortParamValues.length <= correctSortParamValues.length - 1 && sortParamValues.every((value) => correctSortParamValues.includes(value))) &&
      (orderParamValues.length <= correctOrderParamValues.length - 1 && orderParamValues.every((value) => correctOrderParamValues.includes(value))) &&
      (categoryParamValues.length <= correctCategoryParamValues.length - 1 && categoryParamValues.every((value) => correctCategoryParamValues.includes(value))) &&
      (levelParamValues.length <= correctLevelParamValues.length && levelParamValues.every((value) => correctLevelParamValues.includes(value))) &&
      (typeParamValues.length <= correctTypeParamValues.length && typeParamValues.every((value) => correctTypeParamValues.includes(value)));
  };

  const checkPriceParamsValues = () => {
    const priceFromParamValues = searchParams.getAll(FilterParams.PriceFrom);
    const priceFromParamValue = searchParams.get(FilterParams.PriceFrom);
    const priceToParamValues = searchParams.getAll(FilterParams.PriceTo);
    const priceToParamValue = searchParams.get(FilterParams.PriceTo);

    return (!searchParams.has(FilterParams.PriceFrom) &&
      !searchParams.has(FilterParams.PriceTo)
    ) ||
      (priceFromParamValue !== null &&
        !searchParams.has(FilterParams.PriceTo) &&
        priceFromParamValues.length === 1 &&
        serverPriceTo !== DEFAULT_PRICE_VALUE &&
        serverPriceFrom !== DEFAULT_PRICE_VALUE &&
        Number(priceFromParamValue) <= Number(serverPriceTo) &&
        Number(priceFromParamValue) >= Number(serverPriceFrom)
      ) ||
      (priceToParamValue !== null &&
        !searchParams.has(FilterParams.PriceFrom) &&
        priceToParamValues.length === 1 &&
        serverPriceTo !== DEFAULT_PRICE_VALUE &&
        serverPriceFrom !== DEFAULT_PRICE_VALUE &&
        Number(priceToParamValue) <= Number(serverPriceTo) &&
        Number(priceToParamValue) >= Number(serverPriceFrom)
      ) ||
      (priceFromParamValue !== null &&
        priceToParamValue !== null &&
        priceFromParamValues.length === 1 &&
        priceToParamValues.length === 1 &&
        serverPriceTo !== DEFAULT_PRICE_VALUE &&
        serverPriceFrom !== DEFAULT_PRICE_VALUE &&
        Number(priceFromParamValue) <= Number(serverPriceTo) &&
        Number(priceFromParamValue) >= Number(serverPriceFrom) &&
        Number(priceFromParamValue) <= Number(priceToParamValue) &&
        Number(priceToParamValue) <= Number(serverPriceTo)
      );
  };

  const isUrlParamsCorrect = checkUrlParams();
  const isUrlParamsValuesCorrect = checkParamsValues();
  const isUrlPriceRangeParamsValuesCorrect = checkPriceParamsValues();

  if (isPriceRangeLoading) {
    return <Loading />;
  }

  if ((pages.length !== 0 && !pages.includes(Number(page))) ||
    !isUrlParamsCorrect || !isUrlParamsValuesCorrect ||
    (
      !priceFromFieldFocusRef.current &&
      !priceToFieldFocusRef.current &&
      !isUrlPriceRangeParamsValuesCorrect
    )
  ) {
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
                    <FilterForm
                      priceFromFieldFocusRef={priceFromFieldFocusRef}
                      priceToFieldFocusRef={priceToFieldFocusRef}
                      serverPriceFrom={serverPriceFrom}
                      serverPriceTo={serverPriceTo}
                    />
                  </div>
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <SortForm />
                  </div>
                  {
                    cameras.length === 0 && !isCamerasDataLoading &&
                    <div className="outer">
                      <div className="inner">
                        <h4>Странно, но ничего нет</h4>
                        <p>Попробуйте изменить критерии фильтра</p>
                      </div>
                    </div>
                  }
                  {
                    <div className="cards catalog__cards">
                      {
                        cameras.length > 0 && !isCamerasDataLoading &&
                        cameras.map((camera) => <ProductCard key={camera.id} camera={camera} setIsActiveAddItem={setIsActiveAddItem} addToBasketCamera={addToBasketCamera} />)
                      }
                      {
                        isCamerasDataLoading &&
                        cameras.map((camera) => <ProductCardSpinner key={camera.id} />)
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
      <FocusLock>
        <CatalogAddItem addToBasketCamera={addToBasketCamera.current} activeAddItemState={activeAddItemState} />
      </FocusLock>
    </>
  );
}

export default Catalog;
