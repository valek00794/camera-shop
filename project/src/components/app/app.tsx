import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Camera from '../../pages/camera/camera';
import Catalog from '../../pages/catalog/catalog';
import Footer from '../footer/footer';
import Header from '../header/header';
import NotFound from '../not-found/not-found';

function App(): JSX.Element {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path={AppRoute.Default} element={<Header />} >
          <Route path={AppRoute.Default} element={<Navigate to='/catalog/page_1' />} />
          <Route path={AppRoute.DefaultCatalog} element={<Navigate to='/catalog/page_1' />} />
          <Route path={AppRoute.Catalog} element={<Catalog />} />
          <Route path={AppRoute.Camera} element={<Navigate to={`${location.pathname}/description` }/>} />
          <Route path={AppRoute.DefaultCamera} element={<Camera />} />
          <Route path={AppRoute.Error} element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
