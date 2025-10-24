import { useMemo } from 'react';

import DeleteIcon from '../TrashIcon';
import EditIcon from '../EditIcon';
import ReportIcon from '../ReportIcon';
import MuteIcon from '../MuteIcon';
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
  isMuted,
  onDelete,
  onUpdate,
  onMute,
  onReport,
}: ReplyMenuListProps) => {
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
        <ReplyMenuListItem label='Edit' onAction={onUpdate}>
          <EditIcon />
        </ReplyMenuListItem>
        <ReplyMenuListItem type='delete' label='Delete' onAction={onDelete}>
          <DeleteIcon />
        </ReplyMenuListItem>
      </div>
      <div className={reportClasses}>
        <ReplyMenuListItem
          label={`${isMuted ? 'Unmute' : 'Mute'} reply`}
          onAction={onMute}
        >
          <MuteIcon />
        </ReplyMenuListItem>
        <ReplyMenuListItem type='report' label='Report' onAction={onReport}>
          <ReportIcon />
        </ReplyMenuListItem>
      </div>
    </ul>
  );
};

export default ReplyMenuList;
