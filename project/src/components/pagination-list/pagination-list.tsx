import { Link, useParams, useSearchParams } from 'react-router-dom';
import classnames from 'classnames';

import { scrollUp } from '../../utils/utils';
import { scrollToTopCatalogOptions } from '../../consts';

type PaginationListProps = {
  pageCount: number;
  pages: number[];
}

function PaginationList(props: PaginationListProps): JSX.Element {
  const { page } = useParams();
  const [searchParams,] = useSearchParams();
  const paramPageToNumber = Number(page);
  const searchParamsString = searchParams.toString();

  const getPaginationLinkClassName = (pageNumber: number) =>
    classnames(
      'pagination__link',
      { 'pagination__link--active': paramPageToNumber === pageNumber }
    );

  const isBtnBackVisible = paramPageToNumber > 1;
  const isBtnNextVisible = paramPageToNumber < props.pageCount;

  return (
    <div className="pagination">
      {
        props.pageCount > 1 &&
        <ul className="pagination__list">
          {
            isBtnBackVisible &&
            <li
              onClick={() => scrollUp(scrollToTopCatalogOptions)}
              className="pagination__item"
            >
              <Link
                className="pagination__link"
                to={`/catalog/page_${paramPageToNumber - 1}?${searchParamsString}`}
              >Назад
              </Link>
            </li>
          }
          {
            props.pages.map((pageNumber) => (
              <li
                onClick={() => scrollUp(scrollToTopCatalogOptions)}
                key={pageNumber}
                className="pagination__item"
              >
                <Link
                  className={getPaginationLinkClassName(pageNumber)}
                  to={`/catalog/page_${pageNumber}?${searchParamsString}`}
                >{pageNumber}
                </Link>
              </li>
            )
            )
          }
          {
            isBtnNextVisible &&
            <li
              onClick={() => scrollUp(scrollToTopCatalogOptions)}
              className="pagination__item"
            >
              <Link
                className="pagination__link"
                to={`/catalog/page_${paramPageToNumber + 1}?${searchParamsString}`}
              >Далее
              </Link>
            </li>
          }
        </ul>
      }
    </div>
  );
}

export default PaginationList;
