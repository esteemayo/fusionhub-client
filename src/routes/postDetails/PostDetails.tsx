import PostDetail from '../../components/postDetail/PostDetail';
import Hero from '../../components/hero/Hero';
import RelatedTags from '../../components/relatedTags/RelatedTags';

import './PostDetails.scss';

const PostDetails = () => {
  return (
    <div className='postDetails'>
      <Hero />
      <div className='postDetails__container'>
        <div className='postDetails__container--left'>
          <PostDetail />
          <RelatedTags />
        </div>
        <div className='postDetails__container--right'>PostDetails Right</div>
      </div>
    </div>
  );
};

export default PostDetails;
