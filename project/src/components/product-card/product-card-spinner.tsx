import './loading.css';
import Stars from '../stars/stars';

function ProductCardSpinner(): JSX.Element {
  return (
    <div className="product-card">
      <div className="product-card__img loading">
      </div>
      <div className="product-card__info loading">
        <div className="rate product-card__rate">
          {
            <Stars rating={0} />
          }
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>0</p>
          <p className="visually-hidden"></p>
          <p className="rate__count"></p>
        </div>
        <p className="product-card__title">Loading Loading Loading  </p>
        <p className="product-card__price">Loading
        </p>
      </div>
      <div className="product-card__buttons loading" >
        <div style={{ minWidth: '150px', lineHeight: '39.2px' }}>Loading</div>
        <div style={{ lineHeight: '39.2px' }}>Loading</div>

      </div>
    </div>
  );
}

export default ProductCardSpinner;
