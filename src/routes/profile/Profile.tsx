import AccountHeading from '../../components/accountHeading/AccountHeading';

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
        <div className='profile__banner'>
          &nbsp;
          <div className='profile__user'>
            <img
              src='/user-1.jpeg'
              width={120}
              height={120}
              alt='avatar'
              className='profile__user--avatar'
            />
          </div>
          <div className='profile__image'>
            <label htmlFor='file' className='profile__image--label'>
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
                  d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
                />
              </svg>
            </label>
            <input type='file' id='file' className='profile__image--input' />
          </div>
        </div>
        <div className='profile__box'>
          <div>
            <h3 className='profile__username'>Elise beverley</h3>
            <div className='profile__wrap'>
              <div className='profile__wrap--username'>
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
                    d='M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25'
                  />
                </svg>
                <span>ebeverley25</span>
              </div>
              <span className='profile__wrap--dot'>•</span>
              <div className='profile__wrap--email'>
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
                    d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                  />
                </svg>
                <span>beverley25@gmail.com</span>
              </div>
            </div>
          </div>
          <div className='profile__cover'>
            <span className='profile__cover--bio'>
              Full-stack JavaScript Developer (React, NextJS, VueJS, NodeJS,
              GraphQL, HTML5, CSS3)
            </span>
          </div>
          <div className='profile__package'>
            <div className='profile__tank'>
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
            <div className='profile__tank'>
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
            <div className='profile__tank'>
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
