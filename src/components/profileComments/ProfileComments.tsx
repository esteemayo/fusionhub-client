import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import ProfileItem from '../profileItem/ProfileItem';
import ProfileSpinner from '../profileSpinner/ProfileSpinner';

import { ProfileCommentsProps } from '../../types';

import './ProfileComments.scss';

const ProfileComments = ({
  comments,
  isLoading,
  hasNextPage,
  error,
  fetchNextPage,
}: ProfileCommentsProps) => {
  const noComments = (comments ?? []).length < 1;

  return (
    <div
      className='profile-comments'
      role='region'
      aria-label='User comments'
      aria-busy={isLoading}
      aria-live='polite'
    >
      {isLoading ? (
        <div role='status' aria-live='assertive' aria-label='Loading comments'>
          <ProfileSpinner />
        </div>
      ) : error ? (
        <EmptyMessage
          title='Unable to Load Comments'
          subtitle={
            error.message ||
            'We encountered a problem while fetching comments. Please check your internet connection or try refreshing the page.'
          }
          center
        />
      ) : noComments ? (
        <EmptyMessage
          title='No Comments Yet'
          subtitle="It looks like there aren't any comments here yet. Be the first to start the conversation or check back later to see what others are saying."
          center
        />
      ) : (
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div
              role='status'
              aria-live='assertive'
              aria-label='Loading more comments'
            >
              <ProfileSpinner />
            </div>
          }
          endMessage={null}
        >
          {comments.map((comment) => {
            return (
              <ProfileItem key={comment._id} type='comment' {...comment} />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProfileComments;
