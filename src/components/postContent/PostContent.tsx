import PostDetail from '../../components/postDetail/PostDetail';
import Comments from '../../components/comments/Comments';
import RelatedTags from '../../components/relatedTags/RelatedTags';

import { PostContentProps } from '../../types';

import './PostContent.scss';

const PostContent = ({ post, loading }: PostContentProps) => {
  return (
    <div className='post-content'>
      <PostDetail post={post} loading={loading} />
      <RelatedTags />
      <Comments />
    </div>
  );
};

export default PostContent;
