import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import MostReadItem from '../mostReadItem/MostReadItem';
import MostReadSkeleton from '../mostReadSkeleton/MostReadSkeleton';

import { getMostReadPosts } from '../../services/postService';
import { MostReadPostType, MostReadProps } from '../../types';

import './MostRead.scss';

const fetchMostReadPosts = async () => {
  const { data } = await getMostReadPosts();
  return data;
};

const MostRead = ({ onClose }: MostReadProps) => {
  const { isPending, error, data } = useQuery<MostReadPostType | undefined>({
    queryKey: ['mostReadPosts'],
    queryFn: fetchMostReadPosts,
  });

  return (
    <section className='most-read'>
      <div className='most-read__container'>
        <h2 className='most-read__container--heading'>Most read posts</h2>
        {(data ?? [])?.length < 1 && !isPending ? (
          <EmptyMessage
            title='No most read posts available'
            subtitle='Currently, there are no most read posts to display. Please check back later for the latest updates.'
          />
        ) : isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <MostReadSkeleton key={index} />;
          })
        ) : error ? (
          <EmptyMessage
            title='Unable to load most read posts'
            subtitle={
              error.message ||
              'An error occurred while fetching most read posts. Please try again later or contact support if the issue persists.'
            }
          />
        ) : (
          data?.map((post) => {
            return <MostReadItem key={post._id} {...post} onClose={onClose} />;
          })
        )}
      </div>
    </section>
  );
};

export default MostRead;
