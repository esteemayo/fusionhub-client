import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import type { UploadResponse } from 'imagekit-javascript/dist/src/interfaces/UploadResponse';

import AboutProfile from '../../components/aboutProfile/AboutProfile';
import Spinner from '../../components/Spinner';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import Banner from '../../components/banner/Banner';
import ProfileDetails from '../../components/profileDetails/ProfileDetails';
import ErrorState from '../../components/errorState/ErrorState';
import ProfileFeatures from '../../components/profileFeatures/ProfileFeatures';

import { useProfile } from '../../hooks/useProfile';
import { useAppDispatch } from '../../hooks/hooks';
import { updateUserData } from '../../features/auth/authSlice';

import { UserType } from '../../types';
import { useQueryParams } from '../../utils';

import './Profile.scss';

const UserProfile = () => {
  const dispatch = useAppDispatch();

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

  const [user, setUser] = useState<UserType | undefined>();
  const [isShow, setIsShow] = useState(false);
  const [cover, setCover] = useState<UploadResponse | undefined>();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<UploadResponse | undefined>();
  const [advancement, setAdvancement] = useState(0);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsShow((value) => {
      return !value;
    });
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;

    if (!target.classList.contains('banner-menu-list-item__btn')) {
      handleClose();
    }
  };

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

  useEffect(() => {
    if (!image && progress !== 100) return;

    if (image && progress === 100) {
      const payload = {
        image: image.filePath,
      };

      dispatch(updateUserData(payload))
        .then(() => {
          toast.success('Profile image updated successfully!');
          refetch();
        })
        .catch(() => {
          toast.error('Failed to update profile image. Please try again.');
        })
        .finally(() => {
          setProgress(0);
          setImage(undefined);
        });
    }
  }, [dispatch, image, progress, refetch]);

  useEffect(() => {
    if (!cover && advancement !== 100) return;

    if (cover && advancement === 100) {
      const payload = {
        banner: cover.filePath,
      };

      dispatch(updateUserData(payload))
        .then(() => {
          toast.success('Banner updated successfully!');
          refetch();
        })
        .catch(() => {
          toast.error('Failed to update banner. Please try again.');
        })
        .finally(() => {
          setAdvancement(0);
          setCover(undefined);
        });
    }
  }, [advancement, cover, dispatch, refetch]);

  return (
    <div onClick={handleClick} className='profile'>
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
              username={user?.username as string}
              image={user?.image}
              banner={user?.banner}
              isShow={isShow}
              isFromGoogle={user?.fromGoogle}
              progress={progress}
              advancement={advancement}
              onChangeCoverData={setCover}
              onChangeImageData={setImage}
              onChangeCoverProgress={setAdvancement}
              onChangeImageProgress={setProgress}
              onClose={handleClose}
              onToggle={handleToggle}
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
