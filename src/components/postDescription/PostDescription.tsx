import { PostDetailType } from '../../types';

import './PostDescription.scss';

const PostDescription = ({ post }: { post: PostDetailType }) => {
  return (
    <div className='post-description__box'>
      <h2 className='post-description__box--heading'>{post?.title}</h2>
      <div className='post-description__box--desc'>{post?.desc}</div>
    </div>
  );
};

export default PostDescription;
