import { CommentActionMenuListItemProps } from '../../types';

import './CommentActionMenuListItem.scss';

const CommentActionMenuListItem = ({
  label,
  disabled,
  onAction,
}: CommentActionMenuListItemProps) => {
  return (
    <li className='comment-action-menu-list-item'>
      <button type='button' onClick={onAction} disabled={disabled}>
        {label}
      </button>
    </li>
  );
};

export default CommentActionMenuListItem;
