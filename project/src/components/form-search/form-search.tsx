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
  const startActiveElementRef = useRef<HTMLInputElement>(null);
  const endActiveElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let startIndex = -1;
    document.body.classList.toggle('modal-open', isOpenSelectList && !isSearchDataLoading);
    let isMounted = true;

    const handleKeyPress = (evt: KeyboardEvent) => {
      const currntActiveElement = document.activeElement as HTMLAnchorElement | HTMLButtonElement;

      if (isMounted && evt.key === 'Escape') {
        handleResetSearch();
      }

      if (evt.key === 'Tab') {
        if (evt.shiftKey) {
          startIndex = availableElementsRef.current.findIndex((element) => element === currntActiveElement);
        } else {
          if (currntActiveElement === endActiveElementRef.current) {
            startIndex = availableElementsRef.current.length;
          } else {
            startIndex = availableElementsRef.current.findIndex((element) => element === currntActiveElement);
          }
        }
      }

      if (evt.key === 'ArrowUp' &&
        availableElementsRef.current[startIndex] !== null &&
        startIndex >= 0) {
        if (startIndex === 0 && startActiveElementRef.current !== null) {
          startActiveElementRef.current.focus();
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
        if (startIndex === availableElementsRef.current.length - 1 && endActiveElementRef.current !== null) {
          endActiveElementRef.current.focus();
          startIndex = startIndex + 1;
        }
        if (startIndex < availableElementsRef.current.length - 1) {
          startIndex = startIndex + 1;
          availableElementsRef.current[startIndex]?.focus();
        }
      }
    };

    const handleCloseSelectList = (evt: MouseEvent) => {
      if (isMounted && evt.target !== startActiveElementRef.current) {
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
  }, [foundCameras?.length, isOpenSelectList, isSearchDataLoading, searchName]);

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
            ref={startActiveElementRef}
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
      <button className="form-search__reset" type="reset" aria-label="Сброс" onClick={handleResetSearch} ref={endActiveElementRef}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div >

  );
}

export default FormSearch;
