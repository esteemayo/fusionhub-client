import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import PostClient from '../../components/postClient/PostClient';
import Postbar from '../../components/postbar/Postbar';
import ToggleButton from '../../components/toggleButton/ToggleButton';
import PostItems from '../../components/postItems/PostItems';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postsMenu/postsMenuSlice';

import { PostsType } from '../../types';
import { getPosts } from '../../services/postService';

import './Posts.scss';

const fetchPosts = async () => {
  const { data } = await getPosts();
  return data;
};

const Posts = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postsMenu }));

  const { isPending, error, data } = useQuery<PostsType>({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });

  const posts = data ? data.posts : [];

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
            <PostItems posts={posts} isLoading={isPending} error={error} />
            <div className='posts__box--btn'>
              <ToggleButton
                label='Filter'
                isOpen={isOpen}
                onClick={handleToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
