import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { onOpen } from '../../features/postsMenu/postsMenuSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './Postbar.scss';

const Postbar = ({ onClick }: { onClick?: () => void }) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.postsMenu);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleClick = (e?: React.MouseEvent<HTMLLIElement> | undefined) => {
    if (!e) return;

    e.stopPropagation();

    if (!isOpen && screenSize <= 768) {
      dispatch(onOpen());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement> | undefined) => {
    if (!e) return;

    if (e.key === 'Enter' || e.key === '') {
      e.preventDefault();
      handleClick();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='postbar' role='banner'>
      <div className='postbar__container'>
        <div className='postbar__wrapper'>
          <h1 id='posts-heading' className='postbar__wrapper--heading'>
            Posts
          </h1>
          <nav className='postbar__wrapper--breadcrumbs'>
            <ul className='postbar__lists' role='list'>
              <li className='postbar__lists--item' role='listitem'>
                <Link
                  to='/'
                  className='postbar__lists--item'
                  aria-label='Go to Home page'
                >
                  Home
                </Link>
              </li>
              <span>|</span>
              <li className='postbar__lists--item' role='listitem'>
                <Link
                  to='/posts'
                  className='postbar__lists--item'
                  aria-label='Go to Posts page'
                >
                  Posts
                </Link>
              </li>
              <span aria-hidden='true'>|</span>
              <li
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className='postbar__lists--item'
                role='button'
                tabIndex={0}
                aria-haspopup='true'
                aria-expanded={isOpen}
                aria-label='Open left sidebar filter panel'
              >
                <Link to='#' className='postbar__lists--item' onClick={onClick}>
                  Left sidebar
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Postbar;
