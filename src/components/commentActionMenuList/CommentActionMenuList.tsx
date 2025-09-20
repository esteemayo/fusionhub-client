import { useMemo } from 'react';

import CommentActionMenuListItem from '../commentActionMenuListItem/CommentActionMenuListItem';

import { CommentActionMenuListProps } from '../../types';

import './CommentActionMenuList.scss';

const CommentActionMenuList = ({
  authorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  onClose,
  onDelete,
  onUpdate,
}: CommentActionMenuListProps) => {
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
      return 'comment-action-menu-list__actions hide';
    }

    if (isAdmin) {
      if (isCommentAuthor) {
        return 'comment-action-menu-list__actions show';
      }

      if (authorRole === 'admin') {
        return 'comment-action-menu-list__actions hide';
      }

      return 'comment-action-menu-list__actions show';
    }

    if (
      isCommentAuthor ||
      isPostAuthor ||
      (postAuthorRole === 'admin' && isCommentAuthor) ||
      (postAuthorRole === 'admin' && isPostAuthor)
    ) {
      return 'comment-action-menu-list__actions show';
    }

    return 'comment-action-menu-list__actions hide';
  }, [
    authorRole,
    currentUser,
    isAdmin,
    isCommentAuthor,
    isPostAuthor,
    postAuthorRole,
  ]);

  const reportBtnClasses = useMemo(() => {
    if (!currentUser) {
      return 'comment-action-menu-list__reports hide';
    }

    if (isCommentAuthor || isAdmin) {
      return 'comment-action-menu-list__reports hide';
    }

    return 'comment-action-menu-list__reports show';
  }, [currentUser, isAdmin, isCommentAuthor]);

  return (
    <ul className='comment-action-menu-list'>
      <div className={actionBtnClasses}>
        <CommentActionMenuListItem label='Edit' onAction={handleUpdate} />
        <CommentActionMenuListItem label='Delete' onAction={handleDelete} />
      </div>
      <div className={reportBtnClasses}>
        <CommentActionMenuListItem label='Report' onAction={handleReport} />
        <CommentActionMenuListItem label='Mute' onAction={handleMute} />
      </div>
    </ul>
  );
};

export default CommentActionMenuList;
