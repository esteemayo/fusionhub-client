import { useMemo } from 'react';

import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';
import ReportIcon from './icons/ReportIcon';
import MuteIcon from './icons/MuteIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import ContextMenuListItem from './contextMenuListItem/ContextMenuListItem';

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

    if (isCommentAuthor || isAdmin || isPostAuthor) {
      return 'context-menu-list__reports hide';
    }

    return 'context-menu-list__reports show';
  }, [currentUser, isAdmin, isCommentAuthor, isPostAuthor]);

  return (
    <ContextMenuList>
      <div className={actionBtnClasses}>
        <ContextMenuListItem label='Edit' onAction={onUpdate}>
          <EditIcon />
        </ContextMenuListItem>
        <ContextMenuListItem type='danger' label='Delete' onAction={onDelete}>
          <TrashIcon />
        </ContextMenuListItem>
      </div>
      <div className={reportBtnClasses}>
        <ContextMenuListItem
          label={`${isMuted ? 'Unmute' : 'Mute'} Comment`}
          onAction={onMute}
        >
          <MuteIcon />
        </ContextMenuListItem>
        <ContextMenuListItem
          type='report'
          label='Report Comment'
          onAction={onReport}
        >
          <ReportIcon />
        </ContextMenuListItem>
      </div>
    </ContextMenuList>
  );
};

export default CommentActionMenuList;
