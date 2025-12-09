import millify from 'millify';
import EyeOutlinedIcon from '../icons/EyeOutlinedIcon';

import './PostViews.scss';

const PostViews = ({ views }: { views: number }) => {
  const formattedViews = views > 0 ? millify(views) : null;

  return (
    <div
      className='post-views'
      role='group'
      aria-label={views > 0 ? `Post has ${views} views` : 'No views yet'}
    >
      <EyeOutlinedIcon />
      {views > 0 && (
        <span aria-label={`${views} views`}>{formattedViews} views</span>
      )}
    </div>
  );
};

export default PostViews;
