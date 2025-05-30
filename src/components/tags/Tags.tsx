import { useQuery } from '@tanstack/react-query';

import TagItem from '../tagItem/TagItem';
import TagSkeleton from '../tagSkeleton/TagSkeleton';

import { TagProps } from '../../types';
import { getTags } from '../../services/postService';

import './Tags.scss';

const fetchTags = async () => {
  const { data } = await getTags();
  return data;
};

const Tags = () => {
  const { isPending, error, data } = useQuery<TagProps[]>({
    queryKey: ['tags'],
    queryFn: () => fetchTags(),
  });

  return (
    <section className='tags'>
      <div className='tags__container'>
        <h2 className='tags__container--heading'>Tags</h2>
        {(data ?? [])?.length < 1 ? (
          <div className='tags__empty'>
            <p>No tags available at the moment.</p>
            <span>Tags help categorize content. Please check back later!</span>
          </div>
        ) : (
          <div className='tags__wrapper'>
            {isPending ? (
              Array.from(new Array(3)).map((_, index) => {
                return <TagSkeleton key={index} />;
              })
            ) : error ? (
              <div className='tags__error'>
                <p>Oops! We encountered an issue while loading tags.</p>
                <span>
                  {error.message ||
                    'Please try refreshing the page or check back later.'}
                </span>
              </div>
            ) : (
              data?.map((tag) => {
                const { _id: id, count } = tag;
                return <TagItem key={id} label={id} count={count} />;
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tags;
