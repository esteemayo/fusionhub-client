import PostDetail from '../../components/postDetail/PostDetail';
import Comments from '../../components/comments/Comments';
import RelatedTags from '../../components/relatedTags/RelatedTags';

import { PostDetailType } from '../../types';

import './PostContent.scss';

const PostContent = ({ post }: { post: PostDetailType }) => {
  return (
    <div className='post-content'>
      <PostDetail post={post} />
      <RelatedTags />
      <Comments />
    </div>
  );
};

export default PostContent;
