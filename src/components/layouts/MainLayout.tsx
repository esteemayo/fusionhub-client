import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';

import BackToTop from '../backToTop/BackToTop';
import ErrorBoundary from '../errors/ErrorBoundary';

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default MainLayout;
