import { ChangeEvent, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FilterCategory, FilterLevel, FilterParams, FilterType, scrollToTopCatalogOptions } from '../../consts';
import { removeValueByKeyFromSearchParams, scrollUp } from '../../utils/utils';
import browserHistory from '../../browser-history';
import { useAppDispatch } from '../../hooks';

const exceptInputRangeThisSymbols = ['e', 'E', '+', '-', '.'];
const DEFAULT_PRICE_VALUE = '';

type FilterFormProops = {
  priceFromFieldFocusRef: React.MutableRefObject<boolean>;
  priceToFieldFocusRef: React.MutableRefObject<boolean>;
  serverPriceFrom: string;
  serverPriceTo: string;
}

function FilterForm(props: FilterFormProops): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const refPriceFrom = useRef(searchParams.get(FilterParams.PriceFrom) || DEFAULT_PRICE_VALUE);
  const refPriceTo = useRef(searchParams.get(FilterParams.PriceTo) || DEFAULT_PRICE_VALUE);
  const typeParams: string[] = searchParams.getAll(FilterParams.Type);
  const levelParams: string[] = searchParams.getAll(FilterParams.Level);


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const postUrl = new URL('/catalog/page_1/', window.location.origin);
      postUrl.search = searchParams.toString();
      browserHistory.push(postUrl.href);
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, searchParams]);

  const setSingleParam = (param: string, paramValue: string) => {
    if (searchParams.get(param) !== paramValue) {
      searchParams.set(param, paramValue);
    } else {
      removeValueByKeyFromSearchParams(searchParams, param, paramValue);
    }
    setSearchParams(searchParams);
  };

  const appendMultipleParam = (params: string[], param: string, paramValue: string, dependentParam?: string, dependentParamValue?: string) => {
    if (!params.includes(paramValue)) {
      searchParams.append(param, paramValue);
      if (dependentParam !== dependentParamValue && dependentParam && dependentParamValue) {
        searchParams.set(dependentParam, dependentParamValue);
      }
    } else {
      removeValueByKeyFromSearchParams(searchParams, param, paramValue);
      if (typeParams.length === 1 && dependentParam && dependentParamValue) {
        removeValueByKeyFromSearchParams(searchParams, dependentParam, dependentParamValue);
      }
    }
    setSearchParams(searchParams);
  };

  const setInputParam = (param: string, paramValue: string) => {
    searchParams.set(param, paramValue);
    if (searchParams.get(param) === DEFAULT_PRICE_VALUE) {
      searchParams.delete(param);
    }
    setSearchParams(searchParams);
  };

  const changeWrongInputParam = (param: string, value: string, inpetRef: React.MutableRefObject<string>) => {
    if (
      value !== DEFAULT_PRICE_VALUE &&
      Number(value) < Number(props.serverPriceFrom)
    ) {
      value = props.serverPriceFrom;
      searchParams.set(param, props.serverPriceFrom);
      inpetRef.current = value;
    }
    if (
      value !== DEFAULT_PRICE_VALUE &&
      Number(value) > Number(props.serverPriceTo)
    ) {
      value = props.serverPriceTo;
      searchParams.set(param, props.serverPriceTo);
      inpetRef.current = value;
    }
  };

  const handleSelectPhotoCameras = () => {
    setSingleParam(FilterParams.Category, FilterCategory.Photo);
  };

  const handleSelectVideoCameras = () => {
    setSingleParam(FilterParams.Category, FilterCategory.Video);
  };

  const handleSelectDigitalTypeCameras = () => {
    appendMultipleParam(typeParams, FilterParams.Type, FilterType.Digital);
  };

  const handleSelectFilmTypeCameras = () => {
    appendMultipleParam(typeParams, FilterParams.Type, FilterType.Film, FilterParams.Category, FilterCategory.Photo);
  };

  const handleSelectSnapshotTypeCameras = () => {
    appendMultipleParam(typeParams, FilterParams.Type, FilterType.Snapshot, FilterParams.Category, FilterCategory.Photo);
  };

  const handleSelectCollectionTypeCameras = () => {
    appendMultipleParam(typeParams, FilterParams.Type, FilterType.Collection);
  };

  const handleSelectZeroLevelCameras = () => {
    appendMultipleParam(levelParams, FilterParams.Level, FilterLevel.Zero);
  };

  const handleSelectNonProLevelCameras = () => {
    appendMultipleParam(levelParams, FilterParams.Level, FilterLevel.NonPro);
  };

  const handleSelectProLevelCameras = () => {
    appendMultipleParam(levelParams, FilterParams.Level, FilterLevel.Pro);
  };

  const handleChangePriceFrom = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceFromFieldFocusRef.current = true;
    setInputParam(FilterParams.PriceFrom, evt.target.value);
    refPriceFrom.current = evt.target.value;
  };

  const handleChangePriceTo = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceToFieldFocusRef.current = true;
    setInputParam(FilterParams.PriceTo, evt.target.value);
    refPriceTo.current = evt.target.value;
  };

  const handleCorrectToPriceFrom = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceFromFieldFocusRef.current = false;
    changeWrongInputParam(FilterParams.PriceFrom, evt.target.value, refPriceFrom);
    if (
      evt.target.value !== DEFAULT_PRICE_VALUE &&
      refPriceTo.current !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) > Number(refPriceTo.current)
    ) {
      evt.target.value = '';
      refPriceFrom.current = '';
      searchParams.delete(FilterParams.PriceFrom);
    }
    setSearchParams(searchParams);
  };

  const handleCorrectToPriceTo = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceToFieldFocusRef.current = false;
    changeWrongInputParam(FilterParams.PriceTo, evt.target.value, refPriceTo);
    if (
      evt.target.value !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) !== 0 &&
      refPriceFrom.current !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) < Number(refPriceFrom.current)
    ) {
      evt.target.value = '';
      refPriceTo.current = '';
      searchParams.delete(FilterParams.PriceTo);
    }
    setSearchParams(searchParams);
  };

  const handleResetFillter = () => {
    Object.values(FilterParams).map((key) => searchParams.delete(key));
    setSearchParams(searchParams);
    scrollUp(scrollToTopCatalogOptions);
  };

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="price"
                placeholder={props.serverPriceFrom}
                onBlur={handleCorrectToPriceFrom}
                onChange={handleChangePriceFrom}
                value={searchParams.get(FilterParams.PriceFrom) || DEFAULT_PRICE_VALUE}
                onKeyDown={(evt) => exceptInputRangeThisSymbols.includes(evt.key) && evt.preventDefault()}
                min={0}
              />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="priceUp"
                placeholder={props.serverPriceTo}
                onBlur={handleCorrectToPriceTo}
                onChange={handleChangePriceTo}
                value={searchParams.get(FilterParams.PriceTo) || DEFAULT_PRICE_VALUE}
                onKeyDown={(evt) => exceptInputRangeThisSymbols.includes(evt.key) && evt.preventDefault()}
                min={0}
              />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="photocamera"
              checked={searchParams.get(FilterParams.Category) === FilterCategory.Photo}
              onChange={handleSelectPhotoCameras}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Фотокамера</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="videocamera"
              checked={searchParams.get(FilterParams.Category) === FilterCategory.Video}
              onChange={handleSelectVideoCameras}
              disabled={typeParams.includes(FilterType.Film) || typeParams.includes(FilterType.Snapshot)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Видеокамера</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="digital"
              checked={typeParams.includes(FilterType.Digital)}
              onChange={handleSelectDigitalTypeCameras}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Цифровая</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="film"
              checked={typeParams.includes(FilterType.Film)}
              onChange={handleSelectFilmTypeCameras}
              disabled={searchParams.get(FilterParams.Category) === FilterCategory.Video}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Плёночная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="snapshot"
              checked={typeParams.includes(FilterType.Snapshot)}
              onChange={handleSelectSnapshotTypeCameras}
              disabled={searchParams.get(FilterParams.Category) === FilterCategory.Video}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Моментальная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="collection"
              checked={typeParams.includes(FilterType.Collection)}
              onChange={handleSelectCollectionTypeCameras}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Коллекционная</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="zero"
              checked={levelParams.includes(FilterLevel.Zero)}
              onChange={handleSelectZeroLevelCameras}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Нулевой</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="non-professional"
              checked={levelParams.includes(FilterLevel.NonPro)}
              onChange={handleSelectNonProLevelCameras}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Любительский</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="professional"
              checked={levelParams.includes(FilterLevel.Pro)}
              onChange={handleSelectProLevelCameras}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Профессиональный</span>
          </label>
        </div>
      </fieldset>
      <button
        className="btn catalog-filter__reset-btn"
        type="reset"
        data-testid="reset"
        onClick={handleResetFillter}
      >Сбросить фильтры
      </button>
    </form>
  );
}

export default FilterForm;

