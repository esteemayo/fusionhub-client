import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import ProfileItem from '../profileItem/ProfileItem';
import ProfileSpinner from '../profileSpinner/ProfileSpinner';

import { ProfileRepliesProps } from '../../types';

import './ProfileReplies.scss';

const ProfileReplies = ({
  replies,
  isLoading,
  hasNextPage,
  error,
  fetchNextPage,
}: ProfileRepliesProps) => {
  const noReplies = (replies ?? []).length < 1;

  return (
    <div
      className='profile-replies'
      role='region'
      aria-label='User replies'
      aria-busy={isLoading}
      aria-live='polite'
    >
      {isLoading ? (
        <div role='status' aria-live='assertive' aria-label='Loading replies'>
          <ProfileSpinner />
        </div>
      ) : error ? (
        <EmptyMessage
          title='Unable to Load Replies'
          subtitle={
            error.message ||
            'There was a problem fetching replies. Please try refreshing the page or check your internet connection.'
          }
          center
        />
      ) : noReplies ? (
        <EmptyMessage
          title='No Replies Yet'
          subtitle='You haven’t replied to any posts yet. Once you start engaging in conversations, your replies will appear here. Explore posts and join the discussion to see your activity!'
          center
        />
      ) : (
        <InfiniteScroll
          dataLength={replies.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div
              role='status'
              aria-live='assertive'
              aria-label='Loading more replies'
            >
              <ProfileSpinner />
            </div>
          }
          endMessage={null}
        >
          {replies.map((reply) => {
            return <ProfileItem key={reply._id} type='reply' {...reply} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProfileReplies;
