import { Link } from 'react-router-dom';

import Image from '../Image';
import { CommentUserImageProps } from '../../types';

import './CommentUserImage.scss';

const CommentUserImage = ({ url, src, username }: CommentUserImageProps) => {
  return (
    <Link
      to={url}
      className='comment-user-image'
      aria-label={`View profile of user ${username}`}
    >
      <Image
        src={src ?? '/user-default.jpg'}
        width={50}
        height={50}
        alt={`Profile picture of user ${username}`}
        className='comment-user-image__img'
      />
    </Link>
  );
};

export default CommentUserImage;
