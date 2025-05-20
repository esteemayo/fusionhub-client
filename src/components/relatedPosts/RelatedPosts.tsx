import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import RelatedPost from '../relatedPost/RelatedPost';
import RelatedSkeleton from '../relatedSkeleton/RelatedSkeleton';

import { PostType, RelatedPostsProps } from '../../types';
import { getRelatedPosts } from '../../services/postService';

import './RelatedPosts.scss';

const fetchRelatedPosts = async (tags: Array<string>) => {
  const { data } = await getRelatedPosts(tags);
  return data;
};

const RelatedPosts = ({ postId, tags }: RelatedPostsProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['relatedPosts'],
    queryFn: () => fetchRelatedPosts(tags),
    enabled: !!tags,
  });

  const isPost = useMemo(() => {
    return data.some((post: PostType) => post._id === postId);
  }, [data, postId]);

  return (
    <section className='related-posts'>
      <div className='related-posts__container'>
        <h5 className='related-posts__container--heading'>Related posts</h5>
        <div className='related-posts__container--wrapper'>
          {data.length < 1 || isPost ? (
            <span>empty related posts</span>
          ) : isPending ? (
            Array.from(Array(3)).map((_, index) => {
              return <RelatedSkeleton key={index} />;
            })
          ) : error ? (
            <div>
              <p>Something went wrong!</p>
              <span>{error.message}</span>
            </div>
          ) : (
            data
              .filter((post: PostType) => post._id !== postId)
              .slice(0, 4)
              .map((post: PostType) => {
                return <RelatedPost key={post._id} {...post} />;
              })
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
