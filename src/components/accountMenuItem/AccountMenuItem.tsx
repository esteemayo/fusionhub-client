import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { AccountMenuItemProps } from '../../types';

import './AccountMenuItem.scss';

const AccountMenuItem = ({
  url,
  icon,
  label,
  activeMenu,
  isOpen,
  onAction,
}: AccountMenuItemProps) => {
  const menuClasses = useMemo(() => {
    return url === activeMenu
      ? 'account-menu-item active'
      : 'account-menu-item';
  }, [activeMenu, url]);

  return (
    <li
      className={`${menuClasses} ${isOpen ? 'show' : 'hide'}`}
      onClick={onAction}
    >
      <NavLink to={`/accounts/${url}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
        </svg>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default AccountMenuItem;
