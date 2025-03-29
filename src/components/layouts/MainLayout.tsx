import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';

import AddPost from '../addPost/AddPost';
import BackToTop from '../backToTop/BackToTop';

import ToasterProvider from '../../providers/ToasterProvider';
import ModalProvider from '../../providers/ModalProvider';
import SkeletonProvider from '../../providers/SkeletonProvider';

import ErrorBoundary from '../errors/ErrorBoundary';

const MainLayout = () => {
  return (
    <main>
      <SkeletonProvider>
        <Navbar />
        <Sidebar />
        <ToasterProvider />
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
