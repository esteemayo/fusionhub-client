import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import AccountMenuItem from '../accountMenuItem/AccountMenuItem';

import { useLogout } from '../../hooks/useLogout';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { accountMenus } from '../../data';
import { onClose } from '../../features/accountMenu/accountMenuSlice';

import './AccountMenu.scss';

const AccountMenu = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.accountMenu }));

  const { pathname } = useLocation();
  const path = pathname.split('/').pop();

  const { btnLabel, handleLogout } = useLogout(isOpen, onClose);

  const [isActive, setIsActive] = useState(path);

  const handleClick = () => {
    if (isOpen) {
      dispatch(onClose());
      return;
    }
  };

  const accountMenuClasses = useMemo(() => {
    return isOpen ? 'account-menu show' : 'account-menu hide';
  }, [isOpen]);

  useEffect(() => {
    setIsActive(path);
  }, [path]);

  return (
    <aside className={accountMenuClasses}>
      <div className='account-menu__container'>
        <div className='account-menu__wrapper'>
          <ul className='account-menu__list'>
            {accountMenus.map((menu) => {
              return (
                <AccountMenuItem
                  key={menu.id}
                  isOpen={isOpen}
                  activeMenu={isActive}
                  onAction={handleClick}
                  {...menu}
                />
              );
            })}
          </ul>
        </div>
        <div className='account-menu__box'>
          <button type='button' onClick={handleLogout}>
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
                d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
              />
            </svg>
            <span>{btnLabel}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AccountMenu;
