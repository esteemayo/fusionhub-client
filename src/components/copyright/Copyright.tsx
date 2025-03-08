import './Copyright.scss';

const Copyright = ({ year }: { year: number }) => {
  return (
    <div className='copyright'>
      <p className='copyright__text'>
        &copy; 2024 - {year} •&nbsp;All rights reserved •&nbsp;Designed &
        Developed by <b>Emmanuel Adebayo&trade;</b>
      </p>
    </div>
  );
};

export default Copyright;
