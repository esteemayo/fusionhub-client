import SearchForm from '../searchForm/SearchForm';
import ToggleButton from '../toggleButton/ToggleButton';

import { SearchBarProps } from '../../types';

import './SearchBar.scss';

const SearchBar = ({ isOpen, onToggle }: SearchBarProps) => {
  return (
    <div className='search-bar'>
      <div className='search-bar__container'>
        <div className='search-bar__wrapper'>
          <span className='search-bar__wrapper--logo'>fusionHub</span>
          <ToggleButton
            type='nav'
            label='Menu'
            isOpen={isOpen}
            onClick={onToggle}
          />
        </div>
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchBar;
