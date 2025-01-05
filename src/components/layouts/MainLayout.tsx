import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';

import BackToTop from '../backToTop/BackToTop';
import AddPost from '../addPost/AddPost';
import ErrorBoundary from '../errors/ErrorBoundary';
import ModalProvider from '../../providers/ModalProvider';

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      <ModalProvider />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <AddPost />
      <BackToTop />
    </main>
  );
};

export default MainLayout;
