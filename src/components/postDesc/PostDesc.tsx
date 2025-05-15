import { toast } from 'react-toastify';
import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import parse from 'html-react-parser';

import { PostDescProps } from '../../types';

import './PostDesc.scss';

const PostDesc = ({ post, loading }: PostDescProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(post?.desc);
    toast.success('Copied to clipboard');
    return;
  };

  const parsedDesc = useMemo(() => {
    return parse(String(post?.desc));
  }, [post?.desc]);

  return (
    <div className='post-desc__box'>
      <h2 className='post-desc__box--heading'>
        {loading ? <Skeleton /> : post?.title}
      </h2>
      <div className='post-desc__box--desc'>
        <div onDoubleClick={handleCopy}>
          {loading ? <Skeleton count={15} /> : parse(String(parsedDesc))}
        </div>
      </div>
    </div>
  );
};

export default PostDesc;
