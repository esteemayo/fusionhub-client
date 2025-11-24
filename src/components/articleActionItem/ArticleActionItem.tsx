import millify from 'millify';
import { useMemo } from 'react';

import { ArticleActionItemProps } from '../../types';

import './ArticleActionItem.scss';

const ArticleActionItem = ({
  count,
  title,
  isActive,
  disabled,
  children,
  onAction,
  ...props
}: ArticleActionItemProps) => {
  const btnClasses = useMemo(
    () =>
      isActive ? 'article-action-item__btn active' : 'article-action-item__btn',
    [isActive]
  );

  return (
    <div
      className='article-action-item'
      role='group'
      aria-label={`${title} action`}
    >
      <button
        {...props}
        type='button'
        title={title}
        onClick={onAction}
        disabled={disabled}
        aria-disabled={disabled}
        aria-pressed={isActive ?? false}
        className={btnClasses}
      >
        {children}
      </button>
      {typeof count === 'number' && count > 0 && (
        <span
          className='article-action-item__count'
          aria-label={`${millify(count)} ${title} count`}
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default ArticleActionItem;
