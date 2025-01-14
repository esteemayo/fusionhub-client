import './UserProfile.scss';

const UserProfile = () => {
  return (
    <div className='userProfile'>
      <div className='userProfile__container'>
        <div className='userProfile__header'>
          <h1 className='userProfile__header--heading'>Profile</h1>
          <span className='userProfile__header--text'>
            Manage your details and change your password.
          </span>
        </div>
      </div>
      <div className='userProfile__wrapper'>
        <div className='userProfile__banner'>
          &nbsp;
          <div className='userProfile__user'>
            <img
              src='/user-1.jpeg'
              width={120}
              height={120}
              alt='avatar'
              className='userProfile__user--avatar'
            />
          </div>
        </div>
        <div className='userProfile__box'>
          <h3 className='userProfile__username'>Elise beverley</h3>
          <div className='userProfile__wrap'>
            <span className='userProfile__wrap--username'>@ebeverley25</span>
            <span className='userProfile__wrap--dot'>•</span>
            <span className='userProfile__wrap--email'>
              beverle25y@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
