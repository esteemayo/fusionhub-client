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
    <div className='post-details'>
      <Hero />
      <div className='post-details__container'>
        <PostContent />
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
