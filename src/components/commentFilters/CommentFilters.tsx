import CommentUsers from '../commentUsers/CommentUsers';
import CommentFilter from '../commentFilter/CommentFilter';

import { CommentFiltersProps } from '../../types';

import './CommentFilters.scss';

const CommentFilters = ({
  isOpen,
  totalComments,
  totalCommentUsers,
  onClose,
  onToggle,
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
          <span onClick={onToggle} className='comment-filters__options--value'>
            Best
          </span>
          <CommentFilter isOpen={isOpen} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CommentFilters;
