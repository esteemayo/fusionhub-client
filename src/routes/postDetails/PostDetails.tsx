import Hero from '../../components/hero/Hero';

import './PostDetails.scss';

const PostDetails = () => {
  return (
    <div className='postDetails'>
      <Hero />
      <div className='postDetails__container'>
        <div className='postDetails__container--left'>PostDetails Left</div>
        <div className='postDetails__container--right'>PostDetails Right</div>
      </div>
    </div>
  );
};

export default PostDetails;
