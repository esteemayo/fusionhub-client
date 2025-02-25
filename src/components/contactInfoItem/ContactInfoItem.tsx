import { ContactInfoItemProps } from '../../types';

import './ContactInfoItem.scss';

const ContactInfoItem = ({
  icon,
  phone,
  email,
  location,
  text,
}: ContactInfoItemProps) => {
  return (
    <article className='contact-info-item'>
      <div className='contact-info-item__container'>
        <div className='contact-info-item__wrapper'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6 contact-info-item__wrapper--icon'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
          </svg>
          <span className='contact-info-item__wrapper--label'>
            {phone || email || location}
          </span>
        </div>
        <span className='contact-info-item__details'>{text}</span>
      </div>
    </article>
  );
};

export default ContactInfoItem;
