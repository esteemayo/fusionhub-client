import { Link } from 'react-router-dom';

import './AccountMenu.scss';

const AccountMenu = () => {
  return (
    <aside className='accountMenu'>
      <div className='accountMenu__container'>
        <div className='accountMenu__wrapper'>
          <ul className='accountMenu__list'>
            <li className='accountMenu__list--item'>
              <Link to='#'>Dashboard</Link>
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
            <li className='accountMenu__list--item'>
              <Link to='#'>Notification</Link>
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
