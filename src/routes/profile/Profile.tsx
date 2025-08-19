import { useEffect, useMemo, useState } from 'react';

import AboutProfile from '../../components/aboutProfile/AboutProfile';
import Spinner from '../../components/Spinner';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import Banner from '../../components/banner/Banner';
import ProfileDetails from '../../components/profileDetails/ProfileDetails';
import ErrorState from '../../components/errorState/ErrorState';
import ProfileFeatures from '../../components/profileFeatures/ProfileFeatures';

import { useQueryParams } from '../../utils';
import { UserType } from '../../types';
import { useProfile } from '../../hooks/useProfile';

import './Profile.scss';

const UserProfile = () => {
  const query = useQueryParams();
  const username = query.get('username');

  const {
    isPending,
    isPendingUser,
    error,
    errorUser,
    data,
    userData,
    refetch,
    refetchUser,
  } = useProfile(username!);

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');
  const [advancement, setAdvancement] = useState(0);
  const [cover, setCover] = useState('');
  const [user, setUser] = useState<UserType | undefined>();

  const isLoading = useMemo(() => {
    return username ? isPendingUser : isPending;
  }, [isPending, isPendingUser, username]);

  const errorObj = useMemo(() => {
    return username ? errorUser : error;
  }, [error, errorUser, username]);

  useEffect(() => {
    if (username) {
      setUser(userData);
      refetchUser();
    } else {
      setUser(data);
      refetch();
    }
  }, [data, refetch, refetchUser, userData, username]);

  console.log({ advancement, cover });
  console.log({ image, progress });

  return (
    <div className='profile'>
      <div className='profile__container'>
        <AccountHeading
          title='Profile'
          subtitle={
            username
              ? `Viewing ${username}'s profile.`
              : 'Manage your details and change your password.'
          }
          type='profile'
        />
      </div>
      <div className='profile__wrapper'>
        {!user && !isLoading ? (
          <ErrorState
            title='Unable to load profile data'
            subtitle='An error occurred while fetching your profile details. Please try again later or contact support if the issue persists.'
            imgSrc='/towing.svg'
            center
          />
        ) : isLoading ? (
          <div className='profile__wrapper--loader'>
            <Spinner size={30} />
          </div>
        ) : errorObj ? (
          <ErrorState
            title='Error loading profile'
            subtitle={`We encountered an issue while fetching your profile details. Please refresh the page or contact support if the problem persists. Error: ${errorObj.message}`}
            imgSrc='/page-eaten.svg'
            center
          />
        ) : user && Object.keys(user).length === 0 ? (
          <ErrorState
            title='Profile data unavailable'
            subtitle='Your profile information appears to be empty. Please update your profile or reach out to support for assistance.'
            center
          />
        ) : (
          <>
            <Banner
              query={username}
              image={user?.image}
              banner={user?.banner}
              setCoverData={setCover}
              setImageData={setImage}
              setCoverProgress={setAdvancement}
              setImageProgress={setProgress}
            />
            <ProfileDetails {...user!} />
            <AboutProfile about={user?.about as string} />
            <ProfileFeatures
              query={username}
              userId={userData?._id as string}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
