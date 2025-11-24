import { useCallback, useMemo } from 'react';

import ProfileMenu from '../ProfileMenu';
import VerticalEllipsisIcon from '../icons/VerticalEllipsisIcon';

import { ProfileActionProps } from '../../types';

import './ProfileAction.scss';

const ProfileAction = ({
  type,
  authorRole,
  currentUser,
  isAdmin,
  isOpen,
  isCommentAuthor,
  isPostAuthor,
  isReplyAuthor,
  onDelete,
  onToggle,
  onUpdate,
}: ProfileActionProps) => {
  const handleKeyDown = useCallback(
    (e?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e?.key === 'Escape' && isOpen) {
        e?.preventDefault();
        onToggle();
      }
    },
    [isOpen, onToggle]
  );

  const actionClasses = useMemo(() => {
    if (type === 'comment') {
      if (!currentUser) {
        return 'profile-action hide';
      }

      if (isAdmin) {
        if (isCommentAuthor || isPostAuthor) {
          return 'profile-action show';
        }

        if (authorRole === 'admin') {
          return 'profile-action hide';
        }

        return 'profile-action show';
      }

      return 'profile-action hide';
    } else {
      if (!currentUser) {
        return 'profile-action hide';
      }

      if (isAdmin) {
        if (isReplyAuthor || isCommentAuthor || isPostAuthor) {
          return 'profile-action show';
        }

        if (authorRole === 'admin') {
          return 'profile-action hide';
        }

        return 'profile-action show';
      }

      return 'profile-action hide';
    }
  }, [
    authorRole,
    currentUser,
    isAdmin,
    isCommentAuthor,
    isPostAuthor,
    isReplyAuthor,
    type,
  ]);

  return (
    <div className={actionClasses}>
      <button
        type='button'
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className='profile-action__btn'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls='profile-action-menu'
        aria-label='Open profile action menu'
      >
        <VerticalEllipsisIcon />
      </button>
      <ProfileMenu isOpen={isOpen} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
};

export default ProfileAction;
