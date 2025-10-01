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
  isShow,
  isPostAuthor,
  isReplyAuthor,
  onDelete,
  onUpdate,
}: ReplyMenuProps) => {
  const replyMenuClasses = useMemo(() => {
    return isShow ? 'reply-menu show' : 'reply-menu hide';
  }, [isShow]);

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
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </aside>
  );
};

export default ReplyMenu;
