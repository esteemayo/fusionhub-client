import { Link } from 'react-router-dom';

import Image from '../Image';

import { CommentUserImageProps } from '../../types';

import './CommentUserImage.scss';

const CommentUserImage = ({ id, url, src }: CommentUserImageProps) => {
  return (
    <Link key={id} to={url} className='comment-user-image'>
      <Image
        src={src ?? '/user-default.jpg'}
        width={50}
        height={50}
        alt='avatar'
        className='comment-user-image__img'
      />
    </Link>
  );
};

export default CommentUserImage;
