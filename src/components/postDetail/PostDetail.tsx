import PostDescription from './../postDescription/PostDescription';
import PostDetailAction from '../postDetailAction/PostDetailAction';

import './PostDetail.scss';

const PostDetail = () => {
  return (
    <section className='post-detail'>
      <PostDetailAction />
      <PostDescription />
    </section>
  );
};

export default PostDetail;
