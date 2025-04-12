import { useEffect, useState } from 'react';

import RelatedPosts from '../../components/relatedPosts/RelatedPosts';
import Hero from '../../components/hero/Hero';
import ToggleButton from '../../components/toggleButton/ToggleButton';
import PostContent from '../../components/postContent/PostContent';
import PostMenuActions from '../../components/postMenuActions/PostMenuActions';
import HeroSkeleton from '../../components/heroSkeleton/HeroSkeleton';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postMenuActions/postMenuActionsSlice';

import { postDetail } from '../../data';

import './PostDetails.scss';

const PostDetails = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postMenuActions }));

  const [isLoading, setIsLoading] = useState(true);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div className='post-details'>
      {isLoading ? <HeroSkeleton /> : <Hero />}
      <div className='post-details__container'>
        <PostContent post={postDetail} loading={isLoading} />
        <PostMenuActions isOpen={isOpen} />
        <div className='post-details__container--btn'>
          <ToggleButton label='Filter' isOpen={isOpen} onClick={handleToggle} />
        </div>
      </div>
      <div className='post-details__wrapper'>
        <RelatedPosts />
      </div>
    </div>
  );
};

export default PostDetails;
