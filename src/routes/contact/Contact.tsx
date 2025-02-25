import ContactHero from '../../components/contactHero/ContactHero';
import Requests from '../../components/requests/Requests';
import ContactInfo from '../../components/contactInfo/ContactInfo';

import './Contact.scss';

const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact__container'>
        <ContactHero />
        <ContactInfo />
        <Requests />
      </div>
    </div>
  );
};

export default Contact;
