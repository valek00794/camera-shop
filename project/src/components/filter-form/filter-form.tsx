import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterCategory, FilterLevel, FilterParams } from '../../consts';

function FilterForm(): JSX.Element {
  const [isCheckedPhotoCameras, setIsCheckedPhotoCameras] = useState(false);
  const [isCheckedVideoCameras, setIsCheckedVideoCameras] = useState(false);
  const [isCheckedZeroLevel, setCheckedZeroLevel] = useState(false);
  const [isCheckedNonProLevel, setCheckedNonProLevel] = useState(false);
  const [isCheckedProLevel, setCheckedProLevel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (searchParams.has(FilterParams.Category) && !isCheckedPhotoCameras && !isCheckedVideoCameras) {
        searchParams.delete(FilterParams.Category);
      }
      if (searchParams.has(FilterParams.Level) && !isCheckedZeroLevel && !isCheckedNonProLevel && !isCheckedProLevel) {
        searchParams.delete(FilterParams.Level);
      }
      setSearchParams(searchParams);
    }
    return () => {
      isMounted = false;
    };
  }, [isCheckedNonProLevel, isCheckedPhotoCameras, isCheckedProLevel, isCheckedVideoCameras, isCheckedZeroLevel, searchParams, setSearchParams]);


  const handleSelectPhotoCameras = () => {
    setIsCheckedPhotoCameras(!isCheckedPhotoCameras);
    if (isCheckedVideoCameras) {
      setIsCheckedVideoCameras(false);
    }
    searchParams.set(FilterParams.Category, FilterCategory.Photo);
    setSearchParams(searchParams);
  };
  const handleSelectVideoCameras = () => {
    setIsCheckedVideoCameras(!isCheckedVideoCameras);
    if (isCheckedPhotoCameras) {
      setIsCheckedPhotoCameras(false);
    }
    searchParams.set(FilterParams.Category, FilterCategory.Video);
    setSearchParams(searchParams);
  };


  const handleSelectZeroLevelCameras = () => {
    setCheckedZeroLevel(!isCheckedZeroLevel);
    !isCheckedZeroLevel && searchParams.append(FilterParams.Level, FilterLevel.Zero);
    setSearchParams(searchParams);
  };

  const handleSelectNonProLevelCameras = () => {
    setCheckedNonProLevel(!isCheckedNonProLevel);
    !isCheckedNonProLevel && searchParams.append(FilterParams.Level, FilterLevel.NonPro);
    setSearchParams(searchParams);
  };

  const handleSelectProLevelCameras = () => {
    setCheckedProLevel(!isCheckedProLevel);
    !isCheckedProLevel && searchParams.append(FilterParams.Level, FilterLevel.Pro);
    setSearchParams(searchParams);
  };

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input type="number" name="price" placeholder="от" />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input type="number" name="priceUp" placeholder="до" />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="photocamera" checked={isCheckedPhotoCameras} onChange={handleSelectPhotoCameras} />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Фотокамера</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="videocamera" checked={isCheckedVideoCameras} onChange={handleSelectVideoCameras} />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Видеокамера</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="digital" />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Цифровая</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="film" disabled />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Плёночная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="snapshot" />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Моментальная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="collection" disabled />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Коллекционная</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="zero" checked={isCheckedZeroLevel} onChange={handleSelectZeroLevelCameras} />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Нулевой</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="non-professional" checked={isCheckedNonProLevel} onChange={handleSelectNonProLevelCameras} />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Любительский</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input type="checkbox" name="professional" checked={isCheckedProLevel} onChange={handleSelectProLevelCameras} />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Профессиональный</span>
          </label>
        </div>
      </fieldset>
      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
      </button>
    </form>
  );
}

export default FilterForm;

