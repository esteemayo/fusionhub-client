import InfiniteScroll from 'react-infinite-scroll-component';

import Article from '../article/Article';
import Spinner from '../Spinner';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import { ProfileArticlesProps } from '../../types';

import './ProfileArticles.scss';

const ProfileArticles = ({
  posts,
  fetchNextPage,
  hasNextPage,
}: ProfileArticlesProps) => {
  return (
    <div className='profile-articles'>
      {/* {(data ?? [])?.length < 1 && isLoading ? (
        <EmptyMessage
          title='empty replies'
          subtitle='something went wrong!'
          center
        />
      ) : isLoading ? (
        <div className='profile-articles__spinner'>
          <Spinner size={30} />
        </div>
      ) : (
        Array.from(new Array(3)).map((_, index) => {
          return <Article key={index} />;
        })
      )} */}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className='profile-articles__spinner'>
            <Spinner size={30} />
          </div>
        }
        endMessage={<span>All posts loaded</span>}
      >
        {posts.map((post) => {
          return <Article key={post._id} {...post} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default ProfileArticles;
