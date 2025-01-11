import { Link } from 'react-router-dom';

import './AccountMenu.scss';

const AccountMenu = () => {
  return (
    <aside className='accountMenu'>
      <div className='accountMenu__container'>
        <div className='accountMenu__wrapper'>
          <ul className='accountMenu__list'>
            <li className='accountMenu__list--item'>
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
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
              <Link to='/accounts/user-profile'>User profile</Link>
            </li>
            <li className='accountMenu__list--item'>
              <Link to='/accounts/dashboard'>Dashboard</Link>
            </li>
            <li className='accountMenu__list--item'>
              <Link to='#'>Profile settings</Link>
            </li>
            <li className='accountMenu__list--item'>
              <Link to='#'>Password settings</Link>
            </li>
            <li className='accountMenu__list--item'>
              <Link to='#'>Address</Link>
            </li>
            <li className='accountMenu__list--item'>
              <Link to='#'>Posts</Link>
            </li>
          </ul>
        </div>
        <div className='accountMenu__box'>
          <button type='button'>
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
                d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25'
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AccountMenu;
