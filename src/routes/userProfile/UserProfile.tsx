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
          <div>
            <h3 className='userProfile__username'>Elise beverley</h3>
            <div className='userProfile__wrap'>
              <span className='userProfile__wrap--username'>@ebeverley25</span>
              <span className='userProfile__wrap--dot'>•</span>
              <span className='userProfile__wrap--email'>
                beverle25y@gmail.com
              </span>
            </div>
          </div>
          <div className='userProfile__cover'>
            <span className='userProfile__cover--bio'>
              Full-stack JavaScript Developer (React, NextJS, VueJS, NodeJS,
              GraphQL, HTML5, CSS3)
            </span>
          </div>
          <div className='userProfile__package'>
            <div className='userProfile__tank'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                />
              </svg>
              <span>Canada</span>
            </div>
            <div className='userProfile__tank'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 2a7 7 0 0 1 7 7c0 3.866-3.582 7-7 7s-7-3.134-7-7a7 7 0 0 1 7-7Zm0 0v14m0 0c-1.657 0-3 1.343-3 3h6c0-1.657-1.343-3-3-3Z'
                />
              </svg>
              <span>Born January 14, 2025</span>
            </div>
            <div className='userProfile__tank'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                />
              </svg>
              <span>Joined January 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
