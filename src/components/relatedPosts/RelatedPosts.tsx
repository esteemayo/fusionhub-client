import RelatedPost from '../relatedPost/RelatedPost';

import { relatedPosts } from '../../data';

import './RelatedPosts.scss';

const RelatedPosts = () => {
  return (
    <section className='relatedPosts'>
      <div className='relatedPosts__container'>
        <h5 className='relatedPosts__container--heading'>Related posts</h5>
        <div className='relatedPosts__wrapper'>
          {relatedPosts.map((post) => {
            return <RelatedPost key={post.id} {...post} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
