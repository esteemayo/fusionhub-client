import ContactInfoItem from '../contactInfoItem/ContactInfoItem';

import { contactInfoItems } from '../../data';

import './ContactInfo.scss';

const ContactInfo = () => {
  return (
    <section className='contact-info'>
      <div className='contact-info__container'>
        <h2 className='contact-info__container--heading'>
          Contact information
        </h2>
        <p className='contact-info__container--desc'>
          Our team is available to assist you with any inquiries you may have.
        </p>
        <div className='contact-info__container--wrapper'>
          {contactInfoItems.map((item) => {
            return <ContactInfoItem key={item.id} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
