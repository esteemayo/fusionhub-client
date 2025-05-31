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
            <div className='related-posts__empty-message'>
              <p>No related posts found.</p>
              <span>
                It seems there are no posts related to the current topic. Check
                back later or explore other topics to find more content.
              </span>
            </div>
          ) : isPending ? (
            Array.from(Array(3)).map((_, index) => {
              return <RelatedSkeleton key={index} />;
            })
          ) : error ? (
            <div className='related-posts__error-message'>
              <p>Oops! Something went wrong while fetching related posts.</p>
              <span>
                We encountered an error: {error.message}. Please try refreshing
                the page or come back later. If the issue persists, feel free to
                contact support for assistance.
              </span>
            </div>
          ) : data?.filter((post) => post._id !== postId).length < 1 ? (
            <div className='related-posts__empty-message'>
              <p>No related posts available.</p>
              <span>
                We couldn't find any posts related to this topic at the moment.
                You can explore other topics or check back later for updates.
                Thank you for your patience!
              </span>
            </div>
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
