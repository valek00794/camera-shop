import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Catalog from '../../pages/catalog/catalog';
import Footer from '../footer/footer';
import Header from '../header/header';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path={AppRoute.Default} element={<Header />} >
          <Route path={AppRoute.Default} element={<Navigate to='/catalog/page_1' />} />
          <Route path={AppRoute.Catalog} element={<Catalog />} />
          <Route path={AppRoute.Camera} element={<Catalog />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
