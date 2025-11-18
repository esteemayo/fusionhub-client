import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import AccountIcon from '../icons/AccountIcon';
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
      onClick={onAction}
      className={`${menuClasses} ${isOpen ? 'show' : 'hide'}`}
      role='none'
    >
      <NavLink
        to={`/accounts/${url}`}
        role='menuitem'
        aria-label={label}
        tabIndex={0}
      >
        <AccountIcon icon={icon} />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default AccountMenuItem;
