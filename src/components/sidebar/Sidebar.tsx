import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import MenuItem from '../menuItem/MenuItem';
import Logo from '../logo/Logo';
import ToggleButton from '../toggleButton/ToggleButton';

import Image from '../Image';

import { useLogout } from '../../hooks/useLogout';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { menuItems } from '../../data';
import { onClose } from '../../features/sidebar/sidebarSlice';

import './Sidebar.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.sidebar }));
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { btnLabel, handleLogout } = useLogout(isOpen, onClose);

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (isOpen) {
      handleClose();
    }
  };

  const sidebarClasses = useMemo(() => {
    return isOpen ? 'sidebar show' : 'sidebar hide';
  }, [isOpen]);

  return (
    <aside className={sidebarClasses}>
      <div className='sidebar__container'>
        <div className='sidebar__wrapper'>
          <Logo onClose={handleClick} />
          <ToggleButton
            isOpen={isOpen}
            onClick={handleClose}
            label='Menu'
            type='nav'
          />
        </div>
        <div className='sidebar__box'>
          <ul className='sidebar__menu'>
            {menuItems.map((menu) => {
              const { id, url, label } = menu;
              return (
                <MenuItem
                  key={id}
                  url={url}
                  label={label}
                  onClose={handleClose}
                />
              );
            })}
          </ul>
          <div className='sidebar__accountWrap'>
            {!!currentUser && (
              <div className='sidebar__accounts'>
                <NavLink
                  to='/accounts/profile'
                  className='sidebar__account'
                  onClick={handleClose}
                >
                  <Image
                    src={currentUser.details.image ?? '/user-default.jpg'}
                    width={70}
                    height={70}
                    alt='avatar'
                    className='sidebar__account--avatar'
                  />
                  <span className='sidebar__account--name'>
                    {currentUser.details.name}
                  </span>
                </NavLink>
                <div className='sidebar__logout'>
                  <button
                    type='button'
                    className='sidebar__logout--btn'
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
                      />
                    </svg>
                    <span>{btnLabel}</span>
                  </button>
                </div>
              </div>
            )}
            {!currentUser && (
              <NavLink
                to='/login'
                className='sidebar__login'
                onClick={handleClose}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9'
                  />
                </svg>
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
