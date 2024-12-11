import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

import ErrorBoundary from '../ErrorBoundary';
import BackToTop from '../backToTop/BackToTop';

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default MainLayout;
