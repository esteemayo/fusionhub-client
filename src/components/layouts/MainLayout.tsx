import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

import BackToTop from '../backToTop/BackToTop';

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default MainLayout;
