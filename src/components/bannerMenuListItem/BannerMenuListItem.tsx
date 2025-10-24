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
    <li className={listItemClasses}>
      <button
        type='button'
        onClick={onAction}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
        className='banner-menu-list-item__btn'
      >
        <span aria-label={label} aria-disabled={disabled}>
          {label}
        </span>
        {children}
      </button>
    </li>
  );
};

export default BannerMenuListItem;
