import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Spinner from '../Spinner';
import ProfileReply from '../profileReply/ProfileReply';

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
          title='empty replies'
          subtitle='something went wrong!'
          center
        />
      ) : isLoading ? (
        <div className='profile-replies__spinner'>
          <Spinner size={30} />
        </div>
      ) : error ? (
        <EmptyMessage
          title='Unable to load replies'
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
          loader={
            <div className='profile-replies__spinner'>
              <Spinner size={30} />
            </div>
          }
          endMessage={
            <span className='profile-replies__message'>
              There are no more replies to display.
            </span>
          }
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
