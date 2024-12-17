import './Feeds.scss';

const Feeds = () => {
  return (
    <aside className='feeds'>
      <div className='feeds__container'>
        <h2 className='feeds__container-heading'>Feeds</h2>
        <article className='feeds__card'>
          <div className='feeds__card-wrapper'>
            <img
              src='/post-1.jpg'
              alt='image'
              width={80}
              height={80}
              className='feeds__card-wrapper--img'
            />
          </div>
          <div className='feeds__card-box'>
            <h3 className='feeds__card-box--title'>
              Alonso Kelina Falao Asiano Pero
            </h3>
            <time dateTime='' className='feeds__card-box--date'>
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
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <span>6 hours ago</span>
            </time>
          </div>
        </article>
        <article className='feeds__card'>
          <div className='feeds__card-wrapper'>
            <img
              src='/post-2.jpeg'
              alt='image'
              width={80}
              height={80}
              className='feeds__card-wrapper--img'
            />
          </div>
          <div className='feeds__card-box'>
            <h3 className='feeds__card-box--title'>
              It is a long established fact that a reader
            </h3>
            <time dateTime='' className='feeds__card-box--date'>
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
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <span>6 hours ago</span>
            </time>
          </div>
        </article>
        <article className='feeds__card'>
          <div className='feeds__card-wrapper'>
            <img
              src='/post-3.jpeg'
              alt='image'
              width={80}
              height={80}
              className='feeds__card-wrapper--img'
            />
          </div>
          <div className='feeds__card-box'>
            <h3 className='feeds__card-box--title'>
              Many desktop publish packages and web
            </h3>
            <time dateTime='' className='feeds__card-box--date'>
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
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <span>6 hours ago</span>
            </time>
          </div>
        </article>
        <article className='feeds__card'>
          <div className='feeds__card-wrapper'>
            <img
              src='/post-4.webp'
              alt='image'
              width={80}
              height={80}
              className='feeds__card-wrapper--img'
            />
          </div>
          <div className='feeds__card-box'>
            <h3 className='feeds__card-box--title'>
              Various versions have evolved over the years
            </h3>
            <time dateTime='' className='feeds__card-box--date'>
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
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <span>6 hours ago</span>
            </time>
          </div>
        </article>
        <article className='feeds__card'>
          <div className='feeds__card-wrapper'>
            <img
              src='/post-5.jpeg'
              alt='image'
              width={80}
              height={80}
              className='feeds__card-wrapper--img'
            />
          </div>
          <div className='feeds__card-box'>
            <h3 className='feeds__card-box--title'>
              Photo booth anim 8-bit PBSC 3 wolf moon.
            </h3>
            <time dateTime='' className='feeds__card-box--date'>
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
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <span>6 hours ago</span>
            </time>
          </div>
        </article>
      </div>
    </aside>
  );
};

export default Feeds;
