import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Header from '../header/Header';
import HeaderSkeleton from '../headerSkeleton/HeaderSkeleton';

import { RandomPostType } from '../../types';
import { getRandomPosts } from '../../services/postService';

import './HeaderClient.scss';

const fetchRandomPosts = async () => {
  const { data } = await getRandomPosts();
  return data;
};

const HeaderClient = () => {
  const { isPending, error, data } = useQuery<RandomPostType[]>({
    queryKey: ['randomPosts'],
    queryFn: () => fetchRandomPosts(),
  });

  return (
    <div className='header-client'>
      {(data ?? [])?.length < 1 && !isPending ? (
        <div className='header-client__container'>
          <div className='header-client__wrapper'>
            <EmptyMessage
              title='No Posts Available'
              subtitle='There are currently no posts to display. Please check back later or try refreshing the page.'
              center
            />
          </div>
        </div>
      ) : isPending ? (
        <HeaderSkeleton />
      ) : error ? (
        <div className='header-client__container'>
          <div className='header-client__wrapper'>
            <EmptyMessage
              title='Oops! Unable to load posts.'
              subtitle={
                typeof error === 'object' && error && 'message' in error
                  ? (error as { message: string }).message
                  : 'An unexpected error occurred while fetching posts. Please try refreshing the page or check your internet connection.'
              }
              center
            />
          </div>
        </div>
      ) : (
        <Header posts={data} />
      )}
    </div>
  );
};

export default HeaderClient;
