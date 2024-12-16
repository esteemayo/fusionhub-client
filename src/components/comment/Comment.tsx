import CommentCard from '../commentCard/CommentCard';

import './Comment.scss';

const Comment = () => {
  return (
    <div className='comment'>
      <h4 className='comment__heading'>Comment</h4>
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </div>
  );
};

export default Comment;
