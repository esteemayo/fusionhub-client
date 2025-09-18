import { useMemo } from 'react';

import { ReplyFormProps } from '../../types';

import './ReplyForm.scss';

const ReplyForm = ({
  isOpen,
  content,
  onInput,
  onChange,
  onKeyDown,
  onCancel,
  onSubmit,
  ref,
}: ReplyFormProps) => {
  const replyFormClasses = useMemo(() => {
    return isOpen ? 'reply-form show' : 'reply-form hide';
  }, [isOpen]);

  return (
    <form onSubmit={onSubmit} className={replyFormClasses}>
      <textarea
        ref={ref}
        id='content'
        name='content'
        value={content}
        placeholder='Write your reply here...'
        className='reply-form__textarea'
        rows={2}
        onInput={onInput}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label='Write your reply here...'
      />
      <div className='reply-form__btn'>
        <button
          type='button'
          onClick={onCancel}
          className='reply-form__btn--cancel'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={!content.trim()}
          aria-disabled={!content.trim()}
          className='reply-form__btn--submit'
        >
          Submit reply
        </button>
      </div>
      <div className='reply-form__hint'>
        Press <kbd>Ctrl</kbd>/<kbd>↺</kbd> + <kbd>Enter</kbd> to post
      </div>
    </form>
  );
};

export default ReplyForm;
