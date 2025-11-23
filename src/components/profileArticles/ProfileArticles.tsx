import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Article from '../article/Article';
import ProfileSpinner from '../profileSpinner/ProfileSpinner';

import { ProfileArticlesProps } from '../../types';

import './ProfileArticles.scss';

const ProfileArticles = ({
  posts,
  userId,
  activeCardId,
  queryKey,
  title,
  subtitle,
  isLoading,
  hasNextPage,
  error,
  refetch,
  onChangeCardId,
  fetchNextPage,
}: ProfileArticlesProps) => {
  const noPosts = (posts ?? []).length < 1;

  return (
    <div
      className='profile-articles'
      role='region'
      aria-label='User articles'
      aria-busy={isLoading}
      aria-live='polite'
    >
      {noPosts && !isLoading ? (
        <EmptyMessage title={title} subtitle={subtitle} center />
      ) : isLoading ? (
        <div role='status' aria-live='assertive' aria-label='Loading articles'>
          <ProfileSpinner />
        </div>
      ) : error ? (
        <EmptyMessage
          title='Unable to Load Articles'
          subtitle={
            error.message ||
            'There was a problem fetching articles. Please try refreshing the page or check your internet connection.'
          }
          center
        />
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div
              role='status'
              aria-live='assertive'
              aria-label='Loading more articles'
            >
              <ProfileSpinner />
            </div>
          }
          endMessage={null}
        >
          {posts.map((post) => {
            return (
              <Article
                key={post._id}
                post={post}
                userId={userId}
                activeCardId={activeCardId}
                queryKey={queryKey}
                onChangeCardId={onChangeCardId}
                refetch={refetch}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProfileArticles;
