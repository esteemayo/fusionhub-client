import PostDescription from './../postDescription/PostDescription';
import PostDetailAction from '../postDetailAction/PostDetailAction';

import { PostDetailType } from '../../types';

import './PostDetail.scss';

const PostDetail = ({ post }: { post: PostDetailType }) => {
  return (
    <section className='post-detail'>
      <PostDetailAction post={post} />
      <PostDescription post={post} />
    </section>
  );
};

export default PostDetail;
