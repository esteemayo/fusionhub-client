import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { AccountMenuItemProps } from '../../types';

import './AccountMenuItem.scss';

const AccountMenuItem = ({
  id,
  url,
  icon,
  label,
  activeLink,
  onAction,
}: AccountMenuItemProps) => {
  const activeMenu = useMemo(() => {
    return id === activeLink ? 'accountMenuItem active' : 'accountMenuItem';
  }, [id, activeLink]);

  return (
    <li className={activeMenu} onClick={() => onAction(id)}>
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
