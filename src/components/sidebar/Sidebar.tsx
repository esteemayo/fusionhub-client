import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { onClose } from '../../features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './Sidebar.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));

  const user = true;

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onClose());
  };

  const sidebarClasses = useMemo(() => {
    return isOpen ? 'sidebar show' : 'sidebar hide';
  }, [isOpen]);

  return (
    <aside className={sidebarClasses}>
      <div className='sidebar__container'>
        <div className='sidebar__wrapper'>
          <div className='sidebar__logo'>
            <Link to='/'>Logo</Link>
          </div>
          <button className='sidebar__closeBtn' onClick={handleClose}>
            <span>Menu</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='sidebar__box'>
          <ul className='sidebar__menu'>
            <li className='sidebar__menu--item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='sidebar__menu--item'>
              <Link to='/posts'>Posts</Link>
            </li>
          </ul>
          <div className='sidebar__accountWrap'>
            {user && (
              <div className='sidebar__accounts'>
                <Link to='/account' className='sidebar__account'>
                  <img
                    src='avatar.png'
                    width={32.5}
                    height={32.5}
                    alt='avatar'
                    className='sidebar__account--avatar'
                  />
                  <span className='sidebar__account--name'>John doe</span>
                </Link>
                <button type='button'>Logout</button>
              </div>
            )}
            {!user && (
              <Link to='/login' className='sidebar__login'>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
