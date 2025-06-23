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
          title='No Replies Yet'
          subtitle='You haven’t replied to any posts yet. Once you start engaging in conversations, your replies will appear here. Explore posts and join the discussion to see your activity!'
          center
        />
      ) : isLoading ? (
        <div className='profile-replies__spinner'>
          <Spinner size={30} />
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
            null
            // <div className='profile-replies__end-message'>
            //   <span
            //     className='profile-replies__icon'
            //     role='img'
            //     aria-label='End of replies'
            //   >
            //     🎉
            //   </span>
            //   <span className='profile-replies__message'>
            //     You’ve reached the end!
            //     <br />
            //     There are no more replies to show. Keep engaging with posts to
            //     see your future replies here.
            //   </span>
            // </div>
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
