import './Copyright.scss';

const Copyright = ({ value }: { value: number }) => {
  return (
    <section
      className='copyright'
      aria-label='Copyright information'
      aria-labelledby='copyright-heading'
    >
      <h2 id='copyright-heading' className='sr-only'>
        Copyright Information
      </h2>
      <p className='copyright__text'>
        &copy; 2024 - {value} •&nbsp;All rights reserved •&nbsp;Designed &amp;
        Developed by{' '}
        <strong>
          Emmanuel Adebayo<span aria-hidden='true'>&trade;</span>
        </strong>
      </p>
    </section>
  );
};

export default Copyright;
