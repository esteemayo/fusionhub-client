import CommentCard from '../commentCard/CommentCard';

import { comments } from '../../data';

import './Comment.scss';

const Comment = () => {
  return (
    <div className='comment'>
      <h4 className='comment__heading'>Comment</h4>
      {comments.map((comment) => {
        return <CommentCard key={comment.id} {...comment} />;
      })}
    </div>
  );
};

export default Comment;
