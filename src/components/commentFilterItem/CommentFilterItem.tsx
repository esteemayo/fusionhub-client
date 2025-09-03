import { CommentFilterItemProps } from '../../types';

import './CommentFilterItem.scss';

const CommentFilterItem = ({ value, onAction }: CommentFilterItemProps) => {
  return (
    <li onClick={onAction} className='comment-filter-item'>
      <span className='comment-filter-item__label'>{value}</span>
    </li>
  );
};

export default CommentFilterItem;
