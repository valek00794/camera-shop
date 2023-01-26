import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getCamerasAmount } from '../../store/app-data/selectors';
import { CAMERAS_AMOUNT_SHOW_BY_PAGE } from '../../consts';

const scrollToOptions: ScrollToOptions | undefined = {
  top: 348,
  behavior: 'smooth'
};

function PaginationList(): JSX.Element {
  const { page } = useParams();
  const paramPageToNumber = Number(page);
  const camerasAmount = useAppSelector(getCamerasAmount);
  const pageCount = Math.ceil(camerasAmount / CAMERAS_AMOUNT_SHOW_BY_PAGE);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const getPaginationLinkClassName = (pageNumber: number) =>
    classnames(
      'pagination__link',
      { 'pagination__link--active': paramPageToNumber === pageNumber }
    );

  const scrollUp = () => window.scrollTo(scrollToOptions);
  const isBtnBackVisible = paramPageToNumber > 1 ;
  const isBtnNextVisible = paramPageToNumber < pageCount ;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          isBtnBackVisible &&
          <li
            onClick={scrollUp}
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
          pages.map((pageNumber) =>
            (
              <li
                onClick={scrollUp}
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
            onClick={scrollUp}
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
