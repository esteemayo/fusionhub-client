import { Link } from 'react-router-dom';

import './TopPost.scss';

const TopPost = () => {
  return (
    <article className='topPost'>
      <div className='topPost__container'>
        <span className='topPost__container--number'>1</span>
        <div className='topPost__wrapper'>
          <span className='topPost__wrapper--title'>
            <Link to={`/posts/slug`}>
              Omnis velit exercitationem soluta nam nemo!
            </Link>
          </span>
          <div className='topPost__wrapper--category'>
            <span>Food, Travel</span>
            <span>-</span>
            <span>DEC 18, 2024</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPost;
