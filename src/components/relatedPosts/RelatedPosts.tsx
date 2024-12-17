import RelatedPost from '../relatedPost/RelatedPost';

import './RelatedPosts.scss';

const RelatedPosts = () => {
  return (
    <section className='relatedPosts'>
      <div className='relatedPosts__container'>
        <h5 className='relatedPosts__container--heading'>Related posts</h5>
        <div className='relatedPosts__wrapper'>
          <RelatedPost />
          <RelatedPost />
          <RelatedPost />
          <RelatedPost />
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
