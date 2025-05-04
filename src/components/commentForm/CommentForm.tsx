import { toast } from 'react-toastify';

import Button from '../button/Button';

import './CommentForm.scss';

const CommentForm = ({
  ref,
}: {
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const form = new FormData(target);

    const desc = form.get('desc');

    if (desc) {
      console.log(desc);
      toast.success('Comment posted!');
    }
  };

  return (
    <div className='comment-form'>
      <h4 className='comment-form__heading'>Post comment</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          name='desc'
          id='desc'
          placeholder='Type your comments...'
          ref={ref}
        />
        <Button type='submit' label='Post Comment' color='primary' />
      </form>
    </div>
  );
};

export default CommentForm;
