import CommentUsers from '../commentUsers/CommentUsers';
import CommentFilter from '../commentFilter/CommentFilter';

import { CommentFiltersProps } from '../../types';

import './CommentFilters.scss';

const CommentFilters = ({
  sort,
  isOpen,
  totalComments,
  totalCommentUsers,
  onClose,
  onToggle,
  onSort,
}: CommentFiltersProps) => {
  return (
    <div className='comment-filters'>
      <div className='comment-filters__container'>
        <span className='comment-filters__count'>{totalComments} comments</span>
        <div className='comment-filters__total'>
          <CommentUsers total={totalCommentUsers} />
        </div>
      </div>
      <div className='comment-filters__wrapper'>
        <span className='comment-filters__wrapper--label'>Sort by</span>
        <div className='comment-filters__options'>
          <div onClick={onToggle} className='comment-filters__wrap'>
            <span className='comment-filters__wrap--value'>{sort}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
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
