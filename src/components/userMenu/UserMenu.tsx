import { Link } from 'react-router-dom';

import { useLogout } from '../../hooks/useLogout';

import './UserMenu.scss';

const UserMenu = () => {
  const { handleLogout } = useLogout();

  const currentUser = false;

  return (
    <aside className='userMenu'>
      <div className='userMenu__container'>
        {currentUser ? (
          <>
            <ul className='userMenu__list'>
              <li className='userMenu__list--item'>
                <Link to='/accounts/profile'>Account</Link>
              </li>
            </ul>
            <div className='userMenu__wrapper'>
              <span className='username'>Elise beverley</span>
              <button
                type='button'
                className='logoutBtn'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className='userMenu__box'>
            <Link to='/login' className='userMenu__box--login'>
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
            <Link to='/register' className='userMenu__box--register'>
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
          </div>
        )}
      </div>
    </aside>
  );
};

export default UserMenu;
