import CommentForm from '../commentForm/CommentForm';

import './Comments.scss';

const Comments = () => {
  return (
    <section className='comments'>
      <div className='comments__container'>
        <CommentForm />
      </div>
    </section>
  );
};

export default Comments;
