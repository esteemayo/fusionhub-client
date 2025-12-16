import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';

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

  const toggleVoiceSearch = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      return isListening ? stopListening() : startListening();
    },
    [isListening, startListening, stopListening]
  );

  const searchBarFormClasses = useMemo(
    () => (isVisible ? 'search-bar-form show' : 'search-bar-form hide'),
    [isVisible]
  );

  useEffect(() => {
    if (!transcript) return;

    setSearchQuery(transcript);
    executeSearch(transcript);
  }, [executeSearch, setSearchQuery, transcript]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        toggleVoiceSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, toggleVoiceSearch]);

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
        aria-describedby='search-hint voice-status'
      />

      <span id='search-hint' className='sr-only'>
        Type keywords and press Enter to search posts.
      </span>

      <span className='search-bar-form__search-icon' aria-hidden='true'>
        <MagnifyingGlassIcon />
      </span>

      <button
        type='button'
        onClick={toggleVoiceSearch}
        className={`search-bar-form__voice-btn ${isListening ? 'active' : ''}`}
        aria-pressed={isListening}
        aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
      >
        <MicrophoneIcon />
      </button>

      <span id='voice-status' className='sr-only' aria-live='polite'>
        {isListening
          ? 'Voice search active. Listening...'
          : 'Voice search inactive.'}
      </span>
    </form>
  );
};

export default SearchBarForm;
