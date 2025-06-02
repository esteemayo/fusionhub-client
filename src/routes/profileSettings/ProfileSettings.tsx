import { useRef, useState } from 'react';

import ProfileData from '../../components/profileData/ProfileData';
import Spinner from '../../components/Spinner';
import ProfileImage from '../../components/profileImage/ProfileImage';
import ErrorState from '../../components/errorState/ErrorState';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { useProfile } from '../../hooks/useProfile';
import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/imageModal/imageModalSlice';

import './ProfileSettings.scss';

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const { isPending, error, data } = useProfile();

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onOpen());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setFile(file);
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    inputRef?.current?.click();
  };

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
        {!data && !isPending ? (
          <ErrorState
            title='No profile data available'
            subtitle='It seems we couldn’t find any profile information to display. Please ensure your account is set up correctly or try refreshing the page. If the issue persists, contact support for assistance.'
            imgSrc='/towing.svg'
            center
          />
        ) : isPending ? (
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
        ) : (
          <>
            <ProfileImage
              name={data?.name as string}
              bio={data?.bio as string}
              image={data?.image}
              ref={inputRef}
              file={file}
              onOpen={handleOpen}
              onChange={handleChange}
              onUpload={handleUpload}
            />
            <hr />
            <ProfileData {...data} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
