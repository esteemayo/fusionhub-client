import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
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
  const { isPending, error, data } = useQuery<PostType[]>({
    queryKey: ['relatedPosts'],
    queryFn: () => fetchRelatedPosts(tags),
    enabled: !!tags,
  });

  return (
    <section className='related-posts'>
      <div className='related-posts__container'>
        <h5 className='related-posts__container--heading'>Related posts</h5>
        <div className='related-posts__container--wrapper'>
          {(data ?? [])?.length < 1 && !isPending ? (
            <EmptyMessage
              title='No related posts found.'
              subtitle='It seems there are no posts related to the current topic. Check back later or explore other topics to find more content.'
            />
          ) : isPending ? (
            Array.from(Array(4)).map((_, index) => {
              return <RelatedSkeleton key={index} />;
            })
          ) : error ? (
            <EmptyMessage
              title='Oops! Something went wrong while fetching related posts.'
              subtitle={`We encountered an error: ${error.message}. Please try refreshing the page or come back later. If the issue persists, feel free to contact support for assistance.`}
            />
          ) : data?.filter((post) => post._id !== postId).length < 1 ? (
            <EmptyMessage
              title='No related posts available.'
              subtitle="We couldn't find any posts related to this topic at the moment. You can explore other topics or check back later for updates. Thank you for your patience!"
            />
          ) : (
            data
              ?.filter((post) => post._id !== postId)
              .slice(0, 4)
              .map((post) => {
                return <RelatedPost key={post._id} {...post} />;
              })
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
