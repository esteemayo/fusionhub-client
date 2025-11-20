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
  ref,
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

  const isDisabled = useMemo(() => {
    return 0 < progress && progress < 100;
  }, [progress]);

  const formattedTexts = useMemo(() => {
    return isMore && bio?.length > 120 ? bio : excerpts(bio, 120);
  }, [bio, isMore]);

  const btnClasses = useMemo(() => {
    return bio?.length > 120
      ? 'profile-image__details--btn show'
      : 'profile-image__details--btn hide';
  }, [bio]);

  const btnLabel = useMemo(() => {
    return isMore ? undefined : 'more';
  }, [isMore]);

  const isGoogleImage = isFromGoogle && image?.startsWith('https');

  return (
    <div className='profile-image'>
      <div className='profile-image__container'>
        <div className='profile-image__user'>
          <div className='profile-image__image'>
            <UserAvatar
              imgSrc={image}
              size={120}
              isGoogleAvatar={isGoogleImage}
              className='profile-image__image--avatar'
            />
            {0 < progress && progress < 100 && (
              <div
                aria-label={`Uploading ${progress}`}
                className='profile-image__progress'
              >
                <UploadProgressCircle progress={progress} />
              </div>
            )}
            <div className='profile-image__upload'>
              <Upload
                ref={ref}
                disabled={isDisabled}
                setData={onChangeImage}
                setProgress={onChangeProgress}
              >
                <button
                  type='button'
                  aria-label='Upload image'
                  className='profile-image__upload--btn'
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
            <span
              onClick={handleCollapse}
              aria-label={formattedTexts}
              className='profile-image__details--bio'
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
            </span>
          </div>
        </div>
      </div>
      <div className='profile-image__buttons'>
        <button
          type='button'
          onClick={onUpload}
          disabled={isDisabled}
          aria-label='Upload image'
          aria-disabled={isDisabled}
          className='profile-image__buttons--upload'
        >
          Upload
        </button>
        <button
          type='button'
          onClick={onOpen}
          disabled={isDisabled}
          aria-label='Remove image'
          aria-disabled={isDisabled}
          className='profile-image__buttons--remove'
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
