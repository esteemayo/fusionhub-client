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
  isOpen,
  isShow,
  isDisabled,
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
        isDisabled={isDisabled}
        isOpen={isOpen}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </aside>
  );
};

export default CommentActionMenu;
