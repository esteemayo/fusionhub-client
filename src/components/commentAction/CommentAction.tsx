import { useMemo } from 'react';

import { CommentActionProps } from '../../types';

import './CommentAction.scss';

const CommentAction = ({
  authorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  isOpen,
  isDisabled,
  onDelete,
  onUpdate,
}: CommentActionProps) => {
  const actionBtnClasses = useMemo(() => {
    if (!currentUser) {
      return 'comment-action hide';
    }

    if (isAdmin) {
      if (isCommentAuthor) {
        return 'comment-action show';
      }

      if (authorRole === 'admin') {
        return 'comment-action hide';
      }

      return 'comment-action show';
    }

    if (
      isCommentAuthor ||
      isPostAuthor ||
      (postAuthorRole === 'admin' && isCommentAuthor) ||
      (postAuthorRole === 'admin' && isPostAuthor)
    ) {
      return 'comment-action show';
    }

    return 'comment-action hide';
  }, [
    authorRole,
    currentUser,
    isAdmin,
    isCommentAuthor,
    isPostAuthor,
    postAuthorRole,
  ]);

  return (
    <div className={actionBtnClasses}>
      <button
        type='button'
        className='comment-action__edit'
        onClick={onUpdate}
        disabled={isDisabled || isOpen}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          aria-label='Edit'
          aria-hidden='true'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
          />
        </svg>
      </button>
      <button
        type='button'
        className='comment-action__delete'
        onClick={onDelete}
        disabled={isDisabled || isOpen}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          aria-label='Delete'
          aria-hidden='true'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
          />
        </svg>
      </button>
    </div>
  );
};

export default CommentAction;
