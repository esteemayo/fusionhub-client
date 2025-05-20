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
  const { isPending, error, data } = useQuery({
    queryKey: ['tags'],
    queryFn: () => fetchTags(),
  });

  return (
    <section className='tags'>
      <div className='tags__container'>
        <h2 className='tags__container--heading'>Tags</h2>
        {data?.length < 1 ? (
          <span>empty tags</span>
        ) : (
          <div className='tags__wrapper'>
            {isPending ? (
              Array.from(new Array(3)).map((_, index) => {
                return <TagSkeleton key={index} />;
              })
            ) : error ? (
              <div>
                <p>Something went wrong!</p>
                <span>{error.message}</span>
              </div>
            ) : (
              data?.map((tag: TagProps) => {
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
