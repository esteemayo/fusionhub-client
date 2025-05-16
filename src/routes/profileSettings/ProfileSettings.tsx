import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProfileImage from '../../components/profileImage/ProfileImage';
import ErrorState from '../../components/errorState/ErrorState';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import ProfileData from '../../components/profileData/ProfileData';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/imageModal/imageModalSlice';

import { getCurrentUser } from '../../services/userService';

import './ProfileSettings.scss';

const fetchUser = async () => {
  const { data } = await getCurrentUser();
  return data;
};

const ProfileSettings = () => {
  const dispatch = useAppDispatch();

  const { isPending, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });

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
        {isPending ? (
          <span>loading...</span>
        ) : error ? (
          <ErrorState
            title='Something went wrong!'
            subtitle={error.message}
            imgSrc='/private-files.svg'
          />
        ) : (
          <>
            <ProfileImage
              name={data.name}
              bio={data.bio}
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
