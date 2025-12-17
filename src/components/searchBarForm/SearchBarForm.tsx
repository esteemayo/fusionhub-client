import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useRef } from 'react';

import MicrophoneIcon from '../icons/MicrophoneIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import { useVoiceSearch } from '../../hooks/useVoiceSearch';
import { useSearch } from '../../hooks/useSearch';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

import './SearchBarForm.scss';

const SearchBarForm = () => {
  const { pathname } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const { isListening, error, transcript, toggleListening } = useVoiceSearch();
  const { searchQuery, setSearchQuery, executeSearch, handleSubmit } =
    useSearch();

  const isVisible = pathname === '/';

  const handleVoiceButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleListening();
  };

  useKeyboardShortcut({
    key: 'v',
    mod: true,
    callback: () => {
      if (document.activeElement === inputRef.current) return;
      toggleListening();
    },
  });

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
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
        ref={inputRef}
        type='search'
        name='search'
        value={searchQuery}
        placeholder='Search posts...'
        className='search-bar-form__input'
        onChange={(e) => setSearchQuery(e.target.value)}
        readOnly={isListening}
        autoComplete='off'
        aria-readonly={isListening}
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
        onClick={handleVoiceButtonClick}
        className={`search-bar-form__voice-btn ${isListening ? 'active' : ''}`}
        aria-pressed={isListening}
        aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
        aria-live='polite'
        aria-keyshortcuts='Control+V Meta+V'
        title='Search by voice'
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
