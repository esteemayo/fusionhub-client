import { useMemo } from 'react';

import ReplyMenuListItem from '../replyMenuListItem/ReplyMenuListItem';

import { ReplyMenuListProps } from '../../types';

import './ReplyMenuList.scss';

const ReplyMenuList = ({
  authorRole,
  commentAuthorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  isReplyAuthor,
  onClose,
  onDelete,
  onUpdate,
}: ReplyMenuListProps) => {
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onUpdate();
    onClose();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onDelete();
    onClose();
  };

  const handleReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log('reported');
    onClose();
  };

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log('muted');
    onClose();
  };

  const actionBtnClasses = useMemo(() => {
    if (!currentUser) {
      return 'reply-menu-list__actions hide';
    }

    if (isAdmin) {
      if (isReplyAuthor) {
        return 'reply-menu-list__actions show';
      }

      if (authorRole === 'admin') {
        return 'reply-menu-list__actions hide';
      }

      return 'reply-menu-list__actions show';
    }

    if (
      isReplyAuthor ||
      isCommentAuthor ||
      isPostAuthor ||
      (postAuthorRole === 'admin' && isCommentAuthor) ||
      (postAuthorRole === 'admin' && isPostAuthor) ||
      (commentAuthorRole === 'admin' && isCommentAuthor) ||
      (commentAuthorRole === 'admin' && isPostAuthor)
    ) {
      return 'reply-menu-list__actions show';
    }

    return 'reply-menu-list__actions hide';
  }, [
    authorRole,
    commentAuthorRole,
    currentUser,
    isAdmin,
    isCommentAuthor,
    isPostAuthor,
    isReplyAuthor,
    postAuthorRole,
  ]);

  const reportClasses = useMemo(() => {
    if (!currentUser) {
      return 'reply-menu-list__reports hide';
    }

    if (isReplyAuthor || isAdmin) {
      return 'reply-menu-list__reports hide';
    }

    return 'reply-menu-list__reports show';
  }, [currentUser, isAdmin, isReplyAuthor]);

  return (
    <ul className='reply-menu-list'>
      <div className={actionBtnClasses}>
        <ReplyMenuListItem label='Edit' onAction={handleUpdate} />
        <ReplyMenuListItem label='Delete' onAction={handleDelete} />
      </div>
      <div className={reportClasses}>
        <ReplyMenuListItem label='Report' onAction={handleReport} />
        <ReplyMenuListItem label='Mute' onAction={handleMute} />
      </div>
    </ul>
  );
};

export default ReplyMenuList;
