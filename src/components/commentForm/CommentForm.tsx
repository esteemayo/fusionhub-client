import Textarea from '../textarea/Textarea';

import './CommentForm.scss';

const CommentForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='commentForm'>
      <h4 className='commentForm__heading'>Post comment</h4>
      <form onSubmit={handleSubmit}>
        <Textarea name='desc' placeholder='Type your comments...' />
      </form>
    </div>
  );
};

export default CommentForm;
