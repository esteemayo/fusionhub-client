import { useEffect, useMemo, useRef, useState } from 'react';

import { ArticleCommentFormProps } from '../../types';
import InformationCircleIcon from '../icons/InformationCircleIcon';

import './ArticleCommentForm.scss';

const ArticleCommentForm = ({
  isShow,
  size = 'lg',
  value,
  maxRows,
  isLoading,
  onChange,
  onCancel,
  onSubmit,
}: ArticleCommentFormProps) => {
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
    const maxHeight = lineHeight * (maxRows || 5);

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
      isShow
        ? 'article-comment-form__form show'
        : 'article-comment-form__form hide',
    [isShow]
  );

  const textareaClasses = useMemo(
    () =>
      `article-comment-form__textarea ${
        size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const actionClasses = useMemo(
    () =>
      `article-comment-form__actions ${
        size === 'sm' ? 'small' : size == 'md' ? 'medium' : 'large'
      }`,
    [size]
  );

  const hintClasses = useMemo(
    () =>
      showHint
        ? 'article-comment-form__hint show'
        : 'article-comment-form__hint hide',
    [showHint]
  );

  const toggleBtnClasses = useMemo(
    () =>
      showHint
        ? 'article-comment-form__toggle show'
        : 'article-comment-form__toggle hide',
    [showHint]
  );

  useEffect(() => {
    const inner = innerRef.current;
    const container = containerRef.current;

    if (!container || !inner) return;

    if (isShow) {
      const height = inner.scrollHeight;

      container.style.maxHeight = `${height}px`;
      setTimeout(() => textareaRef.current?.focus(), 120);
      container.classList.remove('closed');
    } else {
      container.style.maxHeight = '0px';
      container.classList.add('closed');
    }
  }, [isShow, value]);

  return (
    <div
      ref={containerRef}
      className='article-comment-form'
      aria-expanded={isShow}
      aria-hidden={!isShow}
      aria-label='Write a comment'
    >
      <div ref={innerRef} className='article-comment-form__inner'>
        <form onSubmit={onSubmit} className={formClasses}>
          <textarea
            name='content'
            id='content'
            value={value}
            placeholder='Write your thoughts here... Share your opinion or feedback about the article.'
            className={textareaClasses}
            rows={5}
            onInput={onInput}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isLoading}
            ref={textareaRef}
            aria-label='Write your thoughts here... Share your opinion or feedback about the article.'
            aria-disabled={isLoading}
          />
          <div className={actionClasses}>
            <button
              type='button'
              onClick={onCancel}
              disabled={isLoading}
              className='article-comment-form__actions--cancel'
              aria-label='Cancel comment'
              aria-disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={!value.trim() || isLoading}
              className='article-comment-form__actions--submit'
              aria-label={isLoading ? 'Submitting...' : 'Submit Comment'}
              aria-disabled={!value.trim() || isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Comment'}
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

export default ArticleCommentForm;
