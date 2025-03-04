import Newsletter from '../newsletter/Newsletter';
import Location from '../location/Location';
import ContactForm from '../contactForm/ContactForm';

import './Requests.scss';

const Requests = () => {
  return (
    <div className='requests'>
      <div className='requests__container'>
        <ContactForm />
        <section className='requests__wrapper'>
          <Newsletter />
          <Location />
        </section>
      </div>
    </div>
  );
};

export default Requests;
