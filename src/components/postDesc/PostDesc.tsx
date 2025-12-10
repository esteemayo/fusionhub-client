import { toast } from 'react-toastify';
import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import parse from 'html-react-parser';

import { PostDescProps } from '../../types';

import './PostDesc.scss';

const PostDesc = ({ post, isLoading }: PostDescProps) => {
  const parsedDesc = useMemo(
    () => parse(String(post?.desc)).toString(),
    [post?.desc]
  );

  const handleCopy = () => {
    let children = null;
    const parsedElement = parse(parsedDesc);

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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy();
    }
  };

  return (
    <article
      className='post-desc__box'
      aria-label='Post description section'
      aria-labelledby='post-desc-title'
    >
      <h2 id='post-desc-title' className='post-desc__box--heading'>
        {isLoading ? <Skeleton /> : post?.title}
      </h2>

      <section className='post-desc__box--desc' aria-label='Post content'>
        <div
          onDoubleClick={handleCopy}
          onKeyDown={handleKeyDown}
          className='post-desc__box--interactive'
          role='button'
          tabIndex={0}
          aria-label='Double tap or press Enter to copy content'
        >
          {isLoading ? <Skeleton count={15} /> : parse(parsedDesc)}
        </div>

        <div className='sr-only' aria-live='polite' aria-atomic='true' />
      </section>
    </article>
  );
};

export default PostDesc;
