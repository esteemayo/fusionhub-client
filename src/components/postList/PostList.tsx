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
          title='Something went wrong!'
          subtitle={error.message}
          imgSrc='/private-files.svg'
        />
      ) : (
        posts.map((post) => {
          return <Card key={post.id} {...post} />;
        })
      )}
    </div>
  );
};

export default PostLists;
