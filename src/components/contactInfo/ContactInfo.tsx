import ContactInfoItem from '../contactInfoItem/ContactInfoItem';

import './ContactInfo.scss';

const ContactInfo = () => {
  return (
    <section className='contact-info'>
      <div className='contact-info__container'>
        <h2 className='contact-info__container--heading'>
          Contact information
        </h2>
        <p className='contact-info__container--desc'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta,
          voluptate.
        </p>
        <div className='contact-info__container--wrapper'>
          <ContactInfoItem />
          <ContactInfoItem />
          <ContactInfoItem />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
