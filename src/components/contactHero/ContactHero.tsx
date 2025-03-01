import './ContactHero.scss';

const ContactHero = () => {
  return (
    <header className='contact-hero'>
      <div className='contact-hero__wrapper'>
        <div className='contact-hero__icon left'>
          {Array.from(Array(5)).map((_, i) => {
            return (
              <svg
                key={i}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m8.25 4.5 7.5 7.5-7.5 7.5'
                />
              </svg>
            );
          })}
        </div>
        <div className='contact-hero__box'>
          <h1 className='contact-hero__box--heading'>Contact us</h1>
          <p className='contact-hero__box--paragraph'>
            If you have any questions, feedback, or just want to get in touch,
            feel free to reach out to us. You can contact us via email, phone,
            or through our social media channels.
          </p>
        </div>
        <div className='contact-hero__icon right'>
          {Array.from(Array(5)).map((_, i) => {
            return (
              <svg
                key={i}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m8.25 4.5 7.5 7.5-7.5 7.5'
                />
              </svg>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default ContactHero;
