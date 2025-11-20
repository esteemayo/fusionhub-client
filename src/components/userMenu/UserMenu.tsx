import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon';
import UserCircleIcon from '../icons/UserCircleIcon';
import ArrowRightStartOnRectIcon from '../icons/ArrowRightStartOnRectIcon';

import { useLogout } from '../../hooks/useLogout';
import { useAppSelector } from '../../hooks/hooks';

import './UserMenu.scss';

const UserMenu = () => {
  const { pathname } = useLocation();

  const { isLoading, btnLabel, handleLogout } = useLogout();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const userMenuClasses = useMemo(
    () => (currentUser ? 'user-menu__wrapper show' : 'user-menu__wrapper hide'),
    [currentUser]
  );

  const btnLogoutClasses = useMemo(
    () => (isLoading ? 'logout-btn trunc' : 'logout-btn'),
    [isLoading]
  );

  return (
    <aside
      className='user-menu'
      role='region'
      aria-label='User navigation menu'
    >
      <div className='user-menu__container'>
        <ul
          className='user-menu__list'
          role='menu'
          aria-label='User menu options'
        >
          {currentUser ? (
            <li className='user-menu__list--item profile-link' role='none'>
              <Link to='/accounts/profile' role='menuitem' tabIndex={0}>
                <UserCircleIcon />
                <span>Account</span>
              </Link>
            </li>
          ) : (
            <>
              {pathname !== '/login' && (
                <li className='user-menu__list--item login-link' role='none'>
                  <Link to='/login' role='menuitem' tabIndex={0}>
                    <ArrowRightStartOnRectIcon />
                    <span>Login</span>
                  </Link>
                </li>
              )}
              {pathname !== '/register' && (
                <li className='user-menu__list--item register-link' role='none'>
                  <Link to='/register' role='menuitem' tabIndex={0}>
                    <ArrowRightCircleIcon />
                    <span>Register</span>
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
        <div className={userMenuClasses} aria-hidden={!currentUser}>
          <span
            className='username'
            aria-label={`Logged in as ${currentUser?.details.name ?? 'User'}`}
          >
            {currentUser?.details.name}
          </span>
          <button
            type='button'
            onClick={handleLogout}
            className={btnLogoutClasses}
            aria-label='Logout'
            aria-busy={isLoading}
          >
            <span>{btnLabel}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UserMenu;
