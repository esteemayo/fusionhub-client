import './Banner.scss';

const Banner = () => {
  return (
    <div className='banner'>
      &nbsp;
      <div className='banner__user'>
        <img
          src='/user-1.jpeg'
          width={120}
          height={120}
          alt='avatar'
          className='banner__user--avatar'
        />
      </div>
      <div className='banner__cover'>
        <label htmlFor='file' className='banner__cover--label'>
          <svg
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
              d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
            />
          </svg>
        </label>
        <input type='file' id='file' className='banner__cover--input' />
      </div>
    </div>
  );
};

export default Banner;
