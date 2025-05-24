import { useState } from 'react';

import AboutProfile from '../../components/aboutProfile/AboutProfile';
import Spinner from '../../components/Spinner';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import Banner from '../../components/banner/Banner';
import ProfileDetails from '../../components/profileDetails/ProfileDetails';
import ErrorState from '../../components/errorState/ErrorState';

import { useProfile } from '../../hooks/useProfile';

import './Profile.scss';

const UserProfile = () => {
  const { isPending, error, data } = useProfile();

  const [file, setFile] = useState<File>();
  const [cover, setCover] = useState<File>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setFile(file);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setCover(file);
  };

  return (
    <div className='profile'>
      <div className='profile__container'>
        <AccountHeading
          title='Profile'
          subtitle='Manage your details and change your password.'
          type='profile'
        />
      </div>
      <div className='profile__wrapper'>
        {isPending ? (
          <div className='profile__wrapper--loader'>
            <Spinner size={80} />
          </div>
        ) : error ? (
          <ErrorState
            title='Something went wrong!'
            subtitle={error.message}
            imgSrc='/private-files.svg'
          />
        ) : (
          <>
            <Banner
              file={file}
              cover={cover}
              image={data?.image}
              banner={data?.banner}
              onChangeFile={handleFileChange}
              onChangeCover={handleCoverChange}
            />
            <ProfileDetails {...data!} />
            <AboutProfile about={data?.about as string} />
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
