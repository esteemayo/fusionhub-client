import { useMemo } from 'react';

import { BannerMenuListItemProps } from '../../types';

import './BannerMenuListItem.scss';

const BannerMenuListItem = ({
  type,
  label,
  disabled,
  children,
  onAction,
}: BannerMenuListItemProps) => {
  const listItemClasses = useMemo(() => {
    return type === 'danger'
      ? 'banner-menu-list-item danger'
      : 'banner-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses} role='menuitem'>
      <button
        type='button'
        onClick={onAction}
        disabled={disabled}
        aria-disabled={disabled}
        className='banner-menu-list-item__btn'
      >
        <span>{label}</span>
        {children && (
          <span className='banner-menu-list-item__addon' aria-hidden='true'>
            {children}
          </span>
        )}
      </button>
    </li>
  );
};

export default BannerMenuListItem;
