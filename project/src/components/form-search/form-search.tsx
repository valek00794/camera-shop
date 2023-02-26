import classnames from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchCamerasAction } from '../../store/api-actions';
import { getFoundCameras, getSearchDataLoading } from '../../store/app-data/selectors';
import { getCameraTitle } from '../../utils/utils';

const defaultInputSearchString = '';

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState(defaultInputSearchString);
  const [isOpenSelectList, setIsOpenSelectList] = useState(false);
  const foundCameras = useAppSelector(getFoundCameras);
  const isSearchDataLoading = useAppSelector(getSearchDataLoading);

  const availableSelectListElements: HTMLAnchorElement[] | null[] = [];
  const availableElementsRef = useRef(availableSelectListElements);
  foundCameras?.length ? availableElementsRef.current.length = foundCameras?.length : availableElementsRef.current.length = 0;
  const startActiveElement = document.querySelector('.form-search__input') as HTMLAnchorElement;
  const endActiveElement = document.querySelector('.form-search__reset') as HTMLAnchorElement;

  useEffect(() => {
    let startIndex = -1;
    document.body.classList.toggle('modal-open', isOpenSelectList && !isSearchDataLoading);
    let isMounted = true;

    const handleKeyPress = (evt: KeyboardEvent) => {
      const currntActiveElement = document.activeElement as HTMLAnchorElement;

      if (evt.key === 'Escape') {
        handleResetSearch();
      }

      if (evt.key === 'Tab') {
        if (!evt.shiftKey) {
          if (currntActiveElement !== endActiveElement) {
            startIndex = availableElementsRef.current.findIndex((element) => element === currntActiveElement);
          }
        }
      }
      if (evt.key === 'Tab') {
        if (evt.shiftKey) {
          startIndex = availableElementsRef.current.findIndex((element) => element === currntActiveElement) - 1;
        }
      }
      if (evt.key === 'ArrowUp' &&
        availableElementsRef.current[startIndex] !== null &&
        startIndex >= 0) {
        if (startIndex === 0) {
          startActiveElement.focus();
          startIndex = -1;
        }
        if (startIndex > 0) {
          startIndex = startIndex - 1;
          availableElementsRef.current[startIndex]?.focus();
        }
      }
      if (evt.key === 'ArrowDown' &&
        availableElementsRef.current[startIndex] !== null &&
        startIndex <= availableElementsRef.current.length) {
        if (startIndex === availableElementsRef.current.length - 1) {
          endActiveElement.focus();
          startIndex = startIndex + 1;
        }
        if (startIndex < availableElementsRef.current.length - 1) {
          startIndex = startIndex + 1;
          availableElementsRef.current[startIndex]?.focus();
        }
      }
    };

    const handleCloseSelectList = (evt: MouseEvent) => {
      if (evt.target !== startActiveElement) {
        handleResetSearch();
      }
    };

    window.addEventListener('click', handleCloseSelectList);
    if (isMounted && searchName.trim() !== defaultInputSearchString && foundCameras?.length !== 0) {
      setIsOpenSelectList(true);
      window.addEventListener('keyup', handleKeyPress);
    } else {
      setIsOpenSelectList(false);
    }
    return () => {
      isMounted = false;
      window.removeEventListener('keyup', handleKeyPress);
      window.removeEventListener('click', handleCloseSelectList);
    };
  }, [dispatch, endActiveElement, foundCameras?.length, isOpenSelectList, isSearchDataLoading, searchName, startActiveElement]);

  const handleInputSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchName(evt.target.value);
    if (evt.target.value !== '') {
      dispatch(fetchSearchCamerasAction(evt.target.value));
    }
  };

  const handleResetSearch = () => {
    setIsOpenSelectList(false);
    setSearchName(defaultInputSearchString);
  };

  const getOpenListClassName = () => classnames(
    'form-search',
    { 'list-opened': isOpenSelectList && !isSearchDataLoading }
  );

  return (
    <div className={getOpenListClassName()}>
      <form onSubmit={(evt) => evt.preventDefault()}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchName}
            onChange={handleInputSearch}
            onFocus={(evt) => evt.target.select()}
          />
        </label>
        <ul className="form-search__select-list scroller">

          {
            !isSearchDataLoading &&
            foundCameras?.map((camera, index) => (
              <Link
                key={camera.id}
                tabIndex={0}
                to={`/catalog/${camera?.id}/description`}
                onClick={handleResetSearch}
                ref={(element) => {
                  availableElementsRef.current[index] = element;
                }}
              >
                <li className="form-search__select-item">
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
