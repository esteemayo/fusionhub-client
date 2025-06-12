import { Link } from 'react-router-dom';

import { TopPostProps } from '../../types';
import { formatDate } from '../../utils/formatDate';

import './TopPost.scss';

const TopPost = ({ index, slug, title, tags, createdAt }: TopPostProps) => {
  return (
    <article className='top-post'>
      <div className='top-post__container'>
        <span className='top-post__container--number'>{index + 1}</span>
        <div className='top-post__wrapper'>
          <Link to={`/posts/${slug}`} className='top-post__wrapper--title'>
            <span>{title}</span>
          </Link>
          <div className='top-post__box'>
            <div className='top-post__box--tags'>
              {tags
                .filter((tag) => tag.length < 10)
                .slice(0, 2)
                .map((tag, index) => {
                  return (
                    <Link key={index} to={`/posts?tag=${tag}`}>
                      <span>
                        {tag}
                        {index < tags.slice(0, 2).length - 1 ? ',' : ''}
                      </span>
                    </Link>
                  );
                })}
            </div>
            <span>-</span>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPost;
