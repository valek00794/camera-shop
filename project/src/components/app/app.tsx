import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../../pages/catalog/catalog';
import Footer from '../footer/footer';
import Header from '../header/header';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path={AppRoute.Default} element={<Header />} >
          <Route path={AppRoute.Default} element={<Navigate to={AppRoute.Catalog} />} />
          <Route path={AppRoute.Catalog} element={<Catalog />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
