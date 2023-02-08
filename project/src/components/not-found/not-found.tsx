import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import './not-found.css';


function NotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>404. Увы страница не найдена!</title>
      </Helmet>
      <main className="outer">
        <div className="inner">
          <h1 className="title title--h2">404. Увы страница не найдена!</h1>
          <Link to="/">Вернуться на главную</Link>

        </div>
      </main>
    </>
  );
}

export default NotFound;
