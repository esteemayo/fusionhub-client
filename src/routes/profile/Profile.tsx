import { useState } from 'react';

import AccountHeading from '../../components/accountHeading/AccountHeading';
import Banner from '../../components/banner/Banner';
import ProfileDetails from '../../components/profileDetails/ProfileDetails';
import AboutProfile from '../../components/aboutProfile/AboutProfile';

import './Profile.scss';

const UserProfile = () => {
  const [file, setFile] = useState<File>();
  const [banner, setBanner] = useState<File>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setFile(file);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setBanner(file);
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
        <Banner
          file={file}
          banner={banner}
          onChangeFile={handleFileChange}
          onChangeBanner={handleBannerChange}
        />
        <ProfileDetails />
        <AboutProfile />
      </div>
    </div>
  );
};

export default UserProfile;
