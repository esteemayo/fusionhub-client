import { useRef } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import './Comments.scss';

const Comments = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleReply = () => {
    const current = ref.current;

    current?.focus();
  };

  const handleUpdate = () => {
    const current = ref.current;

    current?.focus();
  };

  return (
    <section className='comments'>
      <div className='comments__container'>
        <Comment onAction={handleReply} onUpdate={handleUpdate} />
        <CommentForm ref={ref} />
      </div>
    </section>
  );
};

export default Comments;
