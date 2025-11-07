import { useMemo } from 'react';

import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';
import ReportIcon from './icons/ReportIcon';
import MuteIcon from './icons/MuteIcon';

import ContextMenuList from './contextMenuList/ContextMenuList';
import ContextMenuListItem from './contextMenuListItem/ContextMenuListItem';

import { ReplyMenuListProps } from '../types';

const ReplyMenuList = ({
  authorRole,
  commentAuthorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  isReplyAuthor,
  isMuted,
  onDelete,
  onUpdate,
  onMute,
  onReport,
}: ReplyMenuListProps) => {
  const actionBtnClasses = useMemo(() => {
    if (!currentUser) {
      return 'context-menu-list__actions hide';
    }

    if (isAdmin) {
      if (isReplyAuthor) {
        return 'context-menu-list__actions show';
      }

      if (authorRole === 'admin') {
        return 'context-menu-list__actions hide';
      }

      return 'context-menu-list__actions show';
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
      return 'context-menu-list__actions show';
    }

    return 'context-menu-list__actions hide';
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
      return 'context-menu-list__reports hide';
    }

    if (isReplyAuthor || isAdmin || isPostAuthor) {
      return 'context-menu-list__reports hide';
    }

    return 'context-menu-list__reports show';
  }, [currentUser, isAdmin, isPostAuthor, isReplyAuthor]);

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
      <div className={reportClasses}>
        <ContextMenuListItem
          label={`${isMuted ? 'Unmute' : 'Mute'} Reply`}
          onAction={onMute}
        >
          <MuteIcon />
        </ContextMenuListItem>
        <ContextMenuListItem
          type='report'
          label='Report Reply'
          onAction={onReport}
        >
          <ReportIcon />
        </ContextMenuListItem>
      </div>
    </ContextMenuList>
  );
};

export default ReplyMenuList;
