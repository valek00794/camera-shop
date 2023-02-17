import { useSearchParams } from 'react-router-dom';

import { SortState } from '../../consts';

type SortFormProps = {
  sortParam: string;
  orderParam: string;
}

function SortForm(props: SortFormProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {
    sort: props.sortParam,
    order: props.orderParam,
  };

  const handleSortByPrice = () => {
    if (params.order === SortState.Default) {
      params.order = 'asc';
    }
    params.sort = 'price';
    setSearchParams(params);
  };

  const handleSortByPopular = () => {
    if (params.order === SortState.Default) {
      params.order = 'asc';
    }
    params.sort = 'rating';
    setSearchParams(params);
  };

  const handleSortAsc = () => {
    if (params.sort === SortState.Default) {
      params.sort = 'price';
    }
    params.order = 'asc';
    setSearchParams(params);
  };

  const handleSortDesc = () => {
    if (params.sort === SortState.Default) {
      params.sort = 'price';
    }
    params.order = 'desc';
    setSearchParams(params);
  };

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPrice" name="sort" checked={searchParams.get('sort') === SortState.Price} onChange={handleSortByPrice} />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPopular" name="sort" checked={searchParams.get('sort') === SortState.Rating} onChange={handleSortByPopular} />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={searchParams.get('order') === SortState.Asc} onChange={handleSortAsc} />
            <label htmlFor="up">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={searchParams.get('order') === SortState.Desc} onChange={handleSortDesc} />
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
