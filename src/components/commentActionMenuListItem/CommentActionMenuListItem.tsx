import { useMemo } from 'react';

import { CommentActionMenuListItemProps } from '../../types';

import './CommentActionMenuListItem.scss';

const CommentActionMenuListItem = ({
  type,
  label,
  disabled,
  children,
  onAction,
}: CommentActionMenuListItemProps) => {
  const listItemClasses = useMemo(() => {
    return type === 'delete' || type === 'report'
      ? 'comment-action-menu-list-item delete'
      : 'comment-action-menu-list-item';
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

export default CommentActionMenuListItem;
