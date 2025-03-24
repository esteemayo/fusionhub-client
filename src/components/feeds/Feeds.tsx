import { useEffect, useState } from 'react';

import Feed from '../feed/Feed';
import FeedSkeleton from '../feedSkeleton/FeedSkeleton';

import { feedItems } from '../../data';

import './Feeds.scss';

const Feeds = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <section className='feeds'>
      <div className='feeds__container'>
        <h2 className='feeds__container-heading'>Feeds</h2>
        {isLoading
          ? Array.from(Array(3)).map((_, index) => {
              return <FeedSkeleton key={index} />;
            })
          : feedItems.map((feed) => {
              return <Feed key={feed.id} {...feed} />;
            })}
      </div>
    </section>
  );
};

export default Feeds;
