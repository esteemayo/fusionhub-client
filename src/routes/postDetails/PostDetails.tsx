import RelatedPosts from '../../components/relatedPosts/RelatedPosts';
import Hero from '../../components/hero/Hero';
import ToggleButton from '../../components/toggleButton/ToggleButton';
import PostContent from '../../components/postContent/PostContent';
import PostMenuActions from '../../components/postMenuActions/PostMenuActions';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postMenuActions/postMenuActionsSlice';

import './PostDetails.scss';

const PostDetails = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postMenuActions }));

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  return (
    <div className='postDetails'>
      <Hero />
      <div className='postDetails__container'>
        <PostContent />
        <PostMenuActions isOpen={isOpen} />
        <div className='postDetails__container--btn'>
          <ToggleButton label='Filter' isOpen={isOpen} onClick={handleToggle} />
        </div>
      </div>
      <div className='postDetails__wrapper'>
        <RelatedPosts />
      </div>
    </div>
  );
};

export default PostDetails;
