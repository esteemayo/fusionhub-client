import './Contact.scss';

const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact__container'>
        <header className='contact__header'>
          <div className='contact__header--wrapper'>
            <div className='contact__icon left'>
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
            <div className='contact__box'>
              <h1 className='contact__box--heading'>Contact us</h1>
              <p className='contact__box--paragraph'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus repellat dolorum ipsam ab eius asperiores.
              </p>
            </div>
            <div className='contact__icon right'>
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
      </div>
    </div>
  );
};

export default Contact;
