import './Copyright.scss';

const Copyright = ({ value }: { value: number }) => {
  return (
    <div className='copyright'>
      <p className='copyright__text'>
        &copy; 2024 - {value} •&nbsp;All rights reserved •&nbsp;Designed &
        Developed by <b>Emmanuel Adebayo&trade;</b>
      </p>
    </div>
  );
};

export default Copyright;
