import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import MicrophoneIcon from '../icons/MicrophoneIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import { useSearch } from '../../hooks/useSearch';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';

import './SearchBarForm.scss';

const SearchBarForm = () => {
  const { pathname } = useLocation();

  const { searchQuery, setSearchQuery, executeSearch, handleSubmit } =
    useSearch();
  const { isListening, transcript, startListening, stopListening } =
    useVoiceSearch();

  const isVisible = pathname === '/';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return isListening ? stopListening : startListening;
  };

  const searchBarFormClasses = useMemo(
    () => (isVisible ? 'search-bar-form show' : 'search-bar-form hide'),
    [isVisible]
  );

  useEffect(() => {
    if (!transcript) return;

    setSearchQuery(transcript);
    executeSearch(transcript);
  }, [executeSearch, setSearchQuery, transcript]);

  return (
    <form
      onSubmit={handleSubmit}
      className={searchBarFormClasses}
      role='search'
      aria-label='Search posts form'
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

      <div className='search-bar-form__search-icon'>
        <MagnifyingGlassIcon />
      </div>

      <button
        type='button'
        onClick={handleClick}
        className='search-bar-form__voice-btn'
        aria-pressed={isListening}
        aria-label='Search using voice'
      >
        <MicrophoneIcon />
      </button>
    </form>
  );
};

export default SearchBarForm;
