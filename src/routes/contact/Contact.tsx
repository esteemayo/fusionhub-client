import ContactHero from '../../components/contactHero/ContactHero';
import Requests from '../../components/requests/Requests';
import ContactInfo from '../../components/contactInfo/ContactInfo';

import './Contact.scss';

const Contact = () => {
  return (
    <main
      className='contact'
      role='main'
      tabIndex={-1}
      aria-labelledby='contact-page-title'
    >
      <div className='contact__container'>
        <h1 id='contact-page-title' className='sr-only'>
          Contact Us
        </h1>

        <ContactHero />
        <ContactInfo />
        <Requests />
      </div>
    </main>
  );
};

export default Contact;
