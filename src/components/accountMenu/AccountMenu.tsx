import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import AccountMenuItem from '../accountMenuItem/AccountMenuItem';
import ArrowLeftEndOnRectIcon from '../icons/ArrowLeftEndOnRectIcon';

import { useLogout } from '../../hooks/useLogout';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { accountMenus } from '../../data';
import { onClose } from '../../features/accountMenu/accountMenuSlice';

import './AccountMenu.scss';

const AccountMenu = ({ query }: { query: string | null }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { isOpen } = useAppSelector((state) => state.accountMenu);
  const { isLoading, btnLabel, handleLogout } = useLogout(isOpen, onClose);

  const path = pathname.split('/').pop();

  const [isActive, setIsActive] = useState(path);

  const handleClick = () => {
    if (isOpen) {
      dispatch(onClose());
    }
  };

  const accountMenuClasses = useMemo(
    () => (isOpen ? 'account-menu show' : 'account-menu hide'),
    [isOpen]
  );

  useEffect(() => {
    setIsActive(path);
  }, [path]);

  const menus = accountMenus.slice(0, -1);
  const lastMenu = accountMenus.at(-1);

  if (!currentUser || query) return null;

  return (
    <aside
      className={accountMenuClasses}
      role='navigation'
      aria-label='Account menu'
    >
      <div className='account-menu__container'>
        <div className='account-menu__wrapper'>
          <ul
            className='account-menu__list'
            role='menu'
            aria-label='Account menu options'
          >
            {menus.map((menu) => {
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

            {!!lastMenu && currentUser && currentUser.role === 'admin' && (
              <AccountMenuItem
                {...lastMenu}
                isOpen={isOpen}
                activeMenu={isActive}
                onAction={handleClick}
              />
            )}
          </ul>
        </div>

        <div className='account-menu__box'>
          <button
            type='button'
            onClick={handleLogout}
            aria-label='Log out'
            aria-busy={isLoading}
          >
            <ArrowLeftEndOnRectIcon />
            <span>{btnLabel}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AccountMenu;
