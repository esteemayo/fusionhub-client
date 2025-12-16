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

  const noPosts = (posts ?? []).length < 1;
  const hasPosts = Array.isArray(posts) ?? posts.length > 0;

  return (
    <section
      className='post-items'
      role='region'
      aria-labelledby='posts-section-title'
    >
      <h2 id='posts-section-title' className='sr-only'>
        Posts list
      </h2>

      {noPosts && !isLoading ? (
        searchQuery ? (
          <ErrorState
            title='No posts found'
            subtitle={`We couldn't find any matches for "${searchQuery}"`}
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
            Array.from({ length: 3 }).map((_, index) => {
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
              loader={
                isLoading &&
                !!hasNextPage &&
                Array.from({ length: 3 }).map((_, index) => {
                  return <CardSkeleton key={index} />;
                })
              }
              endMessage={
                <span
                  className='post-items__container--message'
                  role='status'
                  aria-live='polite'
                  tabIndex={0}
                >
                  You've reached the end! <br />
                  You've seen all available posts. Check back later for new
                  content.
                </span>
              }
            >
              {hasPosts && (
                <ul className='post-items__list' role='list'>
                  {posts.map((post) => {
                    return (
                      <li
                        key={post._id}
                        className='post-items__list-item'
                        role='listitem'
                      >
                        <Card {...post} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </InfiniteScroll>
          )}
        </div>
      )}
    </section>
  );
};

export default PostItems;
