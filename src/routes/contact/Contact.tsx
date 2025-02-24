import ContactHero from '../../components/contactHero/ContactHero';
import ContactInfo from '../../components/contactInfo/ContactInfo';

import './Contact.scss';

const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact__container'>
        <ContactHero />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Contact;
