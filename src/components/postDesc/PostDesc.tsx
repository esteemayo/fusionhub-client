import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

import { PostDescProps } from '../../types';

import './PostDesc.scss';

const PostDesc = ({ post, loading }: PostDescProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(post?.desc);
    toast.success('Copied to clipboard');
    return;
  };

  return (
    <div className='post-desc__box'>
      <h2 className='post-desc__box--heading'>
        {loading ? <Skeleton /> : post?.title}
      </h2>
      <div className='post-desc__box--desc'>
        <p onDoubleClick={handleCopy}>
          {loading ? <Skeleton count={15} /> : post?.desc}
        </p>
      </div>
    </div>
  );
};

export default PostDesc;
