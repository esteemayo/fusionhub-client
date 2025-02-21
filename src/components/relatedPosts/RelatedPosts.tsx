import RelatedPost from '../relatedPost/RelatedPost';

import { relatedPosts } from '../../data';

import './RelatedPosts.scss';

const RelatedPosts = () => {
  return (
    <section className='related-posts'>
      <div className='related-posts__container'>
        <h5 className='related-posts__container--heading'>Related posts</h5>
        <div className='related-posts__wrapper'>
          {relatedPosts.slice(0, 4).map((post) => {
            return <RelatedPost key={post.id} {...post} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
