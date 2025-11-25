import { useMemo, useState } from 'react';

import UserAvatar from '../UserAvatar';
import Badge from '../badge/Badge';
import CameraIcon from '../icons/CameraIcon';

import Upload from '../upload/Upload';
import UploadProgressCircle from '../uploadProgressCircle/UploadProgressCircle';

import { excerpts } from '../../utils';
import { ProfileImageProps } from '../../types';

import './ProfileImage.scss';

const ProfileImage = ({
  name,
  bio,
  image,
  isFromGoogle,
  progress,
  role,
  inputRef,
  onChangeImage,
  onChangeProgress,
  onOpen,
  onUpload,
}: ProfileImageProps) => {
  const [isMore, setIsMore] = useState(false);

  const handleCollapse = () => {
    if (!isMore) return;
    setIsMore(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsMore((value) => {
      return !value;
    });
  };

  const formattedTexts = useMemo(
    () => (isMore && bio?.length > 120 ? bio : excerpts(bio, 120)),
    [bio, isMore]
  );

  const btnClasses = useMemo(
    () =>
      bio?.length > 120
        ? 'profile-image__details--btn show'
        : 'profile-image__details--btn hide',
    [bio]
  );

  const isDisabled = progress > 0 && progress < 100;
  const btnLabel = isMore ? undefined : 'more';
  const isGoogleImage = isFromGoogle && image?.startsWith('https');

  return (
    <div className='profile-image'>
      <div className='profile-image__container'>
        <div className='profile-image__user'>
          <div className='profile-image__image'>
            <UserAvatar
              imgSrc={image}
              size={120}
              isGoogleAvatar={!!isGoogleImage}
              className='profile-image__image--avatar'
            />
            {isDisabled && (
              <div
                className='profile-image__progress'
                role='status'
                aria-label={`Uploading image, ${progress}% completed`}
              >
                <UploadProgressCircle progress={progress} />
              </div>
            )}
            <div className='profile-image__upload'>
              <Upload
                id='avatar'
                ref={inputRef}
                disabled={isDisabled}
                setData={onChangeImage}
                setProgress={onChangeProgress}
              >
                <button
                  type='button'
                  className='profile-image__upload--btn'
                  aria-label='Upload a new profile image'
                  disabled={isDisabled}
                >
                  <CameraIcon />
                </button>
              </Upload>
            </div>
          </div>
          <div className='profile-image__details'>
            <div className='profile-image__details--info'>
              <span className='profile-image__details--name'>{name}</span>
              <Badge role={role} />
            </div>
            <p
              onClick={handleCollapse}
              className='profile-image__details--bio'
              aria-label='User biography'
            >
              {formattedTexts}
              <button
                type='button'
                onClick={handleClick}
                aria-label={btnLabel}
                className={btnClasses}
              >
                {btnLabel}
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className='profile-image__buttons'>
        <button
          type='button'
          onClick={onUpload}
          disabled={isDisabled}
          className='profile-image__buttons--upload'
          aria-label='Upload a new profile image'
          aria-disabled={isDisabled}
        >
          Upload
        </button>
        <button
          type='button'
          onClick={onOpen}
          disabled={isDisabled}
          className='profile-image__buttons--remove'
          aria-label='Remove profile image'
          aria-disabled={isDisabled}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
