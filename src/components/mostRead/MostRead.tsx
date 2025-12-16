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

  const hasData = Array.isArray(data) ?? (data ?? []).length > 0;

  return (
    <section
      className='most-read'
      role='region'
      aria-labelledby='most-read-heading'
    >
      <div className='most-read__container'>
        <h2
          id='most-read-heading'
          className='most-read__container--heading'
          tabIndex={-1}
        >
          Most read posts
        </h2>

        {isPending ? (
          Array.from({ length: 3 }).map((_, index) => {
            return <MostReadSkeleton key={index} />;
          })
        ) : error ? (
          <EmptyMessage
            title='Unable to load most read posts'
            subtitle={
              error.message ||
              'An error occurred while fetching most read posts. Please try again later or contact support if the issue persists.'
            }
            role='alert'
          />
        ) : !hasData ? (
          <EmptyMessage
            title='No most read posts available'
            subtitle='Currently, there are no most read posts to display. Please check back later for the latest updates.'
            role='alert'
          />
        ) : (
          hasData && (
            <ul className='most-read__list' role='list'>
              {data?.map((post) => {
                return (
                  <li
                    key={post._id}
                    className='most-read__list--item'
                    role='listitem'
                  >
                    <MostReadItem {...post} onClose={onClose} />
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
    </section>
  );
};

export default MostRead;
