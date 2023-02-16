import classnames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchCamerasAction } from '../../store/api-actions';
import { getFoundCameras } from '../../store/app-data/selectors';
import { getCameraTitle } from '../../utils/utils';

const defaultInputSearchString = '';

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState(defaultInputSearchString);
  const [isOpenSelectList, setIsOpenSelectList] = useState(false);
  const foundCameras = useAppSelector(getFoundCameras);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && searchName.trim() !== defaultInputSearchString && foundCameras?.length !== 0) {
      setIsOpenSelectList(true);
    } else {
      setIsOpenSelectList(false);
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, foundCameras?.length, searchName]);

  const handleInputSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchName(evt.target.value);
    dispatch(fetchSearchCamerasAction(evt.target.value));
  };

  const handleResetSearch = () => {
    setIsOpenSelectList(false);
    setSearchName(defaultInputSearchString);
  };

  const getOpenListClassName = () => classnames(
    'form-search',
    { 'list-opened': isOpenSelectList }
  );

  return (
    <div className={getOpenListClassName()}>
      <form onSubmit={(evt) => evt.preventDefault()}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" value={searchName} onChange={handleInputSearch} />
        </label>
        <ul className="form-search__select-list scroller">

          {
            foundCameras?.length !== 0 &&
                foundCameras?.map((camera, index) => (
                  <Link
                    key={camera.id}
                    to={`/catalog/${camera?.id}/description`}
                    onClick={handleResetSearch}
                  >
                    <li
                      className="form-search__select-item"
                      tabIndex={index + 1}
                    >
                      {getCameraTitle(camera)}
                    </li>
                  </Link>
                ))
          }

        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={handleResetSearch}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div >

  );
}

export default FormSearch;
