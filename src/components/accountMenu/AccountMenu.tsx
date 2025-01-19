import { useState } from 'react';

import { accountMenus } from '../../data';
import AccountMenuItem from '../accountMenuItem/AccountMenuItem';

import './AccountMenu.scss';

const AccountMenu = () => {
  const [isActive, setIsActive] = useState('profile');

  const handleClick = (id: string) => {
    setIsActive(id);
  };

  return (
    <aside className='accountMenu'>
      <div className='accountMenu__container'>
        <div className='accountMenu__wrapper'>
          <ul className='accountMenu__list'>
            {accountMenus.map((menu) => {
              return (
                <AccountMenuItem
                  key={menu.id}
                  activeMenu={isActive}
                  onAction={handleClick}
                  {...menu}
                />
              );
            })}
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
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AccountMenu;
