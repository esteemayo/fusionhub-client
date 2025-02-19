import { useRef } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import './Comments.scss';

const Comments = () => {
  const ref =
    useRef<
      React.MutableRefObject<React.LegacyRef<HTMLTextAreaElement> | undefined>
    >();

  const handleClick = () => {
    ref?.current?.focus();
  };

  return (
    <section className='comments'>
      <div className='comments__container'>
        <Comment onAction={handleClick} />
        <CommentForm ref={ref} />
      </div>
    </section>
  );
};

export default Comments;
