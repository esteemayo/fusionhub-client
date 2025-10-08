import { useEffect, useMemo, useRef, useState } from 'react';

import { ArticleCommentFormProps } from '../../types';

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
    return isShow
      ? 'article-comment-form__form show'
      : 'article-comment-form__form hide';
  }, [isShow]);

  const textareaClasses = useMemo(() => {
    return `article-comment-form__textarea ${
      size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'
    }`;
  }, [size]);

  const actionClasses = useMemo(() => {
    return `article-comment-form__actions ${
      size === 'sm' ? 'small' : size == 'md' ? 'medium' : 'large'
    }`;
  }, [size]);

  const hintClasses = useMemo(() => {
    return showHint
      ? 'article-comment-form__hint show'
      : 'article-comment-form__hint hide';
  }, [showHint]);

  const toggleBtnClasses = useMemo(() => {
    return showHint
      ? 'article-comment-form__toggle show'
      : 'article-comment-form__toggle hide';
  }, [showHint]);

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
    <div ref={containerRef} className='article-comment-form'>
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
            aria-label='Write your thoughts here... Share your opinion or feedback about the article.'
            ref={textareaRef}
          />
          <div className={actionClasses}>
            <button
              type='button'
              className='article-comment-form__actions--cancel'
              onClick={onCancel}
              disabled={isLoading}
              aria-label='Cancel'
              aria-disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='article-comment-form__actions--submit'
              disabled={!value.trim() || isLoading}
              aria-label={isLoading ? 'Submitting...' : 'Submit Reply'}
              aria-disabled={!value.trim() || isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Reply'}
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

export default ArticleCommentForm;
