import { useMemo } from 'react';

import ReplyMenuList from '../replyMenuList/ReplyMenuList';

import { ReplyMenuProps } from '../../types';

import './ReplyMenu.scss';

const ReplyMenu = ({
  authorRole,
  commentAuthorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isOpen,
  isPostAuthor,
  isReplyAuthor,
  isDisabled,
  onDelete,
  onUpdate,
}: ReplyMenuProps) => {
  const replyMenuClasses = useMemo(() => {
    return isOpen ? 'reply-menu show' : 'reply-menu hide';
  }, [isOpen]);

  return (
    <aside className={replyMenuClasses}>
      <ReplyMenuList
        authorRole={authorRole}
        commentAuthorRole={commentAuthorRole}
        currentUser={currentUser}
        postAuthorRole={postAuthorRole}
        isAdmin={isAdmin}
        isCommentAuthor={isCommentAuthor}
        isPostAuthor={isPostAuthor}
        isReplyAuthor={isReplyAuthor}
        isDisabled={isDisabled}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </aside>
  );
};

export default ReplyMenu;
