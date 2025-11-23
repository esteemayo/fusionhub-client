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
    return type === 'danger' || type === 'report'
      ? 'context-menu-list-item danger'
      : 'context-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses}>
      <button
        type='button'
        onClick={onAction}
        disabled={disabled}
        aria-disabled={disabled}
        className='context-menu-list-item__btn'
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
