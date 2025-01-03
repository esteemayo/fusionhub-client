import RelatedPosts from '../../components/relatedPosts/RelatedPosts';
import Hero from '../../components/hero/Hero';
import PostMenuButton from '../../components/postMenuButton/PostMenuButton';
import PostContent from '../../components/postContent/PostContent';
import PostActionMenu from '../../components/postActionMenu/PostActionMenu';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postActionMenu/postActionMenuSlice';

import './PostDetails.scss';

const PostDetails = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postActionMenu }));

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  return (
    <div className='postDetails'>
      <Hero />
      <div className='postDetails__container'>
        <PostContent />
        <PostActionMenu isOpen={isOpen} />
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
