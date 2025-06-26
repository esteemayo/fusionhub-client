import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import AccountMenuItem from '../accountMenuItem/AccountMenuItem';

import { useLogout } from '../../hooks/useLogout';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { accountMenus } from '../../data';
import { onClose } from '../../features/accountMenu/accountMenuSlice';

import './AccountMenu.scss';

const AccountMenu = ({ query }: { query: string | null }) => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.accountMenu }));
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

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

  const restMenus = accountMenus.slice(0, -1);
  const lastMenu = accountMenus[accountMenus.length - 1];

  useEffect(() => {
    setIsActive(path);
  }, [path]);

  if (!currentUser || query) {
    return null;
  }

  return (
    <aside className={accountMenuClasses}>
      <div className='account-menu__container'>
        <div className='account-menu__wrapper'>
          <ul className='account-menu__list'>
            {restMenus.map((menu) => {
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
            {currentUser && currentUser.role === 'admin' && (
              <AccountMenuItem
                id={lastMenu.id}
                url={lastMenu.url}
                icon={lastMenu.icon}
                label={lastMenu.label}
                isOpen={isOpen}
                activeMenu={isActive}
                onAction={handleClick}
              />
            )}
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
