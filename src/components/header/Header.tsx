import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__wrapper'>
          <div className='header__wrapper--left'>
            <div className='header__img'>
              <img
                src='/post-9.webp'
                width={900}
                height={500}
                alt='image'
                className='header__img--main'
              />
            </div>
          </div>
          <div className='header__wrapper--right'>
            <div className='header__img'>
              <img
                src='/post-10.webp'
                width={500}
                height={500}
                alt='image'
                className='header__img--sub'
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
