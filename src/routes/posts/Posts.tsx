import PostClient from '../../components/postClient/PostClient';
import Postbar from '../../components/postbar/Postbar';
import PostMenuButton from '../../components/postMenuButton/PostMenuButton';
import PostItems from '../../components/postItems/PostItems';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postsMenu/postsMenuSlice';

import './Posts.scss';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postsMenu }));

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  return (
    <div className='posts'>
      <div className='posts__container'>
        <Postbar />
        <div className='posts__wrapper'>
          <div className='posts__box'>
            <PostClient isOpen={isOpen} />
            <PostItems />
          </div>
        </div>
        <div className='posts__btn'>
          <PostMenuButton isOpen={isOpen} onClick={handleToggle} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
