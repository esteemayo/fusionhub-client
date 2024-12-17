import Comments from '../../components/comments/Comments';
import Hero from '../../components/hero/Hero';
import PostDetail from '../../components/postDetail/PostDetail';
import Tags from '../../components/tags/Tags';
import Categories from '../../components/categories/Categories';
import Feeds from '../../components/feeds/Feeds';
import RelatedTags from '../../components/relatedTags/RelatedTags';
import Follow from '../../components/follow/Follow';

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
          <Follow />
          <Categories />
          <Feeds />
          <Tags />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
