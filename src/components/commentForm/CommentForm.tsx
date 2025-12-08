import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { mergeRefs } from 'react-merge-refs';

import Button from '../button/Button';

import { CommentFormProps } from '../../types';
import { useAppSelector } from '../../hooks/hooks';

import './CommentForm.scss';

const CommentForm = ({
  content,
  postAuthorId,
  maxRows,
  isLoading,
  isPending,
  comments,
  ref,
  onChange,
  onSubmit,
}: CommentFormProps) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);

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
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      onSubmit();
    }
  };

  const userId = useMemo(
    () => currentUser?.details._id,
    [currentUser?.details._id]
  );

  const hasCommented = useMemo(
    () => (comments ?? [])?.some((comment) => comment.author._id === userId),
    [comments, userId]
  );

  const formClasses = useMemo(
    () =>
      !hasCommented ? 'comment-form__form show' : 'comment-form__form hide',
    [hasCommented]
  );

  if (isPending) return null;

  return (
    <div className='comment-form' aria-labelledby='comment-form-title'>
      <h4 id='comment-form-title' className='comment-form__heading'>
        Post comment
      </h4>

      {!currentUser ? (
        <span
          className='comment-form__subtitle'
          role='alert'
          aria-live='polite'
        >
          Please{' '}
          <Link
            to='/login'
            className='comment-form__link'
            aria-label='Login to your account to post a comment'
          >
            login
          </Link>{' '}
          to post a comment.
        </span>
      ) : currentUser.details.isActive === false ? (
        <span
          className='comment-form__subtitle'
          role='alert'
          aria-live='assertive'
        >
          You are blocked from commenting.
        </span>
      ) : (
        <>
          {!hasCommented && postAuthorId !== userId && (
            <span
              id='comment-helper-text'
              className='comment-form__subtitle'
              aria-live='polite'
            >
              {currentUser.details.username}, share your thoughts about the
              article.
            </span>
          )}

          <form
            onSubmit={onSubmit}
            className={formClasses}
            aria-labelledby='comment-form-title'
            aria-describedby='comment-helper-text'
          >
            <label htmlFor='content' className='sr-only'>
              Your comment
            </label>

            <textarea
              id='content'
              name='content'
              value={content}
              placeholder='Write your thoughts here... Share your opinion or feedback about the article.'
              className='comment-form__textarea'
              rows={5}
              onInput={onInput}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              ref={mergeRefs([textareaRef, ref])}
              aria-required='true'
            />

            <small id='submit-shorcut' className='comment-form__shortcut'>
              Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit
            </small>

            <div className='comment-form__actions'>
              <Button
                type='submit'
                label='Post Comment'
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CommentForm;
