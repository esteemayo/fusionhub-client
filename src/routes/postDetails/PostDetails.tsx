import PostDetail from '../../components/postDetail/PostDetail';
import Hero from '../../components/hero/Hero';
import RelatedTags from '../../components/relatedTags/RelatedTags';
import Comments from '../../components/comments/Comments';

import Search from './search/Search';

import './PostDetails.scss';

const PostDetails = () => {
  return (
    <div className='postDetails'>
      <Hero />
      <div className='postDetails__container'>
        <div className='postDetails__container--left'>
          <PostDetail />
          <RelatedTags />
          <Comments />
        </div>
        <div className='postDetails__container--right'>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
