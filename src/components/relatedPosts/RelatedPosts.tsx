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

  const noPosts = (data ?? []).length < 1;

  return (
    <section
      className='related-posts'
      role='region'
      aria-labelledby='related-posts-heading'
    >
      <div className='related-posts__container'>
        <h5
          id='related-posts-heading'
          className='related-posts__container--heading'
        >
          Related posts
        </h5>

        <ul className='related-posts__wrapper' role='list' aria-live='polite'>
          {isPending ? (
            <div
              className='related-posts__loader'
              role='status'
              aria-live='polite'
              aria-busy='true'
            >
              {Array.from(Array(4)).map((_, index) => {
                return (
                  <li key={index} role='listitem'>
                    <RelatedSkeleton />
                  </li>
                );
              })}
            </div>
          ) : error ? (
            <EmptyMessage
              title='Oops! Something went wrong while fetching related posts.'
              subtitle={`We encountered an error: ${error.message}. Please try refreshing the page or come back later. If the issue persists, feel free to contact support for assistance.`}
              role='alert'
              aria-live='assertive'
            />
          ) : noPosts ? (
            <EmptyMessage
              title='No related posts found.'
              subtitle='It seems there are no posts related to the current topic. Check back later or explore other topics to find more content.'
              aria-live='polite'
            />
          ) : data?.filter((post) => post._id !== postId).length < 1 ? (
            <EmptyMessage
              title='No related posts available.'
              subtitle="We couldn't find any posts related to this topic at the moment. You can explore other topics or check back later for updates. Thank you for your patience!"
              aria-live='polite'
            />
          ) : (
            data
              ?.filter((post) => post._id !== postId)
              .slice(0, 4)
              .map((post) => {
                return (
                  <li key={post._id} role='listitem'>
                    <RelatedPost {...post} />
                  </li>
                );
              })
          )}
        </ul>
      </div>
    </section>
  );
};

export default RelatedPosts;
