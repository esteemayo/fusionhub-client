import ContactHeading from '../contactHeading/ContactHeading';
import ContactInfoItem from '../contactInfoItem/ContactInfoItem';

import { contactInfoItems } from '../../data';

import './ContactInfo.scss';

const ContactInfo = () => {
  const titleId = 'contact-info-title';
  const describeId = 'contact-info-description';

  return (
    <section
      className='contact-info'
      role='region'
      aria-labelledby={titleId}
      aria-describedby={describeId}
    >
      <div className='contact-info__container'>
        <ContactHeading
          title='Contact information'
          subtitle='Our team is available to assist you with any inquiries you may have.'
          titleId={titleId}
          subtitleId={describeId}
          type='lg'
        />

        <div className='contact-info__container--wrapper' role='list'>
          {contactInfoItems.map((item) => {
            return <ContactInfoItem key={item.id} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
