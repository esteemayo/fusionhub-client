import { EmptyPostsProps } from '../../types';

import './EmptyPosts.scss';

const EmptyPosts = ({ title, subtitle }: EmptyPostsProps) => {
  return (
    <div className='empty-posts' role='status' aria-live='polite'>
      <h2 className='empty-posts__heading' aria-label={title}>
        {title}
      </h2>
      <p className='empty-posts__texts'>{subtitle}</p>
    </div>
  );
};

export default EmptyPosts;
