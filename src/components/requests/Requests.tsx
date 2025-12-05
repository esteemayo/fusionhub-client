import Newsletter from '../newsletter/Newsletter';
import Location from '../location/Location';
import ContactForm from '../contactForm/ContactForm';

import './Requests.scss';

const Requests = () => {
  return (
    <main className='requests' role='main' aria-labelledby='requests-title'>
      <div className='requests__container'>
        <section
          className='requests__contact-form'
          aria-labelledby='request--contact-form-title'
        >
          <h2 id='request--contact-form-title' className='sr-only'>
            Contact Form
          </h2>

          <ContactForm />
        </section>
        <section
          className='requests__wrapper'
          aria-labelledby='additional-info-title'
        >
          <h2 id='additional-info-title' className='sr-only'>
            Additional Information
          </h2>

          <Newsletter />
          <Location />
        </section>
      </div>
    </main>
  );
};

export default Requests;
