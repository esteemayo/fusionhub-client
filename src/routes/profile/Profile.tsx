import AccountHeading from '../../components/accountHeading/AccountHeading';
import Banner from '../../components/banner/Banner';
import ProfileDetails from '../../components/profileDetails/ProfileDetails';

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
        <div className='profile__about'>
          <h4 className='profile__about--heading'>About me</h4>
          <p className='profile__about--text'>
            I'm a Full-stack Developer based in United State of America. I
            specialize in Frontend Developement, UX/UI design, brand strategy,
            and Webflow development. I'm always striving to grow and learn
            something new and i don't take myself too seriously.
          </p>
          <p className='profile__about--text'>
            I'm passionate about helping startups grow, improve their customer
            experience, and to raise venture capital through good design.
          </p>
          <button type='button' className='profile__about--btn'>
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
