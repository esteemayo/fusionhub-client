import { useCallback, useEffect } from 'react';

import MicrophoneIcon from '../icons/MicrophoneIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import { useSearch } from '../../hooks/useSearch';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';

import './SearchClient.scss';

const Client = () => {
  const { searchQuery, setSearchQuery, executeSearch, handleSubmit } =
    useSearch();

  const { isListening, transcript, startListening, stopListening } =
    useVoiceSearch();

  const toggleVoiceSearch = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      return isListening ? stopListening() : startListening();
    },
    [isListening, startListening, stopListening]
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
    <section
      className='search-client'
      role='search'
      aria-labelledby='search-client-heading'
    >
      <h2 id='search-client-heading' className='sr-only'>
        Search posts
      </h2>

      <div className='search-client__container'>
        <form
          onSubmit={handleSubmit}
          className='search-client__form'
          role='search'
          aria-label='Search posts form'
          aria-describedby='search-instructions'
          noValidate
        >
          <p id='search-instructions' className='sr-only'>
            Type a search query or use the voice search button.
          </p>

          <label htmlFor='search' className='sr-only'>
            Search posts
          </label>

          <input
            type='search'
            id='search'
            name='search'
            value={searchQuery}
            placeholder='Search posts...'
            className='search-client__form--input'
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-required='false'
            aria-label='Search posts'
            aria-describedby='voice-search-status'
            autoComplete='off'
            spellCheck={false}
          />

          <div className='search-client__form--search-icon' aria-hidden='true'>
            <MagnifyingGlassIcon />
          </div>

          <button
            type='button'
            onClick={toggleVoiceSearch}
            className={`search-client__form--voice-btn ${
              isListening ? 'active' : ''
            }`}
            aria-pressed={isListening}
            aria-label={
              isListening
                ? 'Stop voice search'
                : 'Start voice search (Ctrl or Cmd + V)'
            }
            aria-live='polite'
          >
            <MicrophoneIcon />
          </button>

          <span id='voice-search-status' className='sr-only' aria-live='polite'>
            {isListening
              ? 'Voice search is active. Listening...'
              : 'Voice search inactive.'}
          </span>
        </form>
      </div>
    </section>
  );
};

export default Client;
