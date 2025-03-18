import Card from '../card/Card';
import PostListSkeleton from '../postListSkeleton/PostListSkeleton';

import { PostListProps } from '../../types';

import './PostList.scss';

const PostLists = ({ posts, loading }: PostListProps) => {
  return (
    <div className='post-list'>
      {loading
        ? Array.from(new Array(3)).map((_, index) => {
            return <PostListSkeleton key={index} />;
          })
        : posts.map((post) => {
            return <Card key={post.id} {...post} />;
          })}
    </div>
  );
};

export default PostLists;
