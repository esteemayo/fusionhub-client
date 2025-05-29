import { useMemo } from 'react';

import { ReplyFormProps } from '../../types';

import './ReplyForm.scss';

const ReplyForm = ({
  content,
  isOpen,
  isLoading,
  onChange,
  onCancel,
  onSubmit,
  ref,
}: ReplyFormProps) => {
  const formClasses = useMemo(() => {
    return isOpen ? 'reply-form show' : 'reply-form hide';
  }, [isOpen]);

  return (
    <form className={formClasses} onSubmit={onSubmit}>
      <textarea
        value={content}
        placeholder='Write your reply here...'
        className='reply-form__textarea'
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
      />
      <div className='reply-form__actions'>
        <button
          type='submit'
          className='reply-form__actions--submit'
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Reply'}
        </button>
        <button
          type='button'
          className='reply-form__actions--cancel'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
