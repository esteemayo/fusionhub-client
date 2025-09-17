import { ReplyMenuListItemProps } from '../../types';

import './ReplyMenuListItem.scss';

const ReplyMenuListItem = ({
  label,
  disabled,
  onAction,
}: ReplyMenuListItemProps) => {
  return (
    <li className='reply-menu-list-item'>
      <button type='button' onClick={onAction} disabled={disabled}>
        {label}
      </button>
    </li>
  );
};

export default ReplyMenuListItem;
