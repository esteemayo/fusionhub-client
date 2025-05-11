import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import AccountHeading from '../../components/accountHeading/AccountHeading';
import Banner from '../../components/banner/Banner';
import ProfileDetails from '../../components/profileDetails/ProfileDetails';
import AboutProfile from '../../components/aboutProfile/AboutProfile';

import { getCurrentUser } from '../../services/userService';

import './Profile.scss';

const fetchUser = async () => {
  const { data } = await getCurrentUser();
  return data;
};

const UserProfile = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });

  console.log(data);

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
        <ProfileDetails {...data} />
        <AboutProfile about={data.about} />
      </div>
    </div>
  );
};

export default UserProfile;
