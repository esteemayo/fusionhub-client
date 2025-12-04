import { formatPhoneNumber } from 'react-phone-number-input';
import { ContactInfoItemProps } from '../../types';

import './ContactInfoItem.scss';

const ContactInfoItem = ({
  icon,
  phone,
  email,
  location,
  text,
}: ContactInfoItemProps) => {
  const formattedPhone = phone ? formatPhoneNumber(phone) : null;

  const renderContactValue = () => {
    if (formattedPhone) {
      return (
        <a
          href={`tel:${phone}`}
          className='contact-info-item__wrapper--label'
          aria-label={`Call ${formattedPhone}`}
        >
          {formattedPhone}
        </a>
      );
    }

    if (email) {
      return (
        <a
          href={`mailto:${email}`}
          className='contact-info-item__wrapper--label'
          aria-label={`Send an email to ${email}`}
        >
          {email}
        </a>
      );
    }

    return (
      <span
        className='contact-info-item__wrapper--label'
        aria-label={`Location: ${location}`}
      >
        {location}
      </span>
    );
  };

  return (
    <article
      className='contact-info-item'
      role='listitem'
      aria-label='Contact information'
    >
      <div className='contact-info-item__container'>
        <div
          className='contact-info-item__wrapper'
          role='group'
          aria-label='Contact detail'
        >
          <svg
            aria-hidden='true'
            focusable='false'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6 contact-info-item__wrapper--icon'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
          </svg>

          {renderContactValue()}
        </div>

        <span className='contact-info-item__details' aria-live='polite'>
          {text}
        </span>
      </div>
    </article>
  );
};

export default ContactInfoItem;
