import { useMemo, useState } from 'react';

import { ReplyFormProps } from '../../types';

import './ReplyForm.scss';

const ReplyForm = ({
  isOpen,
  isEditing,
  content,
  editId,
  isLoading,
  onInput,
  onChange,
  onKeyDown,
  onCancel,
  onSubmit,
  ref,
}: ReplyFormProps) => {
  const [showHint, setShowHint] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setShowHint((value) => {
      return !value;
    });
  };

  const replyFormClasses = useMemo(() => {
    return isOpen ? 'reply-form show' : 'reply-form hide';
  }, [isOpen]);

  const placeholder = useMemo(() => {
    return isEditing && editId
      ? 'Update your reply here...'
      : 'Write your reply here...';
  }, [editId, isEditing]);

  const btnLabel = useMemo(() => {
    return isEditing && editId
      ? isLoading
        ? 'Updating...'
        : 'Update reply'
      : isLoading
      ? 'Submitting...'
      : 'Submit reply';
  }, [editId, isEditing, isLoading]);

  const hintClasses = useMemo(() => {
    return showHint ? 'reply-form__hint show' : 'reply-form__hint hide';
  }, [showHint]);

  const toggleBtnClasses = useMemo(() => {
    return showHint ? 'reply-form__toggle show' : 'reply-form__toggle hide';
  }, [showHint]);

  return (
    <form onSubmit={onSubmit} className={replyFormClasses}>
      <textarea
        ref={ref}
        id='content'
        name='content'
        value={content || ''}
        placeholder={placeholder}
        className='reply-form__textarea'
        rows={2}
        onInput={onInput}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label={placeholder}
      />
      <div className='reply-form__btn'>
        <button
          type='button'
          onClick={onCancel}
          disabled={isLoading}
          aria-disabled={isLoading}
          className='reply-form__btn--cancel'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={!content.trim() || isLoading}
          aria-disabled={!content.trim() || isLoading}
          className='reply-form__btn--submit'
        >
          {btnLabel}
        </button>
      </div>
      <div className='reply-form__hint-bar'>
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

export default ReplyForm;
