import { useMemo } from 'react';

import DeleteIcon from '../DeleteIcon';
import EditIcon from '../EditIcon';
import ReportIcon from '../ReportIcon';
import MuteIcon from '../MuteIcon';
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
  isMuted,
  muteMutation,
  onReport,
  onMute,
  onDelete,
  onUpdate,
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

    if (isCommentAuthor || isAdmin) {
      return 'comment-action-menu-list__reports hide';
    }

    return 'comment-action-menu-list__reports show';
  }, [currentUser, isAdmin, isCommentAuthor]);

  return (
    <ul className='comment-action-menu-list'>
      <div className={actionBtnClasses}>
        <CommentActionMenuListItem label='Edit' onAction={onUpdate}>
          <EditIcon />
        </CommentActionMenuListItem>
        <CommentActionMenuListItem
          type='delete'
          label='Delete'
          onAction={onDelete}
        >
          <DeleteIcon />
        </CommentActionMenuListItem>
      </div>
      <div className={reportBtnClasses}>
        <CommentActionMenuListItem
          label={`${isMuted ? 'Unmute' : 'Mute'} comment`}
          disabled={muteMutation.isPending}
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
    </ul>
  );
};

export default CommentActionMenuList;
