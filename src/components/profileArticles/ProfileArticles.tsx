import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Article from '../article/Article';
import ProfileSpinner from '../profileSpinner/ProfileSpinner';

import { ProfileArticlesProps } from '../../types';

import './ProfileArticles.scss';

const ProfileArticles = ({
  posts,
  userId,
  queryKey,
  title,
  subtitle,
  isLoading,
  hasNextPage,
  error,
  fetchNextPage,
}: ProfileArticlesProps) => {
  return (
    <div className='profile-articles'>
      {(posts ?? [])?.length < 1 && !isLoading ? (
        <EmptyMessage title={title} subtitle={subtitle} center />
      ) : isLoading ? (
        <ProfileSpinner />
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
          loader={<ProfileSpinner />}
          endMessage={
            null
            // <span className='profile-articles__message'>
            //   There are no more articles to display.
            // </span>
          }
        >
          {posts.map((post) => {
            return (
              <Article
                key={post._id}
                post={post}
                userId={userId}
                queryKey={queryKey}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProfileArticles;
