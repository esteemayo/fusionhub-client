import { useMemo } from 'react';

import Badge from '../badge/Badge';

import { useAppSelector } from '../../hooks/hooks';
import { ProfileDetailsProps } from '../../types';
import { formatDate } from '../../utils/formatDate';

import './ProfileDetails.scss';

const ProfileDetails = ({
  _id: userId,
  name,
  email,
  username,
  bio,
  country,
  dateOfBirth,
  role,
  createdAt,
}: ProfileDetailsProps) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const formattedDateOfBirth = useMemo(() => {
    if (dateOfBirth) {
      if (currentUser?.details._id === userId) {
        return formatDate(dateOfBirth as string);
      }

      return new Date(dateOfBirth as string).toLocaleString('en-us', {
        month: 'short',
        day: 'numeric',
      });
    }
  }, [currentUser, dateOfBirth, userId]);

  const dateRegistered = useMemo(() => {
    const formattedDate = new Date(createdAt).toLocaleString('en-us', {
      month: 'long',
      year: 'numeric',
    });

    return formattedDate;
  }, [createdAt]);

  return (
    <section className='profile-details'>
      <div className='profile-details__container'>
        <div className='profile-details__user'>
          <h3 className='profile-details__user--name'>{name}</h3>
          <Badge role={role} />
        </div>
        <div className='profile-details__wrapper'>
          <div className='profile-details__wrapper--username'>
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
            <span>{username}</span>
          </div>
          <span className='profile-details__wrapper--dot'>•</span>
          <div className='profile-details__wrapper--email'>
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
            <span>{email}</span>
          </div>
        </div>
      </div>
      <div className='profile-details__box'>
        <span className='profile-details__box--bio'>{bio}</span>
      </div>
      <div className='profile-details__wrap'>
        <div className='profile-details__wrap--box'>
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
          <span>{country}</span>
        </div>
        {dateOfBirth && (
          <div className='profile-details__wrap--box'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 400 400'
              stroke='currentColor'
              width='800'
              height='800'
            >
              <path
                d='M149.16 81.999c21.928-23.51 64.493-23.51 90.987-9.226 15.255 8.225 27.863 19.016 36.854 34.023 11.792 19.681 16.618 37.904 12.093 60.552C264.771 289.147 110 256.561 110 147.743c0-20.778 5.161-39.455 21.882-52.478m42.872 190.252c18.557-2.4 46.598-5.046 59.358-3.371m4.046 7.493c-6.105 13.174-4.345 28.673-9.443 41.82m-8.093 4.119c-11.866-.684-23.287 1.348-35.075 1.348m-14.84-47.287c5.085 14.583 14.839 28.688 14.839 44.518'
                stroke='currentColor'
                stroke-opacity='.9'
                stroke-width='16'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M234.423 237.025c11.297 13.465-5.009 41.371-22.617 33.792-17.02-7.33-6.096-26.51 6.958-27.965m-107.416-77.325c15.82 39.134 36.679 77.796 59.357 113.32m120.066-107.923c-18.012 37.246-30.637 77.853-51.263 113.319'
                stroke='currentColor'
                stroke-opacity='.9'
                stroke-width='16'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            <span>Born {formattedDateOfBirth}</span>
          </div>
        )}
        <div className='profile-details__wrap--box'>
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
          <span>Joined {dateRegistered}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
