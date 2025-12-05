import ChevronRightIcon from '../icons/ChevronRightIcon';
import './ContactHero.scss';

const ContactHero = () => {
  return (
    <header
      className='contact-hero'
      role='banner'
      aria-label='Contact page hero section'
      aria-labelledby='contact-hero-heading'
      aria-describedby='contact-hero-description'
    >
      <div className='contact-hero__wrapper'>
        <div className='contact-hero__icon left' aria-hidden='true'>
          {Array.from(Array(5)).map((_, index) => {
            return <ChevronRightIcon key={index} />;
          })}
        </div>

        <div className='contact-hero__box'>
          <h1 id='contact-hero-heading' className='contact-hero__box--heading'>
            Contact us
          </h1>

          <p
            id='contact-hero-description'
            className='contact-hero__box--paragraph'
          >
            If you have any questions, feedback, or just want to get in touch,
            feel free to reach out to us. You can contact us via email, phone,
            or through our social media channels.
          </p>
        </div>

        <div className='contact-hero__icon right' aria-hidden='true'>
          {Array.from(Array(5)).map((_, index) => {
            return <ChevronRightIcon key={index} />;
          })}
        </div>
      </div>
    </header>
  );
};

export default ContactHero;
