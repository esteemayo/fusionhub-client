import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import './Comments.scss';

const Comments = () => {
  return (
    <section className='comments'>
      <div className='comments__container'>
        <Comment />
        <CommentForm />
      </div>
    </section>
  );
};

export default Comments;
