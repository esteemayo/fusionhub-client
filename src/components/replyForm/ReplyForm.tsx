import { useEffect, useMemo, useRef } from 'react';

import { useSubmitShortcut } from '../../hooks/useSubmitShortcut';
import { useAutosizeTextarea } from '../../hooks/useAutosizeTextarea';

import { ReplyFormProps } from '../../types';

import './ReplyForm.scss';

const ReplyForm = ({
  value,
  isOpen,
  isEditing,
  editId,
  isLoading,
  size = 'md',
  maxRows = 3,
  username,
  placeholder,
  submitLabel = 'Submit Reply',
  updateLabel = 'Update Reply',
  onChange,
  onCancel,
  onSubmit,
}: ReplyFormProps) => {
  const { handleKeyDown } = useSubmitShortcut(onSubmit, !isLoading);
  const { textareaRef, handleInput } = useAutosizeTextarea(value, maxRows);

  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const formClasses = useMemo(
    () => (isOpen ? `reply-form__form show` : `reply-form__form hide`),
    [isOpen]
  );

  const textareaClasses = useMemo(
    () =>
      `reply-form__textarea ${
        size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const resolvedPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (isEditing && editId) return 'Update your reply here...';
    return username
      ? `Reply to ${username} here...`
      : 'Write your reply here...';
  }, [editId, isEditing, placeholder, username]);

  const actionClasses = useMemo(
    () =>
      `reply-form__actions ${
        size === 'sm' ? 'small' : size == 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const btnLabel = useMemo(() => {
    if (isEditing && editId) {
      return isLoading ? 'Updating...' : updateLabel;
    }

    return isLoading ? 'Submitting...' : submitLabel;
  }, [editId, isEditing, isLoading, submitLabel, updateLabel]);

  useEffect(() => {
    const inner = innerRef.current;
    const container = containerRef.current;

    if (!container || !inner) return;

    if (isOpen) {
      const height = inner.scrollHeight;

      container.style.maxHeight = `${height}px`;
      container.classList.remove('closed');
      setTimeout(() => textareaRef.current?.focus(), 120);
    } else {
      container.style.maxHeight = '0px';
      container.classList.add('closed');
    }
  }, [isOpen, textareaRef, value]);

  return (
    <div
      ref={containerRef}
      className={`reply-form ${isOpen ? '' : 'closed'}`}
      role='region'
      aria-expanded={isOpen}
      aria-hidden={!isOpen}
      aria-label='Reply editor'
    >
      <div ref={innerRef} className='reply-form__inner'>
        <form onSubmit={onSubmit} className={formClasses}>
          <textarea
            ref={textareaRef}
            id='content'
            name='content'
            value={value || ''}
            rows={size === 'sm' ? 2 : maxRows}
            placeholder={resolvedPlaceholder}
            className={textareaClasses}
            disabled={isLoading}
            onInput={handleInput}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={resolvedPlaceholder}
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
              disabled={!value.trim() || isLoading}
              className='reply-form__actions--submit'
              aria-label={btnLabel}
              aria-disabled={!value.trim() || isLoading}
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
