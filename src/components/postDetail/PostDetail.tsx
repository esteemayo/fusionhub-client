import PostDetailAction from '../postDetailAction/PostDetailAction';
import PostDesc from '../postDesc/PostDesc';
import PostActionSkeleton from '../postActionSkeleton/PostActionSkeleton';

import { PostDetailProps } from '../../types';

import './PostDetail.scss';

const PostDetail = ({ post, loading }: PostDetailProps) => {
  return (
    <section className='post-detail'>
      {loading ? <PostActionSkeleton /> : <PostDetailAction post={post} />}
      <PostDesc post={post} loading={loading} />
    </section>
  );
};

export default PostDetail;
