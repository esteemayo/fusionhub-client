import { useMemo } from 'react';

import { ReplyCommentFormProps } from '../../types';

import './ReplyCommentForm.scss';

const ReplyCommentForm = ({
  content,
  replyId,
  isOpen,
  isLoading,
  isEditing,
  onChange,
  onCancel,
  onSubmit,
  ref,
}: ReplyCommentFormProps) => {
  const formClasses = useMemo(() => {
    return isOpen ? 'reply-comment-form show' : 'reply-comment-form hide';
  }, [isOpen]);

  const btnLabel = useMemo(() => {
    return isEditing && replyId
      ? isLoading
        ? 'Updating...'
        : 'Update Reply'
      : isLoading
      ? 'Submitting...'
      : 'Submit Reply';
  }, [isEditing, isLoading, replyId]);

  return (
    <form onSubmit={onSubmit} className={formClasses}>
      <textarea
        id='content'
        name='content'
        value={content}
        placeholder='Write your reply here...'
        className='reply-comment-form__textarea'
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
      />
      <div className='reply-comment-form__actions'>
        <button
          type='button'
          className='reply-comment-form__actions--cancel'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='reply-comment-form__actions--submit'
          disabled={!content.trim() || isLoading}
          aria-disabled={!content.trim()}
        >
          {btnLabel}
        </button>
      </div>
    </form>
  );
};

export default ReplyCommentForm;
