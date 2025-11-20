import { useMemo } from 'react';

import AtSymbolIcon from '../icons/AtSymbolIcon';
import Badge from '../badge/Badge';
import EnvelopeIcon from '../icons/EnvelopeIcon';
import MapPinIcon from '../icons/MapPinIcon';
import CalendarDaysIcon from '../icons/CalendarDaysIcon';
import BalloonIcon from '../icons/BalloonIcon';

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
  const { user: currentUser } = useAppSelector((state) => state.auth);

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
            <AtSymbolIcon />
            <span>{username}</span>
          </div>
          <span className='profile-details__wrapper--dot'>•</span>
          <div className='profile-details__wrapper--email'>
            <EnvelopeIcon />
            <span>{email}</span>
          </div>
        </div>
      </div>
      {bio && (
        <div className='profile-details__box'>
          <span className='profile-details__box--bio'>{bio}</span>
        </div>
      )}
      <div className='profile-details__wrap'>
        {country && (
          <div className='profile-details__wrap--box'>
            <MapPinIcon />
            <span>{country}</span>
          </div>
        )}
        {dateOfBirth && (
          <div className='profile-details__wrap--box'>
            <BalloonIcon />
            <span>Born {formattedDateOfBirth}</span>
          </div>
        )}
        <div className='profile-details__wrap--box'>
          <CalendarDaysIcon />
          <span>Joined {dateRegistered}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
