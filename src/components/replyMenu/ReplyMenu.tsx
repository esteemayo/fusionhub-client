import { useMemo } from 'react';

import { ReplyMenuProps } from '../../types';

import './ReplyMenu.scss';

const ReplyMenu = ({
  authorRole,
  commentAuthorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isOpen,
  isPostAuthor,
  isReplyAuthor,
  isDisabled,
  onDelete,
  onUpdate,
}: ReplyMenuProps) => {
  const replyMenuClasses = useMemo(() => {
    return isOpen ? 'reply-menu show' : 'reply-menu hide';
  }, [isOpen]);

  const actionBtnClasses = useMemo(() => {
    if (!currentUser) {
      return 'reply-menu__list--actions hide';
    }

    if (isAdmin) {
      if (isReplyAuthor) {
        return 'reply-menu__list--actions show';
      }

      if (authorRole === 'admin') {
        return 'reply-menu__list--actions hide';
      }

      return 'reply-menu__list--actions show';
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
      return 'reply-menu__list--actions show';
    }

    return 'reply-menu__list--actions hide';
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
      return 'reply-menu__list--reports hide';
    }

    if (isReplyAuthor || isAdmin) {
      return 'reply-menu__list--reports hide';
    }

    return 'reply-menu__list--reports show';
  }, [currentUser, isAdmin, isReplyAuthor]);

  return (
    <aside className={replyMenuClasses}>
      <ul className='reply-menu__list'>
        <div className={actionBtnClasses}>
          <li className='reply-menu__list--item'>
            <button type='button' onClick={onUpdate} disabled={isDisabled}>
              Edit
            </button>
          </li>
          <li className='reply-menu__list--item'>
            <button type='button' onClick={onDelete} disabled={isDisabled}>
              Delete
            </button>
          </li>
        </div>
        <div className={reportClasses}>
          <li className='reply-menu__list--item'>
            <button type='button' onClick={() => console.log('repoted')}>
              Report
            </button>
          </li>
          <li className='reply-menu__list--item'>
            <button type='button' onClick={() => console.log('muted')}>
              Mute
            </button>
          </li>
        </div>
      </ul>
    </aside>
  );
};

export default ReplyMenu;
