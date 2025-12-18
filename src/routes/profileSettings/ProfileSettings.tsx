import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import type { UploadResponse } from 'imagekit-javascript/dist/src/interfaces/UploadResponse';
import { Value } from 'react-phone-number-input';

import ProfileData from '../../components/profileData/ProfileData';
import Spinner from '../../components/Spinner';
import ProfileImage from '../../components/profileImage/ProfileImage';
import ErrorState from '../../components/errorState/ErrorState';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { useAppDispatch } from '../../hooks/hooks';
import { useProfile } from '../../hooks/useProfile';

import { updateUserData } from '../../features/auth/authSlice';
import { onOpen } from '../../features/imageModal/imageModalSlice';

import { CountrySelectType, RoleType } from '../../types';

import './ProfileSettings.scss';

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const { isPending, error, data, refetch } = useProfile();

  const inputRef = useRef<HTMLInputElement>(null);

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<UploadResponse | undefined>();

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onOpen());
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (progress > 0 && progress < 100) return;
    inputRef?.current?.click();
  };

  useEffect(() => {
    if (!image && progress !== 100) return;

    const payload = {
      image: image?.filePath,
    };

    dispatch(updateUserData(payload))
      .then(() => {
        toast.success('Profile image updated successfully!');
        refetch();
      })
      .catch(() => {
        toast.error('Failed to update profile image. Please try again later.');
      })
      .finally(() => {
        setProgress(0);
        setImage(undefined);
      });
  }, [dispatch, image, progress, refetch]);

  return (
    <div className='profile-settings'>
      <div className='profile-settings__container'>
        <AccountHeading
          title='Profile settings'
          subtitle='Update your account information'
          type='profile'
        />
      </div>

      <div className='profile-settings__wrapper'>
        {isPending ? (
          <div className='profile-settings__wrapper--loader'>
            <Spinner size={40} />
          </div>
        ) : error ? (
          <ErrorState
            title='Unable to load profile settings'
            subtitle={`We encountered an error while fetching your profile data. Please try refreshing the page or contact support if the issue persists. Error details: ${error.message}`}
            imgSrc='/private-files.svg'
            center
          />
        ) : !data ? (
          <ErrorState
            title='No profile data available'
            subtitle='It seems we couldn’t find any profile information to display. Please ensure your account is set up correctly or try refreshing the page. If the issue persists, contact support for assistance.'
            imgSrc='/towing.svg'
            center
          />
        ) : (
          <>
            <ProfileImage
              name={data?.name ?? ''}
              bio={data?.bio ?? ''}
              image={data?.image}
              isFromGoogle={!!data?.fromGoogle}
              progress={progress}
              role={data?.role as RoleType}
              inputRef={inputRef}
              onChangeImage={setImage}
              onChangeProgress={setProgress}
              onOpen={handleOpen}
              onUpload={handleUpload}
            />

            <hr aria-hidden='true' />

            <ProfileData
              name={data?.name ?? ''}
              email={data?.email ?? ''}
              username={data?.username ?? ''}
              phone={data?.phone as Value}
              dateOfBirth={
                (data?.dateOfBirth as unknown as Date | null) ?? null
              }
              country={data?.country as unknown as CountrySelectType}
              bio={data?.bio ?? ''}
              about={data?.about}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
