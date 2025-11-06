import { useMemo } from 'react';

import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';
import ReportIcon from './icons/ReportIcon';
import MuteIcon from './icons/MuteIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import CommentActionMenuListItem from './commentActionMenuListItem/CommentActionMenuListItem';

import { CommentActionMenuListProps } from '../types';

const CommentActionMenuList = ({
  authorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  isMuted,
  onReport,
  onMute,
  onDelete,
  onUpdate,
}: CommentActionMenuListProps) => {
  const actionBtnClasses = useMemo(() => {
    if (!currentUser) {
      return 'context-menu-list__actions hide';
    }

    if (isAdmin) {
      if (isCommentAuthor) {
        return 'context-menu-list__actions show';
      }

      if (authorRole === 'admin') {
        return 'context-menu-list__actions hide';
      }

      return 'context-menu-list__actions show';
    }

    if (
      isCommentAuthor ||
      isPostAuthor ||
      (postAuthorRole === 'admin' && isCommentAuthor) ||
      (postAuthorRole === 'admin' && isPostAuthor)
    ) {
      return 'context-menu-list__actions show';
    }

    return 'context-menu-list__actions hide';
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
      return 'context-menu-list__reports hide';
    }

    if (isCommentAuthor || isAdmin) {
      return 'context-menu-list__reports hide';
    }

    return 'context-menu-list__reports show';
  }, [currentUser, isAdmin, isCommentAuthor]);

  return (
    <ContextMenuList>
      <div className={actionBtnClasses}>
        <CommentActionMenuListItem label='Edit' onAction={onUpdate}>
          <EditIcon />
        </CommentActionMenuListItem>
        <CommentActionMenuListItem
          type='delete'
          label='Delete'
          onAction={onDelete}
        >
          <TrashIcon />
        </CommentActionMenuListItem>
      </div>
      <div className={reportBtnClasses}>
        <CommentActionMenuListItem
          label={`${isMuted ? 'Unmute' : 'Mute'} comment`}
          onAction={onMute}
        >
          <MuteIcon />
        </CommentActionMenuListItem>
        <CommentActionMenuListItem
          type='report'
          label='Report'
          onAction={onReport}
        >
          <ReportIcon />
        </CommentActionMenuListItem>
      </div>
    </ContextMenuList>
  );
};

export default CommentActionMenuList;
