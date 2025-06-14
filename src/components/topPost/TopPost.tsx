import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { TopPostProps } from '../../types';
import { formatDate } from '../../utils/formatDate';

import './TopPost.scss';

const TopPost = ({ index, slug, title, tags, createdAt }: TopPostProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTagChange = (tag: string) => {
    if (searchParams.get('tag') !== tag) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        tag,
      });
    }
  };

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => tag.length < 10).slice(0, 2);
  }, [tags]);

  const lastIndex = useMemo(() => {
    return filteredTags.length - 1;
  }, [filteredTags.length]);

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
              {filteredTags.map((tag, index) => {
                return (
                  <a
                    key={index}
                    onClick={() => handleTagChange(tag)}
                    className='top-post__box--link'
                  >
                    <span>
                      {tag}
                      {index < lastIndex ? ',' : ''}
                    </span>
                  </a>
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
