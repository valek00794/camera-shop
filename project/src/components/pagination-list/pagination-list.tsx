import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';

import { scrollUp } from '../../utils/utils';

type PaginationListProps = {
  pageCount: number;
  pages: number[];
}

const scrollToOptions: ScrollToOptions = {
  top: 348,
  behavior: 'smooth'
};

function PaginationList(props: PaginationListProps): JSX.Element {
  const { page } = useParams();
  const paramPageToNumber = Number(page);


  const getPaginationLinkClassName = (pageNumber: number) =>
    classnames(
      'pagination__link',
      { 'pagination__link--active': paramPageToNumber === pageNumber }
    );

  const isBtnBackVisible = paramPageToNumber > 1 ;
  const isBtnNextVisible = paramPageToNumber < props.pageCount ;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          isBtnBackVisible &&
          <li
            onClick={() => scrollUp(scrollToOptions)}
            className="pagination__item"
          >
            <Link
              className="pagination__link"
              to={`/catalog/page_${paramPageToNumber - 1}`}
            >Назад
            </Link>
          </li>
        }
        {
          props.pages.map((pageNumber) =>
            (
              <li
                onClick={() => scrollUp(scrollToOptions)}
                key={pageNumber}
                className="pagination__item"
              >
                <Link
                  className={getPaginationLinkClassName(pageNumber)}
                  to={`/catalog/page_${pageNumber}`}
                >{pageNumber}
                </Link>
              </li>
            )
          )
        }
        {
          isBtnNextVisible &&
          <li
            onClick={() => scrollUp(scrollToOptions)}
            className="pagination__item"
          >
            <Link
              className="pagination__link"
              to={`/catalog/page_${paramPageToNumber + 1}`}
            >Далее
            </Link>
          </li>
        }
      </ul>
    </div>
  );
}

export default PaginationList;
