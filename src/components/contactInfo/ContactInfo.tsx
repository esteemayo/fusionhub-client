import ContactHeading from '../contactHeading/ContactHeading';
import ContactInfoItem from '../contactInfoItem/ContactInfoItem';

import { contactInfoItems } from '../../data';

import './ContactInfo.scss';

const ContactInfo = () => {
  return (
    <section className='contact-info'>
      <div className='contact-info__container'>
        <ContactHeading
          title='Contact information'
          subtitle='Our team is available to assist you with any inquiries you may have.'
          type='lg'
        />
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
