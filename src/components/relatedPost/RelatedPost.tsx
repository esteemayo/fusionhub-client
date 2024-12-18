import { Link } from 'react-router-dom';

import './RelatedPost.scss';

const RelatedPost = () => {
  return (
    <article className='relatedPost'>
      <div className='relatedPost__container'>
        <img
          src='/post-1.jpg'
          width={250}
          height={150}
          alt='image'
          className='relatedPost__container--img'
        />
        <div className='relatedPost__container--footer'>
          <Link to='#'>
            What chelsea fans absolutely loved about Pedro Neto's performance
          </Link>
          <div className='relatedPost__container--footer-category'>
            <span>The chelsea chronicle</span>
            <time dateTime=''>43 mins ago</time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RelatedPost;
