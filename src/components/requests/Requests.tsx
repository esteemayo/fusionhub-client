import Newsletter from '../newsletter/Newsletter';
import ContactForm from '../contactForm/ContactForm';

import './Requests.scss';

const Requests = () => {
  return (
    <div className='requests'>
      <div className='requests__container'>
        <ContactForm />
        <Newsletter />
      </div>
    </div>
  );
};

export default Requests;
