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

  const handleSelectPhotoCameras = () => {
    if (searchParams.get(FilterParams.Category) !== FilterCategory.Photo) {
      searchParams.set(FilterParams.Category, FilterCategory.Photo);
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Category, FilterCategory.Photo);
    }
    setSearchParams(searchParams);
  };

  const handleSelectVideoCameras = () => {
    if (searchParams.get(FilterParams.Category) !== FilterCategory.Video) {
      searchParams.set(FilterParams.Category, FilterCategory.Video);
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Category, FilterCategory.Video);
    }
    setSearchParams(searchParams);
  };

  const handleSelectDigitalTypeCameras = () => {
    if (!typeParams.includes(FilterType.Digital)) {
      searchParams.append(FilterParams.Type, FilterType.Digital);
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Type, FilterType.Digital);
    }
    setSearchParams(searchParams);
  };

  const handleSelectFilmTypeCameras = () => {
    if (!typeParams.includes(FilterType.Film)) {
      searchParams.append(FilterParams.Type, FilterType.Film);
      if (searchParams.get(FilterParams.Category) !== FilterCategory.Photo) {
        searchParams.append(FilterParams.Category, FilterCategory.Photo);
      }
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Type, FilterType.Film);
      if (typeParams.length === 1) {
        removeValueByKeyFromSearchParams(searchParams, FilterParams.Category, FilterCategory.Photo);
      }
    }
    setSearchParams(searchParams);
  };

  const handleSelectSnapshotTypeCameras = () => {
    if (!typeParams.includes(FilterType.Snapshot)) {
      searchParams.append(FilterParams.Type, FilterType.Snapshot);
      if (searchParams.get(FilterParams.Category) !== FilterCategory.Photo) {
        searchParams.append(FilterParams.Category, FilterCategory.Photo);
      }
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Type, FilterType.Snapshot);
      if (typeParams.length === 1) {
        removeValueByKeyFromSearchParams(searchParams, FilterParams.Category, FilterCategory.Photo);
      }
    }
    setSearchParams(searchParams);
  };

  const handleSelectCollectionTypeCameras = () => {
    if (!typeParams.includes(FilterType.Collection)) {
      searchParams.append(FilterParams.Type, FilterType.Collection);
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Type, FilterType.Collection);
    }
    setSearchParams(searchParams);
  };

  const handleSelectZeroLevelCameras = () => {
    if (!levelParams.includes(FilterLevel.Zero)) {
      searchParams.append(FilterParams.Level, FilterLevel.Zero);
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Level, FilterLevel.Zero);
    }
    setSearchParams(searchParams);
  };

  const handleSelectNonProLevelCameras = () => {
    if (!levelParams.includes(FilterLevel.NonPro)) {
      searchParams.append(FilterParams.Level, FilterLevel.NonPro);
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Level, FilterLevel.NonPro);
    }
    setSearchParams(searchParams);
  };

  const handleSelectProLevelCameras = () => {
    if (!levelParams.includes(FilterLevel.Pro)) {
      searchParams.append(FilterParams.Level, FilterLevel.Pro);
    } else {
      removeValueByKeyFromSearchParams(searchParams, FilterParams.Level, FilterLevel.Pro);
    }
    setSearchParams(searchParams);
  };

  const handleChangePriceFrom = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceFromFieldFocusRef.current = true;
    searchParams.set(FilterParams.PriceFrom, evt.target.value);
    refPriceFrom.current = evt.target.value;
    if (searchParams.get(FilterParams.PriceFrom) === DEFAULT_PRICE_VALUE) {
      searchParams.delete(FilterParams.PriceFrom);
    }
    setSearchParams(searchParams);
  };

  const handleSelectCamerasByPriceFrom = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceFromFieldFocusRef.current = false;
    if (
      evt.target.value !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) < Number(props.serverPriceFrom)
    ) {
      evt.target.value = props.serverPriceFrom;
      searchParams.set(FilterParams.PriceFrom, props.serverPriceFrom);
      refPriceFrom.current = evt.target.value;
    }
    if (
      evt.target.value !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) > Number(props.serverPriceTo)
    ) {
      evt.target.value = props.serverPriceTo;
      searchParams.set(FilterParams.PriceFrom, props.serverPriceTo);
      refPriceFrom.current = evt.target.value;
    }
    if (
      evt.target.value !== DEFAULT_PRICE_VALUE &&
      refPriceTo.current !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) > Number(refPriceTo.current)
    ) {
      evt.target.value = '';
      searchParams.delete(FilterParams.PriceFrom);
    }
    setSearchParams(searchParams);
  };

  const handleChangePriceTo = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceToFieldFocusRef.current = true;
    searchParams.set(FilterParams.PriceTo, evt.target.value);
    refPriceTo.current = evt.target.value;
    if (searchParams.get(FilterParams.PriceTo) === DEFAULT_PRICE_VALUE) {
      searchParams.delete(FilterParams.PriceTo);
    }
    setSearchParams(searchParams);
  };

  const handleSelectCamerasByPriceTo = (evt: ChangeEvent<HTMLInputElement>) => {
    props.priceToFieldFocusRef.current = false;
    if (Number(evt.target.value) > Number(props.serverPriceTo)) {
      evt.target.value = props.serverPriceTo;
      searchParams.set(FilterParams.PriceTo, props.serverPriceTo);
      refPriceTo.current = evt.target.value;
    }
    if (
      evt.target.value !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) < Number(props.serverPriceFrom)
    ) {
      evt.target.value = props.serverPriceFrom;
      searchParams.set(FilterParams.PriceTo, props.serverPriceFrom);
      refPriceTo.current = evt.target.value;
    }
    if (
      evt.target.value !== DEFAULT_PRICE_VALUE &&
      refPriceFrom.current !== DEFAULT_PRICE_VALUE &&
      Number(evt.target.value) < Number(refPriceFrom.current)
    ) {
      evt.target.value = '';
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
                onBlur={handleSelectCamerasByPriceFrom}
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
                onBlur={handleSelectCamerasByPriceTo}
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

