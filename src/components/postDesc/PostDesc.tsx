import { toast } from 'react-toastify';
import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import parse from 'html-react-parser';

import { PostDescProps } from '../../types';

import './PostDesc.scss';

const PostDesc = ({ post, isLoading }: PostDescProps) => {
  const handleCopy = () => {
    const parsedText = parse(String(post?.desc)).toString();
    const parsedElement = parse(parsedText);

    let children = null;

    if (Array.isArray(parsedElement)) {
      children = parsedElement.map(
        (child: React.ReactElement<{ children?: React.ReactNode }>) =>
          child.props?.children
      );
    } else if (
      parsedElement &&
      typeof parsedElement === 'object' &&
      'props' in parsedElement
    ) {
      children = parsedElement.props.children;
    }

    navigator.clipboard.writeText(children as string);
    toast.success('Copied to clipboard', { role: 'alert' });
    return;
  };

  const parsedDesc = useMemo(
    () => parse(String(post?.desc)).toString(),
    [post?.desc]
  );

  return (
    <div className='post-desc__box'>
      <h2 className='post-desc__box--heading'>
        {isLoading ? <Skeleton /> : post?.title}
      </h2>

      <div className='post-desc__box--desc'>
        <div onDoubleClick={handleCopy}>
          {isLoading ? <Skeleton count={15} /> : parse(parsedDesc)}
        </div>
      </div>
    </div>
  );
};

export default PostDesc;
