import { useRef } from 'react';

import PostClient from '../../components/postClient/PostClient';
import Postbar from '../../components/postbar/Postbar';
import ToggleButton from '../../components/toggleButton/ToggleButton';
import PostItems from '../../components/postItems/PostItems';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postsMenu/postsMenuSlice';

import './Posts.scss';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postsMenu }));

  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.focus();
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  return (
    <div className='posts'>
      <div className='posts__container'>
        <Postbar onClick={handleClick} />
        <div className='posts__wrapper'>
          <div className='posts__box'>
            <PostClient isOpen={isOpen} ref={ref} />
            <PostItems />
          </div>
        </div>
        <div className='posts__btn'>
          <ToggleButton label='Filter' isOpen={isOpen} onClick={handleToggle} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
