import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__wrapper'>
          <div className='header__wrapper--left'>
            <div className='header__info'>
              <span className='header__info--category'>Travel</span>
              <h1 className='header__info--heading'>
                Best Surfing Spots for Beginners and Advanced
              </h1>
              <Link to='/' className='header__info--link'>
                Read more
              </Link>
            </div>
          </div>
          <div className='header__wrapper--right'>
            <div className='header__info'>
              <span className='header__info--category small'>Sport</span>
              <h2 className='header__info--heading small'>
                High-Tech Prototype Bike Announced
              </h2>
              <Link to='/' className='header__info--link small'>
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
