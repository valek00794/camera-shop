import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/app-data/selectors';

function Banner(): JSX.Element {
  const promo = useAppSelector(getPromo);
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={promo ? `/${promo?.previewImgWebp}, /${promo?.previewImgWebp2x}, 2x` : ''} />
        <img src={promo ? `/${promo?.previewImg}` : ''} srcSet={promo ? `/${promo?.previewImg2x}, 2x` : ''} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo?.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link
          className="btn"
          to={promo ? `/catalog/${promo?.id}/description` : ''}
        >Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
