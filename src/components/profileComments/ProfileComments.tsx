import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Spinner from '../Spinner';
import ProfileComment from '../profileComment/ProfileComment';

import { ProfileCommentsProps } from '../../types';

import './ProfileComments.scss';

const ProfileComments = ({
  comments,
  isLoading,
  hasNextPage,
  error,
  fetchNextPage,
}: ProfileCommentsProps) => {
  return (
    <div className='profile-comments'>
      {(comments ?? [])?.length < 1 && !isLoading ? (
        <EmptyMessage
          title='empty replies'
          subtitle='something went wrong!'
          center
        />
      ) : isLoading ? (
        <div className='profile-comments__spinner'>
          <Spinner size={30} />
        </div>
      ) : error ? (
        <EmptyMessage
          title='Unable to load articles'
          subtitle={
            error.message ||
            'There was a problem fetching articles. Please try refreshing the page or check your internet connection.'
          }
          center
        />
      ) : (
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className='profile-comments__spinner'>
              <Spinner size={30} />
            </div>
          }
          endMessage={
            <span className='profile-comments__message'>
              There are no more comments to display.
            </span>
          }
        >
          {comments.map((comment) => {
            return <ProfileComment key={comment._id} {...comment} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProfileComments;
