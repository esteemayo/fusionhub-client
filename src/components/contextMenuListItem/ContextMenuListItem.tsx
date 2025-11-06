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
  const listItemClasses = useMemo(() => {
    return type === 'delete' || type === 'report'
      ? 'context-menu-list-item danger'
      : 'context-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses}>
      <button
        type='button'
        onClick={onAction}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
        className='context-menu-list-item__btn'
      >
        <span aria-label={label} aria-disabled={disabled}>
          {label}
        </span>
        {children}
      </button>
    </li>
  );
};

export default ContextMenuListItem;
