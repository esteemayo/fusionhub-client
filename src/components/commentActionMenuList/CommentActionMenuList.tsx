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
  isDisabled,
  isOpen,
  onUpdate,
  onDelete,
}: CommentActionMenuListProps) => {
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

    if (isCommentAuthor) {
      return 'comment-action-menu-list__reports hide';
    }

    return 'comment-action-menu-list__reports show';
  }, [currentUser, isCommentAuthor]);

  return (
    <ul className='comment-action-menu-list'>
      <div className={actionBtnClasses}>
        <CommentActionMenuListItem
          label='Edit'
          onAction={onUpdate}
          disabled={isDisabled || isOpen}
        />
        <CommentActionMenuListItem
          label='Delete'
          onAction={onDelete}
          disabled={isDisabled || isOpen}
        />
      </div>
      <div className={reportBtnClasses}>
        <CommentActionMenuListItem
          label='Report'
          onAction={() => console.log('reported')}
        />
        <CommentActionMenuListItem
          label='Mute'
          onAction={() => console.log('muted')}
        />
      </div>
    </ul>
  );
};

export default CommentActionMenuList;
