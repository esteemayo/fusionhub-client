import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';

import BackToTop from '../backToTop/BackToTop';
import AddPost from '../addPost/AddPost';
import ScrollProgressBar from '../scrollProgressBar/ScrollProgressBar';

import ToasterProvider from '../../providers/ToasterProvider';
import ModalProvider from '../../providers/ModalProvider';
import SkeletonProvider from '../../providers/SkeletonProvider';

import ScrollToTop from '../ScrollToTop';
import ErrorBoundary from '../errors/ErrorBoundary';

const MainLayout = () => {
  return (
    <main>
      <SkeletonProvider>
        <ScrollProgressBar />
        <ScrollToTop />
        <Navbar />
        <Sidebar />
        <ToasterProvider />
        <ModalProvider />
        <ErrorBoundary>
          <div id='page-content' className='fade-wrapper'>
            <Outlet />
          </div>
        </ErrorBoundary>
        <Footer />
        <AddPost />
        <BackToTop />
      </SkeletonProvider>
    </main>
  );
};

export default MainLayout;
