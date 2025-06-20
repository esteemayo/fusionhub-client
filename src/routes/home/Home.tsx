import { useQuery } from '@tanstack/react-query';

import RecentPosts from '../../components/recentPosts/RecentPosts';
import Header from '../../components/header/Header';
import SearchClient from '../../components/searchClient/SearchClient';
import Features from '../../components/features/Features';
import HeaderSkeleton from '../../components/headerSkeleton/HeaderSkeleton';

import { PostType } from '../../types';
import { getRandomPosts } from '../../services/postService';

import './Home.scss';

const fetchRandomPosts = async () => {
  const { data } = await getRandomPosts();
  return data;
};

const Home = () => {
  const { isPending, error, data } = useQuery<PostType[] | undefined>({
    queryKey: ['randomPosts'],
    queryFn: () => fetchRandomPosts(),
  });

  return (
    <div className='home'>
      <div className='home__container'>
        {(data ?? [])?.length < 1 && !isPending ? null : isPending ? (
          error ? (
            <div className='home__error'>
              <h2>Oops! Unable to load posts.</h2>
              <p>
                {typeof error === 'object' && error && 'message' in error
                  ? (error as { message: string }).message
                  : 'An unexpected error occurred while fetching posts. Please try refreshing the page or check your internet connection.'}
              </p>
            </div>
          ) : (
            <HeaderSkeleton />
          )
        ) : (
          <Header posts={data} />
        )}
        <SearchClient />
        <Features />
        <RecentPosts />
      </div>
    </div>
  );
};

export default Home;
