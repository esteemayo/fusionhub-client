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
            <span>
              {(error as { message: string })?.message ||
                'Something went wrong!'}
            </span>
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
