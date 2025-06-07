import { toast } from 'react-toastify';
import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import parse from 'html-react-parser';

import { PostDescProps } from '../../types';

import './PostDesc.scss';

const PostDesc = ({ post, isLoading }: PostDescProps) => {
  const handleCopy = () => {
    const parsedText = parse(String(post?.desc));
    navigator.clipboard.writeText(parsedText as string);
    toast.success('Copied to clipboard');
    return;
  };

  const parsedDesc = useMemo(() => {
    return parse(String(post?.desc));
  }, [post?.desc]);

  return (
    <div className='post-desc__box'>
      <h2 className='post-desc__box--heading'>
        {isLoading ? <Skeleton /> : post?.title}
      </h2>
      <div className='post-desc__box--desc'>
        <div onDoubleClick={handleCopy}>
          {isLoading ? <Skeleton count={15} /> : parse(String(parsedDesc))}
        </div>
      </div>
    </div>
  );
};

export default PostDesc;
