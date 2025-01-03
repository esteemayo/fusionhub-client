import { useState } from 'react';

import Comments from '../../components/comments/Comments';
import Hero from '../../components/hero/Hero';
import PostDetail from '../../components/postDetail/PostDetail';
import Tags from '../../components/tags/Tags';
import RelatedPosts from '../../components/relatedPosts/RelatedPosts';

import Feeds from '../../components/feeds/Feeds';
import RelatedTags from '../../components/relatedTags/RelatedTags';
import Follow from '../../components/follow/Follow';
import PostMenuButton from '../../components/postMenuButton/PostMenuButton';
import Categories from '../../components/categories/Categories';

import Search from './search/Search';

import './PostDetails.scss';

const PostDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((value) => {
      return !value;
    });
  };

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
        <div className='postDetails__container--btn'>
          <PostMenuButton isOpen={isOpen} onClick={handleToggle} />
        </div>
      </div>
      <div className='postDetails__wrapper'>
        <RelatedPosts />
      </div>
    </div>
  );
};

export default PostDetails;
