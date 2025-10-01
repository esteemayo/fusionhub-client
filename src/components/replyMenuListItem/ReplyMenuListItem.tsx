import { useMemo } from 'react';

import { ReplyMenuListItemProps } from '../../types';

import './ReplyMenuListItem.scss';

const ReplyMenuListItem = ({
  type,
  label,
  disabled,
  children,
  onAction,
}: ReplyMenuListItemProps) => {
  const listItemClasses = useMemo(() => {
    return type === 'delete' || type === 'report'
      ? 'reply-menu-list-item delete'
      : 'reply-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses}>
      <button
        type='button'
        onClick={onAction}
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

export default ReplyMenuListItem;
