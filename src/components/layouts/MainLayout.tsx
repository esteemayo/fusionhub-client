import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

import ScrollToTop from '../scrollToTop/ScrollToTop';

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default MainLayout;
