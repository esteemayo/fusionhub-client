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
    <section className='profile-details' aria-label='User profile details'>
      <div className='profile-details__container'>
        <div className='profile-details__user'>
          <h3 className='profile-details__user--name' aria-label={name}>
            {name}
          </h3>
          <Badge role={role} />
        </div>

        <div
          className='profile-details__wrapper'
          aria-label='Account information'
        >
          <div className='profile-details__wrapper--username'>
            <AtSymbolIcon />
            <span aria-label='username'>{username}</span>
          </div>

          <span className='profile-details__wrapper--dot' aria-hidden='true'>
            •
          </span>

          <div className='profile-details__wrapper--email'>
            <EnvelopeIcon />
            <a href={`mailto:${email}`} aria-label='email address'>
              {email}
            </a>
          </div>
        </div>
      </div>
      {bio && (
        <div className='profile-details__box'>
          <p className='profile-details__box--bio' aria-label='user biography'>
            {bio}
          </p>
        </div>
      )}

      <dl className='profile-details__wrap'>
        {country && (
          <div className='profile-details__wrap--box'>
            <MapPinIcon />
            <dt className='sr-only'>Location</dt>
            <dd>{country}</dd>
          </div>
        )}

        {dateOfBirth && (
          <div className='profile-details__wrap--box'>
            <BalloonIcon />
            <dt className='sr-only'>Date of Birth</dt>
            <dd>Born {formattedDateOfBirth}</dd>
          </div>
        )}

        <div className='profile-details__wrap--box'>
          <CalendarDaysIcon />
          <dt className='sr-only'>Account creation date</dt>
          <dd>Joined {dateRegistered}</dd>
        </div>
      </dl>
    </section>
  );
};

export default ProfileDetails;
