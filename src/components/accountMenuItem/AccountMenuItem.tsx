import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { AccountMenuItemProps } from '../../types';

import './AccountMenuItem.scss';

const AccountMenuItem = ({
  id,
  url,
  icon,
  label,
  activeMenu,
  onAction,
}: AccountMenuItemProps) => {
  const menuClasses = useMemo(() => {
    return id === activeMenu ? 'accountMenuItem active' : 'accountMenuItem';
  }, [id, activeMenu]);

  return (
    <li className={menuClasses} onClick={() => onAction(id)}>
      <Link to={`/accounts/${url}`}>
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
      </Link>
    </li>
  );
};

export default AccountMenuItem;
