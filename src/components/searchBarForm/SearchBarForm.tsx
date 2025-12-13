import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useSearch } from '../../hooks/useSearch';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import './SearchBarForm.scss';

const SearchBarForm = () => {
  const { pathname } = useLocation();
  const { searchQuery, setSearchQuery, handleSubmit } = useSearch();

  const isVisible = pathname === '/';

  const searchBarFormClasses = useMemo(
    () => (isVisible ? 'search-bar-form show' : 'search-bar-form hide'),
    [isVisible]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={searchBarFormClasses}
      role='search'
      aria-label='Search posts'
      aria-hidden={!isVisible}
      noValidate
    >
      <label htmlFor='search-input' className='sr-only'>
        Search posts
      </label>

      <input
        type='search'
        name='search'
        value={searchQuery}
        placeholder='Search posts...'
        className='search-bar-form__input'
        onChange={(e) => setSearchQuery(e.target.value)}
        autoComplete='off'
        aria-describedby='search-hint'
      />

      <span id='search-hint' className='sr-only'>
        Type keywords and press Enter to search posts
      </span>

      <MagnifyingGlassIcon />
    </form>
  );
};

export default SearchBarForm;
