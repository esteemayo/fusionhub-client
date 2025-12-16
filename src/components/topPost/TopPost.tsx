import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { TopPostProps } from '../../types';
import { formatDate } from '../../utils/formatDate';

import './TopPost.scss';

const TopPost = ({
  index,
  slug,
  title,
  tags,
  createdAt,
  onClose,
}: TopPostProps) => {
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
    const shortTags = tags.filter((tag) => tag.length <= 10).slice(0, 2);

    if (shortTags.length > 0) {
      return shortTags;
    }

    const longTag = tags.find((tag) => tag.length > 10);
    return longTag ? [longTag] : [];
  }, [tags]);

  const lastIndex = filteredTags.length - 1;

  return (
    <article
      className='top-post'
      role='article'
      aria-labelledby={`top-post-title-${index}`}
    >
      <div className='top-post__container'>
        <span
          className='top-post__container--number'
          aria-label={`Rank ${index + 1}`}
        >
          {index + 1}
        </span>

        <div className='top-post__wrapper'>
          <Link
            id={`top-post-title-${index}`}
            to={`/post/${slug}`}
            onClick={onClose}
            className='top-post__wrapper--title'
            aria-describedby={`top-post-meta-${index}`}
          >
            <span>{title}</span>
          </Link>

          <div id={`top-post-meta-${index}`} className='top-post__box'>
            <div className='top-post__box--tags'>
              {filteredTags.map((tag, tagIndex) => {
                return (
                  <button
                    key={tagIndex}
                    type='button'
                    onClick={() => handleTagChange(tag)}
                    className='top-post__box--btn'
                    aria-label={`Filter posts by tag ${tag}`}
                  >
                    {tag.concat(tagIndex < lastIndex ? ',' : '')}
                  </button>
                );
              })}
            </div>

            <span aria-hidden='true'>-</span>

            <time
              dateTime={createdAt}
              aria-label={`Published on ${formatDate(createdAt)}`}
            >
              {formatDate(createdAt)}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPost;
