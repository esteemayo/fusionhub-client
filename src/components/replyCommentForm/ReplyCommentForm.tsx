import { useEffect, useMemo, useRef, useState } from 'react';

import { ReplyCommentFormProps } from '../../types';

import './ReplyCommentForm.scss';

const ReplyCommentForm = ({
  content,
  size = 'md',
  editId,
  isOpen,
  maxRows,
  isLoading,
  isEditing,
  onChange,
  onCancel,
  onSubmit,
}: ReplyCommentFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [showHint, setShowHint] = useState(false);

  const onInput = () => {
    const textarea = textareaRef.current!;

    textarea.style.height = 'auto';
    const lineHeight = parseInt(
      getComputedStyle(textarea).lineHeight || '20',
      10
    );
    const maxHeight = lineHeight * (maxRows || 3);

    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    onChange(textarea.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      onSubmit();
    }
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setShowHint((value) => {
      return !value;
    });
  };

  const formClasses = useMemo(() => {
    return isOpen
      ? 'reply-comment-form__form show'
      : 'reply-comment-form__form hide';
  }, [isOpen]);

  const textareaClasses = useMemo(() => {
    return `reply-comment-form__textarea ${
      size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'
    }`;
  }, [size]);

  const actionClasses = useMemo(() => {
    return `reply-comment-form__actions ${
      size === 'sm' ? 'small' : size == 'md' ? 'medium' : 'large'
    }`;
  }, [size]);

  const btnLabel = useMemo(() => {
    return isEditing && editId
      ? isLoading
        ? 'Updating...'
        : 'Update Comment'
      : isLoading
      ? 'Submitting...'
      : 'Submit Reply';
  }, [editId, isEditing, isLoading]);

  const placeholder = useMemo(() => {
    return isEditing && editId
      ? 'Update your reply here...'
      : 'Write your reply here...';
  }, [editId, isEditing]);

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

  useEffect(() => {
    const inner = innerRef.current;
    const container = containerRef.current;

    if (!container || !inner) return;

    if (isOpen) {
      const height = inner.scrollHeight;

      container.style.maxHeight = `${height}px`;
      setTimeout(() => textareaRef.current?.focus(), 120);
      container.classList.remove('closed');
    } else {
      container.style.maxHeight = '0px';
      container.classList.add('closed');
    }
  }, [isOpen, content]);

  return (
    <div
      ref={containerRef}
      className={`reply-comment-form ${isOpen ? '' : 'closed'}`}
    >
      <div ref={innerRef} className='reply-comment-form__inner'>
        <form onSubmit={onSubmit} className={formClasses}>
          <textarea
            id='content'
            name='content'
            value={content || ''}
            placeholder={placeholder}
            className={textareaClasses}
            rows={3}
            onInput={onInput}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label={placeholder}
            ref={textareaRef}
          />
          <div className={actionClasses}>
            <button
              type='button'
              className='reply-comment-form__actions--cancel'
              onClick={onCancel}
              disabled={isLoading}
              aria-label='Cancel'
              aria-disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='reply-comment-form__actions--submit'
              disabled={!content.trim() || isLoading}
              aria-label={btnLabel}
              aria-disabled={!content.trim() || isLoading}
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
                  d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyCommentForm;
