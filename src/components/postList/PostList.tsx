import ErrorState from '../errorState/ErrorState';
import Card from '../card/Card';
import PostListSkeleton from '../postListSkeleton/PostListSkeleton';

import { PostListProps } from '../../types';

import './PostList.scss';

const PostLists = ({ isLoading, error, posts }: PostListProps) => {
  return (
    <div className='post-list'>
      {isLoading ? (
        Array.from(new Array(3)).map((_, index) => {
          return <PostListSkeleton key={index} />;
        })
      ) : error ? (
        <ErrorState
          title='Unable to load posts'
          subtitle={
            error.message
              ? `We couldn't fetch the posts at this time. Error: ${error.message}. Please check your internet connection or try again later.`
              : "We couldn't fetch the posts at this time. Please check your internet connection or try again later."
          }
          imgSrc='/private-files.svg'
        />
      ) : (
        posts?.map((post) => {
          return <Card key={post._id} {...post} />;
        })
      )}
    </div>
  );
};

export default PostLists;
