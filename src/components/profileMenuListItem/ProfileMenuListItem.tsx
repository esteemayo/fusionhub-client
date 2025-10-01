import { useMemo } from 'react';

import { ProfileMenuListItemProps } from '../../types';

import './ProfileMenuListItem.scss';

const ProfileMenuListItem = ({
  type,
  label,
  disabled,
  children,
  onClick,
}: ProfileMenuListItemProps) => {
  const listItemClasses = useMemo(() => {
    return type === 'delete'
      ? 'profile-menu-list-item delete'
      : 'profile-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses}>
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
      >
        {label}
        {children}
      </button>
    </li>
  );
};

export default ProfileMenuListItem;
