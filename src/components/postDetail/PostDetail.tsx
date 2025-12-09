import PostDetailAction from '../postDetailAction/PostDetailAction';
import PostDesc from '../postDesc/PostDesc';
import PostActionSkeleton from '../postActionSkeleton/PostActionSkeleton';

import { PostDetailProps } from '../../types';

import './PostDetail.scss';

const PostDetail = ({ post, isLoading }: PostDetailProps) => {
  return (
    <section
      className='post-detail'
      role='region'
      aria-live='polite'
      aria-label='Post details section'
    >
      {isLoading ? <PostActionSkeleton /> : <PostDetailAction post={post} />}
      <PostDesc post={post} isLoading={isLoading} />
    </section>
  );
};

export default PostDetail;
