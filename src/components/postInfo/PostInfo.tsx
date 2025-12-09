import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import UserOutlinedIcon from '../icons/UserOutlinedIcon';
import ClockOutlinedIcon from '../icons/ClockOutlinedIcon';

import { PostInfoProps } from '../../types';
import { useDate } from '../../hooks/useDate';

import './PostInfo.scss';

const PostInfo = ({
  username,
  authorId,
  currentUser,
  createdAt,
}: PostInfoProps) => {
  const { formattedDate } = useDate(createdAt);

  const url = useMemo(
    () =>
      currentUser
        ? authorId === currentUser.details._id
          ? `/accounts/profile`
          : `/accounts/profile?username=${username}`
        : `/posts?author=${username}`,
    [authorId, currentUser, username]
  );

  return (
    <div className='post-info' role='group'>
      <div className='post-info__username'>
        <UserOutlinedIcon />
        <Link to={url} aria-label={`View ${username}'s profile`}>
          <span>{username}</span>
        </Link>
      </div>

      <div className='post-info__date'>
        <ClockOutlinedIcon />
        <time dateTime={createdAt} aria-label={`Posted on ${formattedDate}`}>
          {formattedDate}
        </time>
      </div>
    </div>
  );
};

export default PostInfo;
