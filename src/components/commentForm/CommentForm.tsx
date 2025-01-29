import Button from '../button/Button';
import Textarea from '../textarea/Textarea';

import './CommentForm.scss';

const CommentForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const form = new FormData(target);

    const desc = form.get('desc');
    console.log(desc);
  };

  return (
    <div className='commentForm'>
      <h4 className='commentForm__heading'>Post comment</h4>
      <form onSubmit={handleSubmit}>
        <Textarea name='desc' placeholder='Type your comments...' />
        <Button type='submit' label='Post Comment' className='primary' />
      </form>
    </div>
  );
};

export default CommentForm;
