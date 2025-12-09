import millify from 'millify';

import { CommentType } from '../../types';
import ChatBubbleQuoteIcon from '../icons/ChatBubbleQuoteIcon';

import './PostComment.scss';

const PostComment = ({ comments }: { comments: CommentType[] }) => {
  const count = comments.length;

  const formattedCount = millify(count);
  const readableCount = count.toLocaleString();

  return (
    <div className='post-comment'>
      <a
        href='#comments'
        className='post-comment__link'
        role='link'
        aria-label={
          count > 0 ? `View ${readableCount} comments` : `View comments section`
        }
      >
        <ChatBubbleQuoteIcon />

        {count > 0 && (
          <span className='post-comment__link--count' aria-hidden='true'>
            {formattedCount}
          </span>
        )}

        {count > 0 && <span className='sr-only'>{readableCount}</span>}
      </a>
    </div>
  );
};

export default PostComment;
