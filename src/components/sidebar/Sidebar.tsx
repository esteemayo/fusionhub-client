import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { onClose } from '../../features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './Sidebar.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));

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
        <ul className='sidebar__links'>
          <li className='sidebar__links--item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='sidebar__links--item'>
            <Link to='/posts'>Posts</Link>
          </li>
          <li className='sidebar__links--item'>
            <Link to='/account' className='avatarBox'>
              <img
                src='avatar.png'
                width={32.5}
                height={32.5}
                alt='avatar'
                className='avatar'
              />
            </Link>
          </li>
          <li className='sidebar__links--item'>
            <Link to='/login' className='login__btn'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
