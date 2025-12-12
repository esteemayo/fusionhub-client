import { EmptyPostsProps } from '../../types';

import './EmptyPosts.scss';

const EmptyPosts = ({ title, subtitle }: EmptyPostsProps) => {
  return (
    <div
      className='empty-posts'
      role='status'
      aria-live='polite'
      aria-atomic='true'
    >
      <h2 className='empty-posts__heading' aria-label={title} tabIndex={0}>
        {title}
      </h2>

      <p className='empty-posts__texts' aria-label={subtitle} tabIndex={0}>
        {subtitle}
      </p>
    </div>
  );
};

export default EmptyPosts;
