import React, { useMemo } from 'react';

import CommentUsers from '../commentUsers/CommentUsers';
import CommentFilter from '../commentFilter/CommentFilter';

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
          {totalComments} comments
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

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              role='img'
              aria-hidden='true'
              focusable='false'
              className='size-6 comment-filters__wrap--icon'
            >
              <path
                fillRule='evenodd'
                d='M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z'
                clipRule='evenodd'
              />
            </svg>
          </div>

          <CommentFilter isOpen={isOpen} onClose={onClose} onSort={onSort} />
        </div>
      </div>
    </div>
  );
};

export default CommentFilters;
