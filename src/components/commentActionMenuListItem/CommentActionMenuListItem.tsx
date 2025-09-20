import { CommentActionMenuListItemProps } from '../../types';

import './CommentActionMenuListItem.scss';

const CommentActionMenuListItem = ({
  label,
  onAction,
}: CommentActionMenuListItemProps) => {
  return (
    <li className='comment-action-menu-list-item'>
      <button type='button' onClick={onAction}>
        {label}
      </button>
    </li>
  );
};

export default CommentActionMenuListItem;
