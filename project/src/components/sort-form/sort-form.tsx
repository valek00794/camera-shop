import { SortState } from '../../consts';

type SortFormProps = {
  sortByState: [SortState, React.Dispatch<React.SetStateAction<SortState>>];
  sortAscDescState: [SortState, React.Dispatch<React.SetStateAction<SortState>>];
}

function SortForm(props: SortFormProps): JSX.Element {
  const [isSortBy, setSortBy] = props.sortByState;
  const [isSortAscDesc, setSortAscDesc] = props.sortAscDescState;

  const handleSortByPrice = () => {
    if (isSortAscDesc === SortState.Default) {
      setSortAscDesc(SortState.Asc);
    }
    setSortBy(SortState.Price);
  };
  const handleSortByPopular = () => {
    if (isSortAscDesc === SortState.Default) {
      setSortAscDesc(SortState.Asc);
    }
    setSortBy(SortState.Rating);
  };
  const handleSortAsc = () => {
    if (isSortBy === SortState.Default) {
      setSortBy(SortState.Price);
    }
    setSortAscDesc(SortState.Asc);
  };
  const handleSortDesc = () => {
    if (isSortBy === SortState.Default) {
      setSortBy(SortState.Price);
    }
    setSortAscDesc(SortState.Desc);
  };


  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPrice" name="sort" checked={isSortBy === SortState.Price} onChange={handleSortByPrice} />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPopular" name="sort" checked={isSortBy === SortState.Rating} onChange={handleSortByPopular} />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={isSortAscDesc === SortState.Asc} onChange={handleSortAsc} />
            <label htmlFor="up">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={isSortAscDesc === SortState.Desc} onChange={handleSortDesc} />
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
