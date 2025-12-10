import PostDetail from '../../components/postDetail/PostDetail';
import Comments from '../../components/comments/Comments';
import RelatedTags from '../../components/relatedTags/RelatedTags';

import { PostContentProps } from '../../types';

import './PostContent.scss';

const PostContent = ({ post, isLoading }: PostContentProps) => {
  return (
    <main
      className='post-content'
      role='main'
      aria-labelledby='post-content-heading'
    >
      <h1 id='post-content-heading' className='sr-only'>
        Post Content
      </h1>

      <PostDetail isLoading={isLoading} post={post} />
      <RelatedTags isLoading={isLoading} tags={post?.tags} />
      <Comments
        postId={post?._id}
        slug={post?.slug}
        postAuthorId={post?.author._id}
      />
    </main>
  );
};

export default PostContent;
