import { useMemo } from 'react';

import CommentFilter from '../commentFilter/CommentFilter';
import CommentUsers from '../commentUsers/CommentUsers';
import ChevronUpDownIcon from '../icons/ChevronUpDownIcon';

import { CommentFiltersProps } from '../../types';

import './CommentFilters.scss';

const CommentFilters = ({
  sort,
  isOpen,
  isLoading,
  totalComments,
  totalCommentUsers,
  onClose,
  onToggle,
  onSort,
}: CommentFiltersProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const filterClasses = useMemo(
    () => (!isLoading ? 'comment-filters show' : 'comment-filters hide'),
    [isLoading]
  );

  const sortType = useMemo(
    () => sort.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(),
    [sort]
  );

  return (
    <div className={filterClasses} aria-label='Comment filtering controls'>
      <div className='comment-filters__container'>
        <span className='comment-filters__count' aria-live='polite'>
          {totalComments} comment{totalComments && totalComments > 1 ? 's' : ''}
        </span>

        <div className='comment-filters__total'>
          <CommentUsers total={totalCommentUsers} isLoading={isLoading} />
        </div>
      </div>

      <div className='comment-filters__wrapper'>
        <span id='sort-label' className='comment-filters__wrapper--label'>
          Sort by
        </span>

        <div
          className='comment-filters__options'
          role='group'
          aria-labelledby='sort-label'
        >
          <div
            role='button'
            tabIndex={0}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
            className='comment-filters__wrap'
            aria-expanded={isOpen}
            aria-controls='comment-sort-menu'
          >
            <span className='comment-filters__wrap--value'>{sortType}</span>

            <ChevronUpDownIcon />
          </div>

          <CommentFilter isOpen={isOpen} onClose={onClose} onSort={onSort} />
        </div>
      </div>
    </div>
  );
};

export default CommentFilters;
