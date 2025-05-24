import Button from '../button/Button';

import { CommentFormProps } from '../../types';

import './CommentForm.scss';

const CommentForm = ({ ref, isLoading, onSubmit }: CommentFormProps) => {
  return (
    <div className='comment-form'>
      <h4 className='comment-form__heading'>Post comment</h4>
      <form onSubmit={onSubmit}>
        <textarea
          name='content'
          id='content'
          placeholder='Write your thoughts here... Share your opinion or feedback about the post.'
          ref={ref}
          rows={5}
          className='comment-form__textarea'
        />
        <Button
          type='submit'
          label='Post Comment'
          color='primary'
          isLoading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default CommentForm;
