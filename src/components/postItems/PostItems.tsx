import InfiniteScroll from 'react-infinite-scroll-component';

import ErrorState from '../errorState/ErrorState';
import Card from '../card/Card';
import CardSkeleton from '../cardSkeleton/CardSkeleton';

import { PostItemsProps } from '../../types';
import { useQueryParams } from '../../utils';

import './PostItems.scss';

const PostItems = ({
  posts,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
}: PostItemsProps) => {
  const query = useQueryParams();
  const searchQuery = query.get('search');

  return (
    <section className='post-items'>
      {(posts ?? [])?.length < 1 && !isLoading ? (
        searchQuery ? (
          <ErrorState
            title='No posts found'
            subtitle={`We couldn't find any matches for ${searchQuery}`}
            imgSrc='/under-construction.svg'
            center
          />
        ) : (
          <ErrorState
            title='No posts available'
            subtitle='It seems there are no posts to display at the moment. Please check back later or try refreshing the page.'
            imgSrc='/under-construction.svg'
            center
          />
        )
      ) : (
        <div className='post-items__container'>
          {isLoading ? (
            Array.from(Array(3)).map((_, index) => {
              return <CardSkeleton key={index} />;
            })
          ) : error ? (
            <ErrorState
              title='Error loading posts'
              subtitle={
                error.message ||
                'We encountered an issue while trying to load the posts. Please check your internet connection or try again later.'
              }
              imgSrc='/towing.svg'
              center
            />
          ) : (
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={Array.from(Array(3)).map((_, index) => {
                return <CardSkeleton key={index} />;
              })}
              endMessage={
                <span className='post-items__container--message'>
                  You've reached the end! <br />
                  You've seen all available posts. Check back later for new
                  content.
                </span>
              }
            >
              {posts?.map((post) => {
                return <Card key={post._id} {...post} />;
              })}
            </InfiniteScroll>
          )}
        </div>
      )}
    </section>
  );
};

export default PostItems;
