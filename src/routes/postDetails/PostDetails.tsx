import Comments from '../../components/comments/Comments';
import Hero from '../../components/hero/Hero';
import PostDetail from '../../components/postDetail/PostDetail';
import Follow from '../../components/follow/Follow';
import RelatedTags from '../../components/relatedTags/RelatedTags';
import Categories from '../../components/categories/Categories';

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
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
