import { useMemo } from 'react';
import { ContextMenuListItemProps } from '../../types';

import './ContextMenuListItem.scss';

const ContextMenuListItem = ({
  type,
  label,
  disabled,
  children,
  onAction,
}: ContextMenuListItemProps) => {
  const listItemClasses = useMemo(
    () =>
      type === 'danger' || type === 'report'
        ? 'context-menu-list-item danger'
        : 'context-menu-list-item',
    [type]
  );

  return (
    <li className={listItemClasses} role='none'>
      <button
        type='button'
        role='menuitem'
        onClick={onAction}
        disabled={disabled}
        className='context-menu-list-item__btn'
        aria-disabled={disabled}
      >
        <span>{label}</span>

        {children && (
          <span className='context-menu-list-item__addon' aria-hidden='true'>
            {children}
          </span>
        )}
      </button>
    </li>
  );
};

export default ContextMenuListItem;
