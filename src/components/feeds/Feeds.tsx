import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

import { feedItems } from '../../data';

import './Feeds.scss';

const Feeds = () => {
  return (
    <aside className='feeds'>
      <div className='feeds__container'>
        <h2 className='feeds__container-heading'>Feeds</h2>
        {feedItems.map((feed) => {
          return (
            <article key={feed.id} className='feeds__card'>
              <div className='feeds__card-wrapper'>
                {feed.img && (
                  <img
                    src={feed.img}
                    alt='image'
                    width={80}
                    height={80}
                    className='feeds__card-wrapper--img'
                  />
                )}
              </div>
              <div className='feeds__card-box'>
                <h3 className='feeds__card-box--title'>
                  <Link to='/posts/test'>{feed.title}</Link>
                </h3>
                <time
                  dateTime={feed.createdAt}
                  className='feeds__card-box--date'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                  <span>{format(feed.createdAt)}</span>
                </time>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
};

export default Feeds;
