import { useMemo } from 'react';

import { CommentActionMenuProps } from '../../types';

import './CommentActionMenu.scss';

const CommentActionMenu = ({
  authorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  isOpen,
  isShow,
  isDisabled,
  onDelete,
  onUpdate,
}: CommentActionMenuProps) => {
  const actionMenuClasses = useMemo(() => {
    return isShow ? 'comment-action-menu show' : 'comment-action-menu hide';
  }, [isShow]);

  console.log({
    authorRole,
    currentUser,
    postAuthorRole,
    isAdmin,
    isCommentAuthor,
    isPostAuthor,
    isOpen,
    isDisabled,
  });

  return (
    <aside className={actionMenuClasses}>
      <ul className='comment-action-menu__list'>
        <li className='comment-action-menu__list--item'>
          <button type='button' onClick={onUpdate}>
            Edit
          </button>
        </li>
        <li className='comment-action-menu__list--item'>
          <button type='button' onClick={onDelete}>
            Delete
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default CommentActionMenu;
