import { useEffect, useMemo, useRef } from 'react';
import { ReplyFormProps } from '../../types';

import './ReplyForm.scss';

const ReplyForm = ({
  content,
  username,
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
      e.preventDefault();
      onSubmit();
    }
  };

  const replyFormClasses = useMemo(
    () => (isOpen ? 'reply-form__form show' : 'reply-form__form hide'),
    [isOpen]
  );

  const textareaClasses = useMemo(
    () =>
      `reply-form__textarea ${
        size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const actionClasses = useMemo(
    () =>
      `reply-form__actions ${
        size === 'sm' ? 'small' : size == 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const placeholder = useMemo(
    () =>
      isEditing && editId
        ? 'Update your reply here...'
        : `Reply to ${username} here...`,
    [editId, isEditing, username]
  );

  const btnLabel = useMemo(
    () =>
      isEditing && editId
        ? isLoading
          ? 'Updating...'
          : 'Update reply'
        : isLoading
        ? 'Submitting...'
        : 'Submit reply',
    [editId, isEditing, isLoading]
  );

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
    <div
      ref={containerRef}
      className={`reply-form ${isOpen ? '' : 'closed'}`}
      aria-expanded={isOpen}
      aria-hidden={!isOpen}
      aria-label='Write a reply'
    >
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
              className='reply-form__actions--cancel'
              aria-label='Cancel reply'
              aria-disabled={isLoading}
            >
              Cancel
            </button>

            <button
              type='submit'
              disabled={!content.trim() || isLoading}
              className='reply-form__actions--submit'
              aria-label={btnLabel}
              aria-disabled={!content.trim() || isLoading}
            >
              {btnLabel}
            </button>
          </div>

          <small className='reply-form__shortcut'>
            Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd> to submit
          </small>
        </form>
      </div>
    </div>
  );
};

export default ReplyForm;
