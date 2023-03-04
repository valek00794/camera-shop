import { useSearchParams } from 'react-router-dom';

import { SortParams, SortState } from '../../consts';

function SortForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSortUrlParam = (param: string, paramValue: string, autoSetParam: string, autoSetParamValue: string) => {
    searchParams.set(param, paramValue);
    if (!searchParams.has(autoSetParam)) {
      searchParams.set(autoSetParam, autoSetParamValue);
    }
    setSearchParams(searchParams);
  };

  const handleSortByPrice = () => {
    setSortUrlParam(SortParams.Sort, SortState.Price, SortParams.Order, SortState.Asc);
  };

  const handleSortByPopular = () => {
    setSortUrlParam(SortParams.Sort, SortState.Rating, SortParams.Order, SortState.Asc);
  };

  const handleSortAsc = () => {
    setSortUrlParam(SortParams.Order, SortState.Asc, SortParams.Sort, SortState.Price);
  };

  const handleSortDesc = () => {
    setSortUrlParam(SortParams.Order, SortState.Desc, SortParams.Sort, SortState.Price);
  };

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPrice" name="sort" aria-label="По цене" checked={searchParams.get(SortParams.Sort) === SortState.Price} onChange={handleSortByPrice} />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPopular" name="sort" aria-label="По популярности" checked={searchParams.get(SortParams.Sort) === SortState.Rating} onChange={handleSortByPopular} />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={searchParams.get(SortParams.Order) === SortState.Asc} onChange={handleSortAsc} />
            <label htmlFor="up">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={searchParams.get(SortParams.Order) === SortState.Desc} onChange={handleSortDesc} />
            <label htmlFor="down">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SortForm;
