import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useLogout } from '../../hooks/useLogout';

import './UserMenu.scss';

const UserMenu = () => {
  const { handleLogout } = useLogout();

  const currentUser = true;

  const userMenuClasses = useMemo(() => {
    return currentUser ? 'userMenu__wrapper show' : 'userMenu__wrapper hide';
  }, [currentUser]);

  return (
    <aside className='userMenu'>
      <div className='userMenu__container'>
        <ul className='userMenu__list'>
          {currentUser ? (
            <li className='userMenu__list--item profile-link'>
              <Link to='/accounts/profile'>
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
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
                <span>Account</span>
              </Link>
            </li>
          ) : (
            <>
              <li className='userMenu__list--item login-link'>
                <Link to='/login'>
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
                </Link>
              </li>
              <li className='userMenu__list--item register-link'>
                <Link to='/register'>
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
                      d='m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                  <span>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={userMenuClasses}>
          <span className='username'>Elise beverley</span>
          <button type='button' className='logoutBtn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UserMenu;
