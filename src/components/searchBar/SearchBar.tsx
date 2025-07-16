import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ToggleButton from '../toggleButton/ToggleButton';
import SearchBarForm from '../searchBarForm/SearchBarForm';

import { SearchBarProps } from '../../types';

import './SearchBar.scss';

const SearchBar = ({ isOpen, onToggle }: SearchBarProps) => {
  const { pathname } = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY > 80 ? true : false);
    return () => (window.onscroll = null);
  };

  const searchBarClasses = useMemo(() => {
    return pathname === '/' && isScrolled && !isOpen
      ? 'search-bar show'
      : 'search-bar hide';
  }, [isOpen, isScrolled, pathname]);

  return (
    <div className={searchBarClasses}>
      <div className='search-bar__container'>
        <Link to='/'>
          <span className='search-bar__wrapper--logo'>fusionHub</span>
        </Link>
        <div className='search-bar__wrapper'>
          <SearchBarForm />
          <ToggleButton
            type='nav'
            label='Menu'
            isOpen={isOpen}
            onClick={onToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
