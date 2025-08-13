import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import ProfileReply from '../profileReply/ProfileReply';
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
  return (
    <div className='profile-replies'>
      {(replies ?? [])?.length < 1 && !isLoading ? (
        <EmptyMessage
          title='No Replies Yet'
          subtitle='You haven’t replied to any posts yet. Once you start engaging in conversations, your replies will appear here. Explore posts and join the discussion to see your activity!'
          center
        />
      ) : isLoading ? (
        <ProfileSpinner />
      ) : error ? (
        <EmptyMessage
          title='Unable to Load Replies'
          subtitle={
            error.message ||
            'There was a problem fetching replies. Please try refreshing the page or check your internet connection.'
          }
          center
        />
      ) : (
        <InfiniteScroll
          dataLength={replies.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<ProfileSpinner />}
          endMessage={null}
        >
          {replies.map((reply) => {
            return <ProfileReply key={reply._id} {...reply} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProfileReplies;
