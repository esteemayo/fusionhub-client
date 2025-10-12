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
}: ArticleActionItemProps) => {
  const btnClasses = useMemo(() => {
    return isActive
      ? 'article-action-item__btn active'
      : 'article-action-item__btn';
  }, [isActive]);

  return (
    <div className='article-action-item'>
      <button
        type='button'
        title={title}
        onClick={onAction}
        disabled={disabled}
        aria-label={title}
        aria-disabled={disabled}
        className={btnClasses}
      >
        {children}
      </button>
      {(count as number) > 0 && (
        <span
          aria-label={millify(count as number)}
          className='article-action-item__count'
        >
          {millify(count as number)}
        </span>
      )}
    </div>
  );
};

export default ArticleActionItem;
