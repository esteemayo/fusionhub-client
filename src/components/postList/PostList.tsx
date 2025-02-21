import Card from '../card/Card';

import { PostListProps } from '../../types';

import './PostList.scss';

const PostLists = ({ posts }: PostListProps) => {
  return (
    <div className='post-list'>
      {posts.map((post) => {
        return <Card key={post.id} {...post} />;
      })}
    </div>
  );
};

export default PostLists;
