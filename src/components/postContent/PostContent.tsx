import PostDetail from '../../components/postDetail/PostDetail';
import Comments from '../../components/comments/Comments';
import RelatedTags from '../../components/relatedTags/RelatedTags';

import './PostContent.scss';

const PostContent = () => {
  return (
    <div className='postContent'>
      <PostDetail />
      <RelatedTags />
      <Comments />
    </div>
  );
};

export default PostContent;
