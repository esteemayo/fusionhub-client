import { useEffect, useMemo, useRef, useState } from 'react';

import { ReplyCommentFormProps } from '../../types';
import InformationCircleIcon from '../icons/InformationCircleIcon';

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
      e.preventDefault();
      onSubmit();
    }
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setShowHint((value) => {
      return !value;
    });
  };

  const formClasses = useMemo(
    () =>
      isOpen
        ? 'reply-comment-form__form show'
        : 'reply-comment-form__form hide',
    [isOpen]
  );

  const textareaClasses = useMemo(
    () =>
      `reply-comment-form__textarea ${
        size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const actionClasses = useMemo(
    () =>
      `reply-comment-form__actions ${
        size === 'sm' ? 'small' : size == 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const btnLabel = useMemo(
    () =>
      isEditing && editId
        ? isLoading
          ? 'Updating...'
          : 'Update Comment'
        : isLoading
        ? 'Submitting...'
        : 'Submit Reply',
    [editId, isEditing, isLoading]
  );

  const placeholder = useMemo(
    () =>
      isEditing && editId
        ? 'Update your reply here...'
        : 'Write your reply here...',
    [editId, isEditing]
  );

  const hintClasses = useMemo(
    () =>
      showHint
        ? 'reply-comment-form__hint show'
        : 'reply-comment-form__hint hide',
    [showHint]
  );

  const toggleBtnClasses = useMemo(
    () =>
      showHint
        ? 'reply-comment-form__toggle show'
        : 'reply-comment-form__toggle hide',
    [showHint]
  );

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
      aria-expanded={isOpen}
      aria-hidden={!isOpen}
      aria-label='Write a reply'
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
            disabled={isLoading}
            ref={textareaRef}
            aria-label={placeholder}
            aria-disabled={isLoading}
          />
          <div className={actionClasses}>
            <button
              type='button'
              onClick={onCancel}
              disabled={isLoading}
              className='reply-comment-form__actions--cancel'
              aria-label='Cancel reply'
              aria-disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={!content.trim() || isLoading}
              className='reply-comment-form__actions--submit'
              aria-label={btnLabel}
              aria-disabled={!content.trim() || isLoading}
            >
              {btnLabel}
            </button>
          </div>
          <div className='reply-comment-form__hint-bar'>
            <div className={hintClasses} aria-hidden={!showHint}>
              Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> to post
            </div>
            <button
              type='button'
              onClick={handleToggle}
              className={toggleBtnClasses}
              aria-label={
                showHint
                  ? 'Hide keyboard shortcut hint'
                  : 'Show keyboard shortcut hint'
              }
            >
              <InformationCircleIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyCommentForm;
