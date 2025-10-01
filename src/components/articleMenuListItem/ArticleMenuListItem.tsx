import { useMemo } from 'react';

import { ArticleMenuListItemProps } from '../../types';

import './ArticleMenuListItem.scss';

const ArticleMenuListItem = ({
  type,
  label,
  disabled,
  children,
  onClick,
}: ArticleMenuListItemProps) => {
  const listItemClasses = useMemo(() => {
    return type === 'delete'
      ? 'article-menu-list-item delete'
      : 'article-menu-list-item';
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

export default ArticleMenuListItem;
