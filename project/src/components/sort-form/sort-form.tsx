import { useSearchParams } from 'react-router-dom';

import { SortParams, SortState } from '../../consts';

function SortForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortByPrice = () => {
    if (!searchParams.has(SortParams.Order) || searchParams.get(SortParams.Order) === SortState.Default) {
      searchParams.set(SortParams.Order, SortState.Asc);
    }
    searchParams.set(SortParams.Sort, SortState.Price);
    setSearchParams(searchParams);
  };

  const handleSortByPopular = () => {
    if (!searchParams.has(SortParams.Order) || searchParams.get(SortParams.Order) === SortState.Default) {
      searchParams.set(SortParams.Order, SortState.Asc);
    }
    searchParams.set(SortParams.Sort, SortState.Rating);
    setSearchParams(searchParams);
  };

  const handleSortAsc = () => {
    if (!searchParams.has(SortParams.Sort) || searchParams.get(SortParams.Sort) === SortState.Default) {
      searchParams.set(SortParams.Sort, SortState.Price);
    }
    searchParams.set(SortParams.Order, SortState.Asc);
    setSearchParams(searchParams);
  };

  const handleSortDesc = () => {
    if (!searchParams.has(SortParams.Sort) || searchParams.get(SortParams.Sort) === SortState.Default) {
      searchParams.set(SortParams.Sort, SortState.Price);
    }
    searchParams.set(SortParams.Order, SortState.Desc);
    setSearchParams(searchParams);
  };

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPrice" name="sort" checked={searchParams.get(SortParams.Sort) === SortState.Price} onChange={handleSortByPrice} />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPopular" name="sort" checked={searchParams.get(SortParams.Sort) === SortState.Rating} onChange={handleSortByPopular} />
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
