import { useMemo } from 'react';

import CommentCard from '../commentCard/CommentCard';

import { comments } from '../../data';

import './Comment.scss';

const Comment = () => {
  const commentHeading = useMemo(() => {
    return comments.length > 1 ? 'Comments' : 'Comment';
  }, []);

  return (
    <div className='comment'>
      <h4 className='comment__heading'>{commentHeading}</h4>
      {comments.map((comment) => {
        return <CommentCard key={comment.id} {...comment} />;
      })}
    </div>
  );
};

export default Comment;
