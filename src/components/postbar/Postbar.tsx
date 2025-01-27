import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { onOpen } from '../../features/postsMenu/postsMenuSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './Postbar.scss';

const Postbar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postsMenu }));

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleClick = (e: React.MouseEvent<HTMLLIElement> | undefined) => {
    e?.stopPropagation();

    if (!isOpen && screenSize <= 768) {
      dispatch(onOpen());
    }
  };

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='postbar'>
      <div className='postbar__container'>
        <div className='postbar__wrapper'>
          <h1 className='postbar__wrapper--heading'>Posts</h1>
          <div className='postbar__wrapper--breadcrumbs'>
            <ul className='postbar__lists'>
              <li className='postbar__lists--item'>
                <Link to='/' className='postbar__lists--item'>
                  Home
                </Link>
              </li>
              <span>|</span>
              <li className='postbar__lists--item'>
                <Link to='/posts' className='postbar__lists--item'>
                  Posts
                </Link>
              </li>
              <span>|</span>
              <li className='postbar__lists--item' onClick={handleClick}>
                <Link to='#' className='postbar__lists--item'>
                  Left sidebar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postbar;
