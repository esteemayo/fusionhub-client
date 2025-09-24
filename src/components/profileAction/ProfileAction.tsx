import { useMemo } from 'react';

import ProfileMenu from '../profileMenu/ProfileMenu';

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
      <button type='button' onClick={onToggle} className='profile-action__btn'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='size-6'
        >
          <path
            fillRule='evenodd'
            d='M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <ProfileMenu isOpen={isOpen} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
};

export default ProfileAction;
