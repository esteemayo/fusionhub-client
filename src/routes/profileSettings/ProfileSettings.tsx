import { useRef, useState } from 'react';

import ProfileImage from '../../components/profileImage/ProfileImage';
import ProfileData from '../../components/profileData/ProfileData';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/imageModal/imageModalSlice';

import './ProfileSettings.scss';

const ProfileSettings = () => {
  const dispatch = useAppDispatch();

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
        <ProfileImage
          ref={inputRef}
          file={file}
          onOpen={handleOpen}
          onChange={handleChange}
          onUpload={handleUpload}
        />
        <hr />
        <ProfileData />
      </div>
    </div>
  );
};

export default ProfileSettings;
