import Card from '../card/Card';

import { PostListProps } from '../../types';

import './PostList.scss';

const PostLists = ({ posts }: PostListProps) => {
  return (
    <div className='postList'>
      {posts.map((post) => {
        return <Card key={post.id} {...post} />;
      })}
    </div>
  );
};

export default PostLists;
