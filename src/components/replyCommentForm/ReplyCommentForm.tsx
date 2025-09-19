import { useMemo, useState } from 'react';

import { ReplyCommentFormProps } from '../../types';

import './ReplyCommentForm.scss';

const ReplyCommentForm = ({
  content,
  replyId,
  isOpen,
  isLoading,
  isEditing,
  onChange,
  onKeyDown,
  onCancel,
  onSubmit,
  ref,
}: ReplyCommentFormProps) => {
  const [showHint, setShowHint] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setShowHint((value) => {
      return !value;
    });
  };

  const formClasses = useMemo(() => {
    return isOpen ? 'reply-comment-form show' : 'reply-comment-form hide';
  }, [isOpen]);

  const btnLabel = useMemo(() => {
    return isEditing && replyId
      ? isLoading
        ? 'Updating...'
        : 'Update Reply'
      : isLoading
      ? 'Submitting...'
      : 'Submit Reply';
  }, [isEditing, isLoading, replyId]);

  const hintClasses = useMemo(() => {
    return showHint
      ? 'reply-comment-form__hint show'
      : 'reply-comment-form__hint hide';
  }, [showHint]);

  const toggleBtnClasses = useMemo(() => {
    return showHint
      ? 'reply-comment-form__toggle show'
      : 'reply-comment-form__toggle hide';
  }, [showHint]);

  return (
    <form onSubmit={onSubmit} className={formClasses}>
      <textarea
        ref={ref}
        id='content'
        name='content'
        value={content}
        placeholder='Write your reply here...'
        className='reply-comment-form__textarea'
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label='Write your reply here...'
      />
      <div className='reply-comment-form__actions'>
        <button
          type='button'
          className='reply-comment-form__actions--cancel'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='reply-comment-form__actions--submit'
          disabled={!content.trim() || isLoading}
          aria-disabled={!content.trim()}
        >
          {btnLabel}
        </button>
      </div>
      <div className='reply-comment-form__hint-bar'>
        <div className={hintClasses}>
          Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> to post
        </div>
        <button
          type='button'
          onClick={handleToggle}
          aria-label={showHint ? 'Hide reply hint' : 'Show reply hint'}
          className={toggleBtnClasses}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ReplyCommentForm;
