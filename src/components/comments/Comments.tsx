import { useRef } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/commentModal/commentModalSlice';

import './Comments.scss';

const Comments = () => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleReply = () => {
    const current = ref.current;

    current?.focus();
  };

  const handleUpdate = () => {
    const current = ref.current;

    current?.focus();
  };

  const handleOpen = () => {
    dispatch(onOpen());
  };

  return (
    <section className='comments' id='comments'>
      <div className='comments__container'>
        <Comment
          onAction={handleReply}
          onUpdate={handleUpdate}
          onOpen={handleOpen}
        />
        <CommentForm ref={ref} />
      </div>
    </section>
  );
};

export default Comments;
