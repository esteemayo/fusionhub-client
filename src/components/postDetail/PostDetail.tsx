import PostDetailAction from '../postDetailAction/PostDetailAction';
import PostDesc from '../postDesc/PostDesc';
import PostActionSkeleton from '../postActionSkeleton/PostActionSkeleton';

import { PostDetailProps } from '../../types';

import './PostDetail.scss';

const PostDetail = ({ post, isLoading }: PostDetailProps) => {
  return (
    <section className='post-detail'>
      {isLoading ? <PostActionSkeleton /> : <PostDetailAction post={post} />}
      <PostDesc post={post} isLoading={isLoading} />
    </section>
  );
};

export default PostDetail;
