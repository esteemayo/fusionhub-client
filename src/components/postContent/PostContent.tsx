import PostDetail from '../../components/postDetail/PostDetail';
import Comments from '../../components/comments/Comments';
import RelatedTags from '../../components/relatedTags/RelatedTags';

import { PostContentProps } from '../../types';

import './PostContent.scss';

const PostContent = ({ post, isLoading }: PostContentProps) => {
  return (
    <div className='post-content'>
      <PostDetail isLoading={isLoading} post={post} />
      <RelatedTags isLoading={isLoading} tags={post?.tags} />
      <Comments postId={post?._id} slug={post?.slug} />
    </div>
  );
};

export default PostContent;
