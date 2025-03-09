import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';

import AddPost from '../addPost/AddPost';
import BackToTop from '../backToTop/BackToTop';

import ModalProvider from '../../providers/ModalProvider';
import ErrorBoundary from '../errors/ErrorBoundary';
import SkeletonProvider from '../../providers/SkeletonProvider';

const MainLayout = () => {
  return (
    <main>
      <SkeletonProvider>
        <Navbar />
        <Sidebar />
        <ModalProvider />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <Footer />
        <AddPost />
        <BackToTop />
      </SkeletonProvider>
    </main>
  );
};

export default MainLayout;
