import { CommentFilterItemProps } from '../../types';

import './CommentFilterItem.scss';

const CommentFilterItem = ({ value, onAction }: CommentFilterItemProps) => {
  return (
    <li className='comment-filter-item' role='none'>
      <button
        type='button'
        role='menuitem'
        onClick={onAction}
        className='comment-filter-item__button'
        aria-label={`Sort comments by ${value}`}
      >
        <span className='comment-filter-item__button--label'>{value}</span>
      </button>
    </li>
  );
};

export default CommentFilterItem;
