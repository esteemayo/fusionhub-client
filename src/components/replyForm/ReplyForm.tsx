import { useEffect, useMemo, useRef, useState } from 'react';

import { ReplyFormProps } from '../../types';

import './ReplyForm.scss';

const ReplyForm = ({
  content,
  size = 'sm',
  isOpen,
  isEditing,
  editId,
  maxRows,
  isLoading,
  onChange,
  onCancel,
  onSubmit,
}: ReplyFormProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [showHint, setShowHint] = useState(false);

  const onInput = () => {
    const textarea = textareaRef.current!;

    textarea.style.height = 'auto';
    const lineHeight = parseInt(
      getComputedStyle(textarea).lineHeight || '20',
      10
    );
    const maxHeight = lineHeight * (maxRows || 2);

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

  const replyFormClasses = useMemo(() => {
    return isOpen ? 'reply-form__form show' : 'reply-form__form hide';
  }, [isOpen]);

  const textareaClasses = useMemo(() => {
    return `reply-form__textarea ${
      size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'
    }`;
  }, [size]);

  const actionClasses = useMemo(() => {
    return `reply-form__actions ${
      size === 'sm' ? 'small' : size == 'md' ? 'medium' : 'large'
    }`;
  }, [size]);

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

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

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
    <div ref={containerRef} className={`reply-form ${isOpen ? '' : 'closed'}`}>
      <div ref={innerRef} className='reply-form__inner'>
        <form onSubmit={onSubmit} className={replyFormClasses}>
          <textarea
            id='content'
            name='content'
            value={content || ''}
            placeholder={placeholder}
            className={textareaClasses}
            rows={2}
            onInput={onInput}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label={placeholder}
            ref={textareaRef}
          />
          <div className={actionClasses}>
            <button
              type='button'
              onClick={onCancel}
              disabled={isLoading}
              aria-disabled={isLoading}
              className='reply-form__actions--cancel'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={!content.trim() || isLoading}
              aria-disabled={!content.trim() || isLoading}
              className='reply-form__actions--submit'
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
      </div>
    </div>
  );
};

export default ReplyForm;
