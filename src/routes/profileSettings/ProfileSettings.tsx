import React, { useRef, useState } from 'react';

import ProfileImage from '../../components/profileImage/ProfileImage';
import ProfileData from '../../components/profileData/ProfileData';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import './ProfileSettings.scss';

const ProfileSettings = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setFile(file);
  };

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
        <ProfileImage
          ref={inputRef}
          file={file}
          onChange={handleChange}
          onUpload={handleUpload}
        />
        <hr />
        <ProfileData onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProfileSettings;
