import { useRef } from 'react';

import ProfileImage from '../../components/profileImage/ProfileImage';
import ProfileData from '../../components/profileData/ProfileData';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import './ProfileSettings.scss';

const ProfileSettings = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    inputRef?.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <ProfileImage ref={inputRef} onUpload={handleUpload} />
        <hr />
        <ProfileData onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProfileSettings;
