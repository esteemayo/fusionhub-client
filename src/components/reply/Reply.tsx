import { format } from 'timeago.js';
import { useMemo, useState } from 'react';

import Image from '../Image';

import { excerpts } from '../../utils';
import { ReplyProps } from '../../types';

import './Reply.scss';

const Reply = ({ author, content, createdAt }: ReplyProps) => {
  const [readMore, setReadMore] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setReadMore((value) => {
      return !value;
    });
  };

  const contentLabel = useMemo(() => {
    return readMore && content.length > 150 ? content : excerpts(content, 150);
  }, [content, readMore]);

  const btnClasses = useMemo(() => {
    return content.length > 150
      ? 'reply__content--btn show'
      : 'reply__content--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return `Read ${readMore ? 'less' : 'more'}`;
  }, [readMore]);

  return (
    <div className='reply'>
      <div className='reply__author'>
        <Image
          src={author.image ?? '/user-default.jpg'}
          width={40}
          height={40}
          alt='avatar'
          className='reply__author--img'
        />
      </div>
      <div className='reply__content'>
        <div className='reply__content--time'>
          <time dateTime={createdAt}>{format(createdAt)}</time>
        </div>
        <h6 className='reply__content--name'>{author.name}</h6>
        <span className='reply__content--text'>
          {contentLabel}
          <button type='button' className={btnClasses} onClick={handleClick}>
            {btnLabel}
          </button>
        </span>
      </div>
    </div>
  );
};

export default Reply;
