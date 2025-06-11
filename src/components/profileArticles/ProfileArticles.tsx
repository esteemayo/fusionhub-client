import InfiniteScroll from 'react-infinite-scroll-component';

import Article from '../article/Article';
import Spinner from '../Spinner';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import { ProfileArticlesProps } from '../../types';

import './ProfileArticles.scss';

const ProfileArticles = ({
  posts,
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
        <div className='profile-articles__spinner'>
          <Spinner size={30} />
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
            <div className='profile-articles__spinner'>
              <Spinner size={30} />
            </div>
          }
          endMessage={
            <span className='profile-articles__message'>
              There are no more articles to display.
            </span>
          }
        >
          {posts.map((post) => {
            return <Article key={post._id} post={post} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProfileArticles;
