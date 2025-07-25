import { useQuery } from '@tanstack/react-query';

import TagSkeleton from '../tagSkeleton/TagSkeleton';
import TagItem from '../tagItem/TagItem';
import EmptyMessage from '../emptyMessage/EmptyMessage';

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
    queryFn: fetchTags,
  });

  return (
    <section className='tags'>
      <div className='tags__container'>
        <h2 className='tags__container--heading'>Tags</h2>
        {(data ?? [])?.length < 1 && !isPending ? (
          <EmptyMessage
            title='No tags available at the moment.'
            subtitle='Tags help categorize content. Please check back later!'
          />
        ) : (
          <div className='tags__wrapper'>
            {isPending ? (
              Array.from(new Array(3)).map((_, index) => {
                return <TagSkeleton key={index} />;
              })
            ) : error ? (
              <EmptyMessage
                title='Oops! We encountered an issue while loading tags.'
                subtitle={
                  error.message ||
                  'Please try refreshing the page or check back later.'
                }
              />
            ) : (
              data?.map((item) => {
                const { tag, count } = item;
                return <TagItem key={tag} label={tag} count={count} />;
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tags;
