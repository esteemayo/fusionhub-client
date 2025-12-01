import { useSearchParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import PostClient from '../../components/postClient/PostClient';
import Postbar from '../../components/postbar/Postbar';
import ToggleButton from '../../components/toggleButton/ToggleButton';
import PostItems from '../../components/postItems/PostItems';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onToggle } from '../../features/postsMenu/postsMenuSlice';

import { PostsType } from '../../types';
import { getPosts } from '../../services/postService';

import './Posts.scss';

const fetchPosts = async (page: number, searchParams: URLSearchParams) => {
  const { data } = await getPosts(page, searchParams);
  return data;
};

const Posts = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postsMenu }));

  const { isFetching, error, fetchNextPage, hasNextPage, data } =
    useInfiniteQuery<PostsType>({
      queryKey: ['posts', searchParams.toString()],
      queryFn: ({ pageParam = 1 }) =>
        fetchPosts(pageParam as number, searchParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
      enabled: !!searchParams,
    });

  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!ref.current) return;
    ref.current.focus();
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onToggle());
  };

  const allPosts = useMemo(
    () => data?.pages.flatMap((page) => page.posts) || [],
    [data]
  );

  return (
    <div className='posts'>
      <div className='posts__container'>
        <Postbar onClick={handleClick} />
        <div className='posts__wrapper'>
          <div className='posts__box'>
            <PostClient isOpen={isOpen} ref={ref} />
            <PostItems
              posts={allPosts}
              isLoading={isFetching}
              error={error}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
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
