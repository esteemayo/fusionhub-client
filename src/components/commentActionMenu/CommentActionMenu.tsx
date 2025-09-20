import { useMemo } from 'react';

import CommentActionMenuList from '../commentActionMenuList/CommentActionMenuList';

import { CommentActionMenuProps } from '../../types';

import './CommentActionMenu.scss';

const CommentActionMenu = ({
  authorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  isShow,
  onClose,
  onDelete,
  onUpdate,
}: CommentActionMenuProps) => {
  const actionMenuClasses = useMemo(() => {
    return isShow ? 'comment-action-menu show' : 'comment-action-menu hide';
  }, [isShow]);

  return (
    <aside className={actionMenuClasses}>
      <CommentActionMenuList
        authorRole={authorRole}
        currentUser={currentUser}
        postAuthorRole={postAuthorRole}
        isAdmin={isAdmin}
        isCommentAuthor={isCommentAuthor}
        isPostAuthor={isPostAuthor}
        onClose={onClose}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </aside>
  );
};

export default CommentActionMenu;
