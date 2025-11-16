import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import ToggleButton from '../toggleButton/ToggleButton';
import SearchBarForm from '../searchBarForm/SearchBarForm';

import { SearchBarProps } from '../../types';

import './SearchBar.scss';

const SearchBar = ({ isOpen, onToggle }: SearchBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY > 80 ? true : false);
    return () => (window.onscroll = null);
  };

  const searchBarClasses = useMemo(
    () => (isScrolled && !isOpen ? 'search-bar show' : 'search-bar hide'),
    [isOpen, isScrolled]
  );

  return (
    <div
      className={searchBarClasses}
      role='search'
      aria-expanded={isOpen}
      aria-label='Floating search bar'
    >
      <div className='search-bar__container'>
        <Link to='/' aria-label='Go to homepage'>
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
