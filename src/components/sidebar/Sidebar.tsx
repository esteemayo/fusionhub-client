import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import MenuItem from '../menuItem/MenuItem';
import Logo from '../logo/Logo';
import ToggleButton from '../toggleButton/ToggleButton';

import UserAvatar from '../UserAvatar';

import ArrowLeftStartOnRectIcon from '../icons/ArrowLeftStartOnRectIcon';
import ArrowRightStartOnRectIcon from '../icons/ArrowRightStartOnRectIcon';

import { onClose } from '../../features/sidebar/sidebarSlice';
import { useLogout } from '../../hooks/useLogout';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { menuItems } from '../../data';

import './Sidebar.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.sidebar);
  const { isLoading, user: currentUser } = useAppSelector(
    (state) => state.auth
  );

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

  const sidebarClasses = useMemo(
    () => (isOpen ? 'sidebar show' : 'sidebar hide'),
    [isOpen]
  );

  const accountNameClasses = useMemo(
    () =>
      isLoading ? 'sidebar__account--name truncate' : 'sidebar__account--name',
    [isLoading]
  );

  return (
    <aside
      className={sidebarClasses}
      role='navigation'
      aria-hidden={!isOpen}
      aria-label='Sidebar navigation'
    >
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
          <ul
            id='sidebar-menu'
            className='sidebar__menu'
            role='menu'
            aria-label='Main navigation'
          >
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
                  <UserAvatar
                    size={!isLoading ? 56 : undefined}
                    type='sidebar'
                    className='sidebar__account--avatar'
                  />

                  <span
                    className={accountNameClasses}
                    aria-label={`Logged in as ${
                      currentUser?.details.name ?? 'User'
                    }`}
                  >
                    {currentUser.details.name}
                  </span>
                </NavLink>

                <div className='sidebar__logout'>
                  <button
                    type='button'
                    onClick={handleLogout}
                    className='sidebar__logout--btn'
                    aria-label='Logout'
                  >
                    <ArrowLeftStartOnRectIcon />
                    <span>{btnLabel}</span>
                  </button>
                </div>
              </div>
            )}

            {!currentUser && (
              <NavLink
                to='/login'
                onClick={handleClose}
                className='sidebar__login'
                aria-label='Login'
              >
                <ArrowRightStartOnRectIcon />
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
