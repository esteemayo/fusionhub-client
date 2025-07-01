import InfiniteScroll from 'react-infinite-scroll-component';

import ProfileComment from '../profileComment/ProfileComment';
import EmptyMessage from '../emptyMessage/EmptyMessage';
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
  return (
    <div className='profile-comments'>
      {(comments ?? [])?.length < 1 && !isLoading ? (
        <EmptyMessage
          title='No Comments Yet'
          subtitle="It looks like there aren't any comments here yet. Be the first to start the conversation or check back later to see what others are saying."
          center
        />
      ) : isLoading ? (
        <ProfileSpinner />
      ) : error ? (
        <EmptyMessage
          title='Unable to Load Comments'
          subtitle={
            error.message ||
            'We encountered a problem while fetching comments. Please check your internet connection or try refreshing the page.'
          }
          center
        />
      ) : (
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<ProfileSpinner />}
          endMessage={
            null
            // <span className='profile-comments__message'>
            //   🎉 You've reached the end of the comments. Thanks for reading and
            //   engaging! If you have something to add, feel free to leave a
            //   comment.
            // </span>
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
