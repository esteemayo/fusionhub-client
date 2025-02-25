import Newsletter from '../newsletter/Newsletter';
import ContactForm from '../contactForm/ContactForm';

import './Requests.scss';

const Requests = () => {
  return (
    <section className='requests'>
      <div className='requests__container'>
        <ContactForm />
        <Newsletter />
      </div>
    </section>
  );
};

export default Requests;
