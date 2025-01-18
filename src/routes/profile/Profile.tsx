import AccountHeading from '../../components/accountHeading/AccountHeading';
import Banner from '../../components/banner/Banner';
import ProfileDetails from '../../components/profileDetails/ProfileDetails';
import AboutProfile from '../../components/aboutProfile/AboutProfile';

import './Profile.scss';

const UserProfile = () => {
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
        <Banner />
        <ProfileDetails />
        <AboutProfile />
      </div>
    </div>
  );
};

export default UserProfile;
