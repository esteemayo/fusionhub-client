import { useQuery } from '@tanstack/react-query';

import TagSkeleton from '../tagSkeleton/TagSkeleton';
import TagItem from '../tagItem/TagItem';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import { TagProps, TagsProps } from '../../types';
import { getTags } from '../../services/postService';

import './Tags.scss';

const fetchTags = async () => {
  const { data } = await getTags();
  return data;
};

const Tags = ({ onClose }: TagsProps) => {
  const { isPending, error, data } = useQuery<TagProps[]>({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  const noTags = (data ?? []).length < 1;

  return (
    <section
      className='tags'
      role='region'
      aria-labelledby='tags-heading'
      aria-busy={isPending}
    >
      <div className='tags__container'>
        <h2 id='tags-heading' className='tags__container--heading'>
          Tags
        </h2>

        <ul className='tags__wrapper' role='list'>
          {isPending ? (
            Array.from(new Array(3)).map((_, index) => {
              return (
                <li key={index} role='listitem'>
                  <TagSkeleton />
                </li>
              );
            })
          ) : error ? (
            <EmptyMessage
              title='Oops! We encountered an issue while loading tags.'
              subtitle={
                error.message ||
                'Please try refreshing the page or check back later.'
              }
              role='alert'
            />
          ) : noTags ? (
            <EmptyMessage
              title='No tags available at the moment.'
              subtitle='Tags help categorize content. Please check back later!'
              role='status'
            />
          ) : (
            data?.map((item) => {
              const { tag, count } = item;
              return (
                <li key={tag} role='listitem'>
                  <TagItem label={tag} count={count} onClose={onClose} />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </section>
  );
};

export default Tags;
