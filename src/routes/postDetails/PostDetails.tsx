import RelatedTags from '../../components/relatedTags/RelatedTags';
import Hero from '../../components/hero/Hero';
import RelatedPosts from '../../components/relatedPosts/RelatedPosts';
import Comments from '../../components/comments/Comments';
import PostMenuButton from '../../components/postMenuButton/PostMenuButton';
import PostDetail from '../../components/postDetail/PostDetail';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postActionMenu/postActionMenuSlice';

import './PostDetails.scss';
import PostActionMenu from '../../components/postActionMenu/PostActionMenu';

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
        <div className='postDetails__container--left'>
          <PostDetail />
          <RelatedTags />
          <Comments />
        </div>
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
