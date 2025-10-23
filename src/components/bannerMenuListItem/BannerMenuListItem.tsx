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
    return type === 'block'
      ? 'banner-menu-list-item block'
      : 'banner-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses}>
      <button
        type='button'
        onClick={onAction}
        disabled={disabled}
        aria-disabled={disabled}
        className='banner-menu-list-item__btn'
      >
        {label}
        {children}
      </button>
    </li>
  );
};

export default BannerMenuListItem;
