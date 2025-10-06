import { useEffect, useMemo, useRef } from 'react';

import { ArticleCommentFormProps } from '../../types';

import './ArticleCommentForm.scss';

const ArticleCommentForm = ({
  isShow,
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
    if ((e.ctrlKey || e.metaKey) && e.key === ' Enter') {
      onSubmit();
    }
  };

  const formClasses = useMemo(() => {
    return isShow
      ? 'article-comment-form__form show'
      : 'article-comment-form__form hide';
  }, [isShow]);

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
            placeholder='Write your thoughts here... Share your opinion or feedback about the post.'
            className='article-comment-form__textarea'
            rows={5}
            onInput={onInput}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label='Write your thoughts here... Share your opinion or feedback about the post.'
            ref={textareaRef}
          />
          <div className='article-comment-form__actions'>
            <button
              type='button'
              className='article-comment-form__actions--cancel'
              onClick={onCancel}
              disabled={isLoading}
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
        </form>
      </div>
    </div>
  );
};

export default ArticleCommentForm;
